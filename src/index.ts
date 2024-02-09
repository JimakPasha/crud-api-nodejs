import { createServer } from 'http';
import 'dotenv/config';

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  console.log('test');
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
