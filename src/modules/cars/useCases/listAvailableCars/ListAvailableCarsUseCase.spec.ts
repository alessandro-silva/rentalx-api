import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Mercedes AMG GTX',
      description: 'carro esportivo',
      daily_rate: 12342,
      license_plate: 'AMGx',
      fine_amount: 1232,
      brand: 'Mercedes-benz',
      category_id: '78a853d3-5b37-45db-9b6c-6bc8af1dabc5',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Mercedes AMG GTX',
      description: 'carro esportivo',
      daily_rate: 12342,
      license_plate: 'AMGx',
      fine_amount: 1232,
      brand: 'Mercedes-benzX',
      category_id: '78a853d3-5b37-45db-9b6c-6bc8af1dabc5',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Mercedes-benzX',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Mercedes AMG GTX',
      description: 'carro esportivo',
      daily_rate: 12342,
      license_plate: 'AMGx',
      fine_amount: 1232,
      brand: 'Mercedes-benzX',
      category_id: '78a853d3-5b37-45db-9b6c-6bc8af1dabc5',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Mercedes AMG GTX',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Mercedes AMG GTX',
      description: 'carro esportivo',
      daily_rate: 12342,
      license_plate: 'AMGx',
      fine_amount: 1232,
      brand: 'Mercedes-benzX',
      category_id: '78a853d3-5b37-45db-9b6c-6bc8af1dabc5',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '78a853d3-5b37-45db-9b6c-6bc8af1dabc5',
    });

    expect(cars).toEqual([car]);
  });
});
