import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";
import { City } from "../entity/City";
import { Country } from "../entity/Country";

export class CityController {
  private cityRepository = AppDataSource.getRepository(City);
  private countryRepository = AppDataSource.getRepository(Country);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.cityRepository.find({
      relations: { address: true, district: { town: true }, country: true },
      order: { name: "ASC" },
    });
    //find ile findOne arasındaki fark : find ile tüm verileri getirir, findOne ile sadece bir veriyi getirir.
  }

  async cityUsers(request: Request, response: Response, next: NextFunction) {
    const cityId = parseInt(request.params.cityId);

    const city = await this.cityRepository.findOne({
      where: { id: cityId },
    });

    if (!city) {
      return "unregistered country";
    }

    const address = await this.addressRepository.find({ where: { city } });

    if (!address) {
      return "unregistered address";
    }

    return address;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name, countryId } = request.body;

    const country = await this.countryRepository.findOne({
      where: { id: countryId },
    });

    const city = Object.assign(new City(), { name, country });

    return this.cityRepository.save(city);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { name, countryId } = request.body;

    const country = await this.countryRepository.findOne({
      where: { id: countryId },
    });

    if (country) return this.cityRepository.update({ id }, { name, country });
    else return false;
  }
}
