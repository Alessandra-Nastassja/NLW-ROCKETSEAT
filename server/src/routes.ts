import express, { request, response } from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// Substitui o app 
const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

// GET - Busca pelas informações dos items
routes.get('/items', itemsController.index);

// POST - Cria pontos de coletas
routes.post('/points', pointsController.create);

// GET - Busca por um ponto de coleta específico
routes.get('/points/:id', pointsController.show)

// GET - Busca por estado/uf
routes.get('/points/', pointsController.index)

export default routes;