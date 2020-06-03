import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

const port = process.env.port || 3334;
app.listen(port);
console.log(`🚀 Server on port: http://localhost:${port}`);