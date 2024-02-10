
import { IncomingMessage, ServerResponse, createServer } from 'http';

import * as uuid from 'uuid';

import 'dotenv/config';

const PORT = process.env.PORT;

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[],
}

let users: IUser[] = [];

const server = createServer((req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
  
    const { method, url } = req;
  
    if (url === '/api/users') {
      switch (method) {
        case 'GET':
          res.writeHead(200);
          res.end(JSON.stringify(users));
          break;
        case 'POST':
          let body: string = '';
  
          req
          .on('data', (chunk) => {
            body+= chunk.toString();
          })
          .on('end', () => {
            const { username, age, hobbies }: Omit<IUser, 'id'> = JSON.parse(body);
  
            if (!username || !age || !hobbies) {
              res.writeHead(400);
              res.end(JSON.stringify({ error: 'Username, age and hobbies are required' }));
            } else {
              const newUser = {
                id: uuid.v4(),
                username,
                age,
                hobbies,
              }
              users.push(newUser);
      
              res.writeHead(201);
              res.end(JSON.stringify(newUser));
            }
          });
          break;
      }
      return;
    }
  
    if (url?.startsWith('/api/users/')) {
      const userId = url.split('/').at(-1);
  
      if (!userId || !uuid.validate(userId)) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: `Id isn't uuid` }));
        return;
      }
  
      const user = users.find(({ id }) => id === userId);
  
  
      if (!user) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'User not found' }));
      } else {
        switch (method) {
          case 'GET':
            res.writeHead(200);
            res.end(JSON.stringify(user));
            break;
          case 'PUT':
            let body: string = '';
  
            req
            .on('data', (chunk) => {
              body+= chunk.toString();
            })
            .on('end', () => {
              const { username, age, hobbies }: Partial<IUser> = JSON.parse(body);
    
              const updatedUser = {
                id: user.id,
                username: username || user.username,
                age: age || user.age,
                hobbies: hobbies || user.hobbies,
              }
  
              users = users.map((user) => user.id === userId ? updatedUser : user);
  
              res.writeHead(200);
              res.end(JSON.stringify(updatedUser));
            })
            break;
          case 'DELETE':
            users = users.filter(({ id }) => id !== userId);
            res.writeHead(204);
            res.end();
          break;
        }
      }
  
      return;
    }
  
    res.writeHead(404);
    res.end(JSON.stringify({ error: `${url} not found` }));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ error: `Internal Server Error` }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
