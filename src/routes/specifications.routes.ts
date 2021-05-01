import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
// import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();
// const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationController = new CreateSpecificationController();

// specificationsRoutes.get('/', (request, response) => {
//   const specifications = specificationsRepository.list();

//   return response.json(specifications);
// });

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export default specificationsRoutes;
