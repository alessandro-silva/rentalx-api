import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
// import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';

const specificationsRoutes = Router();
// const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationController = new CreateSpecificationController();

// specificationsRoutes.get('/', (request, response) => {
//   const specifications = specificationsRepository.list();

//   return response.json(specifications);
// });

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export default specificationsRoutes;
