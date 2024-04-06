import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";

export class AddressController {
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.addressRepository.find({
      relations: {
        user: true,
        country: true,
        city: true,
        district: true,
        town: true,
      },
    });
  }
  //! böylede oluyor
  // async all(request: Request, response: Response, next: NextFunction) {

  //   console.log("request.url", request.url)
  //   return this.addressRepository.find({
  //     relations: ["user", "country", "city", "district", "town"],
  //   });
  // }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      return "unregistered address";
    }
    return address;
  }

  async userOne(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.userId);

    const user = await this.addressRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return "böyle bir kullanıcı yok";
    }

    const address = await this.addressRepository.find({
      where: { user },
      relations: {
        user: true,
        country: true,
        city: true,
        district: true,
        town: true,
      },
    });

    if (!address) {
      return "adres bulunamadı";
    }

    return address;
  }
}
