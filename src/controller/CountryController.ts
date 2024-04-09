import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";
import { Country } from "../entity/Country";

export class CountryController {
  private countryRepository = AppDataSource.getRepository(Country);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.countryRepository.find({
      relations: { address: true, city: { district: { town: true } } },
      order: { name: "ASC" },
    });
  }

  async countryUsers(request: Request, response: Response, next: NextFunction) {
    const countryId = parseInt(request.params.countryId);

    const country = await this.countryRepository.findOne({
      where: { id: countryId },
    });

    if (!country) {
      return "unregistered country";
    }

    const address = await this.addressRepository.find({ where: { country } });

    if (!address) {
      return "unregistered address";
    }

    return address;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    const country = Object.assign(new Country(), { name });
    return this.countryRepository.save(country);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id); // id: 1
    const { name } = request.body; // name: "Turkey"

    const country = await this.countryRepository.update({ id }, { name });

    if (country.affected) {
      return "country updated successfully";
    }  
  }
}
