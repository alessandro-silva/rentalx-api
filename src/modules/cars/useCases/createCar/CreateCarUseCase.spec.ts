import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'seila',
      description: 'naosei',
      daily_rate: 123,
      license_plate: 'teste',
      fine_amount: 13,
      brand: 'qquma',
      category_id: '123',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'seila',
      description: 'naosei',
      daily_rate: 123,
      license_plate: 'teste',
      fine_amount: 13,
      brand: 'qquma',
      category_id: '123',
    });

    await expect(
      createCarUseCase.execute({
        name: 'nãosei',
        description: 'naosei',
        daily_rate: 123,
        license_plate: 'teste',
        fine_amount: 13,
        brand: 'qquma',
        category_id: '123',
      }),
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'seila',
      description: 'naosei',
      daily_rate: 123,
      license_plate: 'teste',
      fine_amount: 13,
      brand: 'qquma',
      category_id: '123',
    });

    expect(car.available).toBe(true);
  });
});
