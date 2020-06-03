import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const port = process.env.port || 3334;
app.listen(port);
console.log(`🚀 Server on port: http://localhost:${port}`);