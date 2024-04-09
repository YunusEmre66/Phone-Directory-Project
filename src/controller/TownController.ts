import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { District } from "../entity/District";
import { Town } from "../entity/Town";

export class TownController {
  private townRepository = AppDataSource.getRepository(Town);
  private districtRepository = AppDataSource.getRepository(District);

  async all() {
    return this.townRepository.find({
      relations: { district: true },
      order: { name: "ASC" },
    });
  }
  async save(request: Request, response: Response, next: NextFunction) {
    const { name, districtId } = request.body;
    const district = await this.districtRepository.findOne({
      where: { id: districtId },
    });

    const town = Object.assign(new District(), { name, district });

    return this.districtRepository.save(town);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { name, districtId } = request.body;

    const district = await this.districtRepository.findOne({
      where: { id: districtId },
    });

    if (district) return this.townRepository.update({ id }, { name, district });
    else return false;
  }
}
