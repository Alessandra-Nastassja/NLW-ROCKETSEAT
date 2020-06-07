import express, { request, response } from 'express';
import multer from 'multer';
import { celebrate, Join } from 'celebrate';

import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import Joi from '@hapi/joi';

// Substitui o app 
const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// POST - Cria pontos de coletas e fazendo upload de image
routes.post('/points', 
    upload.single('image'),  
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    },{
        abortEarly: false
    }),
    pointsController.create);

// GET - Busca pelas informações dos items
routes.get('/items', itemsController.index);

// GET - Busca por um ponto de coleta específico
routes.get('/points/:id', pointsController.show)

// GET - Busca por estado/uf
routes.get('/points/', pointsController.index)

export default routes;