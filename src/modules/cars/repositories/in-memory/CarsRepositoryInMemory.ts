import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);

    this.cars[carIndex].available = available;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const all = this.cars.filter(car => {
      if (
        car.available === true ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return all;
  }

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
