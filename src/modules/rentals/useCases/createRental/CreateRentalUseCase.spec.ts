import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'seila',
      description: 'naosei',
      daily_rate: 123,
      license_plate: 'teste',
      fine_amount: 13,
      brand: 'qquma',
      category_id: '123',
    });

    const rental = await createRentalUseCase.execute({
      user_id: 'Joe Doe',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      expected_return_date: dayAdd24Hours,
      user_id: '1234',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '1234',
        car_id: '1234',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('User is unavailable!'));
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '2222',
      expected_return_date: dayAdd24Hours,
      user_id: '1234',
    });

    expect(
      createRentalUseCase.execute({
        user_id: '3333',
        car_id: '2222',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it('should not be able to create a new rental with invalid return time ', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: 'Joe Doe',
        car_id: 'Tesla X',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
