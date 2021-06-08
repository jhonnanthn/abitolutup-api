import { Router } from 'express'
import controller from './controller/controller';
import ProdutoController from './controller/ProdutoController';

import multer from 'multer';

import uploadConfig from './config/multer';
import MenuController from './controller/MenuController';

//import ProdutoController from './controller/ProdutoController'

const routes = Router();

routes.get('/', controller.getAppInfo);

routes.get('/product', ProdutoController.getProducts);
routes.get('/product/:id', ProdutoController.getProductById);

routes.get('/menu', MenuController.getMenu);

routes.post('/recibos/upload/', multer(uploadConfig).single('file'), ProdutoController.uploadReciboDocumento);

export default routes;