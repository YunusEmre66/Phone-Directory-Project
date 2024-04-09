import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Town } from "../entity/Town"
import { Like } from "typeorm"

export class SearchController {

    private townRepository = AppDataSource.getRepository(Town)

    async search(request: Request, response: Response, next: NextFunction) {
        const search = request.query['search'] as string //!    http://localhost:3000/search?search=istanbul buradan gelen değeri alıyoruz. istanbul burada search değeridir.

        return this.townRepository.find({
            where: [
                { name: Like(`%${search}%`) },  // search like name 
                {
                    district: {
                        name: Like(`%${search}%`), //
                    }
                },
                {
                    district: {
                        city: { name: Like(`%${search}%`) } 
                    }
                },
                {
                    district: {
                        city: { country: { name: Like(`%${search}%`) } }
                    }
                },
            ],
            relations: {
                district: { city: { country: true } },
                address: { user: { email: true, phone: true } },
            }
        })
    }
}