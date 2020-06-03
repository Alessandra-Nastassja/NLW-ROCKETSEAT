import express from 'express';

// Substitui o app 
const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello world!' })
})

export default routes;