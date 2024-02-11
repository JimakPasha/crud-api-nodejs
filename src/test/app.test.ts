import request from 'supertest';
import * as uuid from 'uuid';
import { mockUser, mockupdatedUser } from './mock';
import { StatusCodes, USERS_URL, errorMessages } from '../constants';
import { server } from '..';

describe('1 scenario: crud operations', () => {
  const response = request(server);
  let userId: string;

  afterAll((done) => {
    server.close(() => {});
    done();
  });

  test('should GET return list of users', async () => {
    const res = await response.get(USERS_URL);
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toEqual([]);
  });

  test('should POST return new user', async () => {
    const res = await response.post(USERS_URL).send(mockUser);
    expect(res.statusCode).toBe(StatusCodes.SuccesRequest);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual(mockUser.username);
    expect(res.body.age).toEqual(mockUser.age);
    expect(res.body.hobbies).toEqual(mockUser.hobbies);
    userId = res.body.id;
  });

  test('should GET with query userId return user', async () => {
    const res = await response.get(`${USERS_URL}/${userId}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual(mockUser.username);
    expect(res.body.age).toEqual(mockUser.age);
    expect(res.body.hobbies).toEqual(mockUser.hobbies);
  });

  test('should PUT return updated user with the same uid', async () => {
    const res = await response.put(`${USERS_URL}/${userId}`).send(mockupdatedUser);
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.id).toEqual(userId);
    expect(res.body.username).toEqual(mockupdatedUser.username);
    expect(res.body.age).toEqual(mockupdatedUser.age);
    expect(res.body.hobbies).toEqual(mockupdatedUser.hobbies);
  });

  test('should DELETE return updated user with the same uid', async () => {
    const res = await response.delete(`${USERS_URL}/${userId}`);
    expect(res.statusCode).toBe(StatusCodes.NoContent);
    expect(res.body).toBe('');
  });

  test('should GET with query userId return error user not found', async () => {
    const res = await response.get(`${USERS_URL}/${userId}`);
    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body.status).toBe(StatusCodes.NotFound);
    expect(res.body.errorMessage).toBe(errorMessages.userNotFound);
  });
});

describe('2 scenario: fail operations on client side', () => {
  const response = request(server);
  let userId: string;

  afterAll((done) => {
    server.close(() => {});
    done();
  });

  test('should return 404 if wrong url', async () => {
    const wrongUrl = '/wrong-url';
    const res = await response.get(`${wrongUrl}`);
    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body.status).toBe(StatusCodes.NotFound);
    expect(res.body.errorMessage).toBe(`${errorMessages.notFoundUrl(wrongUrl)}`);
  });

  test('should return 404 if wrong url with nested path', async () => {
    const wrongUrl = '/wrong-url/wrong-url';
    const res = await response.get(`${wrongUrl}`);
    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body.status).toBe(StatusCodes.NotFound);
    expect(res.body.errorMessage).toBe(`${errorMessages.notFoundUrl(wrongUrl)}`);
  });

  test('should return 400 if wrong uuid in GET by userId', async () => {
    const resPost = await response.post(USERS_URL).send(mockUser);
    userId = resPost.body.id;
    const wrongUuid = userId.slice(1);
    const res = await response.get(`${USERS_URL}/${wrongUuid}`);
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.errorUuid);
  });

  test('should return 400 if wrong uuid in PUT by userId', async () => {
    const wrongUuid = userId.slice(1);
    const res = await response.put(`${USERS_URL}/${wrongUuid}`).send(mockupdatedUser);
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.errorUuid);
  });

  test('should return 400 if wrong uuid in DELETE by userId', async () => {
    const wrongUuid = userId.slice(1);
    const res = await response.delete(`${USERS_URL}/${wrongUuid}`);
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.errorUuid);
  });
});

describe('3 scenario: validations', () => {
  const response = request(server);
  const nonExistentUserId = 'c1e83f02-7505-4c81-a7a2-5f14b307696e';

  afterAll((done) => {
    server.close(() => {});
    done();
  });

  test('should return 400 if POST user in body absent username field', async () => {
    const res = await response.post(USERS_URL).send({ age: 18, hobbies: ['sport'] });
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.requireFields);
  });

  test('should return 400 if POST user in body absent age field', async () => {
    const res = await response.post(USERS_URL).send({ username: 'Test', hobbies: ['sport'] });
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.requireFields);
  });

  test('should return 400 if POST user in body absent hobbies field', async () => {
    const res = await response.post(USERS_URL).send({ username: 'Test', age: 18 });
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.requireFields);
  });

  test('should return 400 if POST user in body absent all field', async () => {
    const res = await response.post(USERS_URL).send({});
    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body.errorMessage).toBe(errorMessages.requireFields);
  });

  test('should return 404 if GET user not found user', async () => {
    const res = await response.get(`${USERS_URL}/${nonExistentUserId}`);
    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body.errorMessage).toBe(errorMessages.userNotFound);
  });

  test('should return 404 if PUT user not found user', async () => {
    const res = await response.put(`${USERS_URL}/${nonExistentUserId}`).send(mockupdatedUser);
    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body.errorMessage).toBe(errorMessages.userNotFound);
  });

  test('should return 404 if DELETE user not found user', async () => {
    const res = await response.get(`${USERS_URL}/${nonExistentUserId}`);
    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body.errorMessage).toBe(errorMessages.userNotFound);
  });
});

describe('4 scenario: uuid', () => {
  const response = request(server);

  afterAll((done) => {
    server.close(() => {});
    done();
  });

  test('should POST create users with the same fields but uniq ids', async () => {
    const resCreatedUser1 = await response.post(USERS_URL).send(mockUser);
    const resCreatedUser2 = await response.post(USERS_URL).send(mockUser);
    const user1 = (await response.get(`${USERS_URL}/${resCreatedUser1.body.id}`)).body;
    const user2 = (await response.get(`${USERS_URL}/${resCreatedUser2.body.id}`)).body;
    expect(user1.id).not.toEqual(user2.id);
    expect(user1.username).toEqual(user2.username);
    expect(user1.age).toEqual(user2.age);
    expect(user1.hobbies).toEqual(user2.hobbies);
  });
  
  test('should POST create user generate uuid', async () => {
    const res = await response.post(USERS_URL).send(mockUser);
    expect(uuid.validate(res.body.id)).toBe(true);
  });
});


