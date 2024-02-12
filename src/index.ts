import { createServer } from 'http';
import 'dotenv/config';
import { routes } from './routes';

const PORT = process.env.PORT || 4000;

export const server = createServer(routes);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
