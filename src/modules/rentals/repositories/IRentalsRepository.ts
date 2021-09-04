import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findByUserId(user_id: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental>;
  findByOpenRentalUser(user_id: string): Promise<Rental>;
  findByOpenRentalCar(car_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
