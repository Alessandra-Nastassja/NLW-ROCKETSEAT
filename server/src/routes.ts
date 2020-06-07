import express, { request, response } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// Substitui o app 
const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// POST - Cria pontos de coletas e fazendo upload de image
routes.post('/points', upload.single('image'),pointsController.create);

// GET - Busca pelas informações dos items
routes.get('/items', itemsController.index);

// GET - Busca por um ponto de coleta específico
routes.get('/points/:id', pointsController.show)

// GET - Busca por estado/uf
routes.get('/points/', pointsController.index)

export default routes;