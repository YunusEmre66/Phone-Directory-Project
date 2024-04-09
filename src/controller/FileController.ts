import { AppDataSource } from "../data-source";
import { Address } from "../entity/Address";
import { City } from "../entity/City";
import { Country } from "../entity/Country";
import { District } from "../entity/District";
import { Email } from "../entity/Email";
import { Phone } from "../entity/Phone";
import { Town } from "../entity/Town";
import { User } from "../entity/User";
import { NextFunction, Request, Response } from "express";

export class FileController {
  private countryRepository = AppDataSource.getRepository(Country);
  private cityRepository = AppDataSource.getRepository(City);
  private districtRepository = AppDataSource.getRepository(District);
  private townRepository = AppDataSource.getRepository(Town);
  private userRepository = AppDataSource.getRepository(User);
  private phoneRepository = AppDataSource.getRepository(Phone);
  private emailRepository = AppDataSource.getRepository(Email);
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    const fs = require("fs");

    const file = await fs.promises.readFile(
      "./public/address.json",
      "utf8",
      (err: any, data: any) => {
        if (err) {
          console.error(err);
          return false;
        }
        return true;
      }
    );
    const fileJson = JSON.parse(file); // parse json file to object array

    await fileJson.map(async (k: any) => {
      const country = Object.assign(new Country(), {
        name: k.name,
      });
      const insertCountry = await this.countryRepository.save(country); //! DOSYADAKİ ÜLKEYİ VERİTABANINA KAYDETME

      k.sub.map(async (l: any) => {
        const city = Object.assign(new City(), {
          name: l.name,
          country: insertCountry,
        });
        const insertCity = await this.cityRepository.save(city); //! DOSYADAKİ ŞEHİRLERİ VERİTABANINA KAYDETME

        l.sub.map(async (t: any) => {
          const district = Object.assign(new District(), {
            name: t.name,
            city: insertCity,
          });
          const insertDistrict = await this.districtRepository.save(district); //! DOSYADAKİ İLÇELERİ VERİTABANINA KAYDETME

          t.sub.map(async (v: any) => {
            const town = Object.assign(new Town(), {
              name: v,
              district: insertDistrict,
            });
            const insertTown = await this.townRepository.save(town); //! DOSYADAKİ KASABALARI VERİTABANINA KAYDETME
          });
        });
      });
    });

    // async saveCountry(k: any) {
    //     const country = new Country();
    //     country.name = k.name;
    //     return await this.countryRepository.save(country);
    // }

    // async saveCity(l: any, country: Country) {
    //     const city = new City();
    //     city.name = l.name;
    //     city.country = country;
    //     return await this.cityRepository.save(city);
    // }

    // async saveDistrict(t: any, city: City) {
    //     const district = new District();
    //     district.name = t.name;
    //     district.city = city;
    //     return await this.districtRepository.save(district);
    // }

    // async saveTown(v: any, district: District) {
    //     const town = new Town();
    //     town.name = v;
    //     town.district = district;
    //     return await this.townRepository.save(town);
    // }

    // async saveAll(fileJson: any) {
    //     for (let k of fileJson) {
    //         const country = await this.saveCountry(k);
    //         for (let l of k.sub) {
    //             const city = await this.saveCity(l, country);
    //             for (let t of l.sub) {
    //                 const district = await this.saveDistrict(t, city);
    //                 for (let v of t.sub) {
    //                     await this.saveTown(v, district);
    //                 }
    //             }
    //         }
    //     }
    // }

    const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let x of users) {
      const user = Object.assign(new User(), {
        firstName: "Test " + x,
        lastName: "User " + x,
        age: 11,
      });
      await this.userRepository.save(user);
    }

    const user = await this.userRepository.findOne({ where: { id: 1 } });

    const phone = Object.assign(new Phone(), {
      phoneType: "iş",
      phoneNumber: "500 000 00 00",
      user,
    });
    await this.phoneRepository.save(phone); //! telefon numarasını veritabanına kaydetme, user ıda ekleyerek

    const email = Object.assign(new Email(), {
      emailType: "iş",
      emailAddress: "abc@xyz.com",
      user,
    });
    await this.emailRepository.save(email); //! email adresini veritabanına kaydetme, user ıda ekleyerek

    const country = await this.countryRepository.findOne({ where: { id: 1 } });
    const city = await this.cityRepository.findOne({ where: { id: 28 } });
    const district = await this.districtRepository.findOne({
      where: { id: 332 },
    });
    const town = await this.townRepository.findOne({ where: { id: 17572 } });

    const address = Object.assign(new Address(), {
      addressType: "iş",
      addressLine: "12046 SK",
      street: "12046",
      post_code: "20000",
      location: "123,456",
      user,
      country,
      city,
      district,
      town,
    });
    await this.addressRepository.save(address); //! adresi veritabanına kaydetme, user ıda ekleyerek

    return true;
  }
}
