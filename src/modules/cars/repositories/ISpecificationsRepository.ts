import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };