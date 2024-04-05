import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";

export class AddressController {
  private addressRepository = AppDataSource.getRepository(Address);

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      return "unregistered address";
    }
    return address;
  }
}
