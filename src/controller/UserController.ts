import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Like } from "typeorm";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({
      relations: { phone: true, address: true, email: true },
    });
  }

  // async search(request: Request, response: Response, next: NextFunction) {
  //   //! get post yapılmış search neden yapılmamış
  //   //! mesela başında t olan sonunda u olan bütün kullanıcıları getir gibi istekler yapılsaydı iyi olurdu. bu işlemler mysql tarafında yapılır.
  //   const firstName = request.query["firstName"] as string; //! query string olarak gelen değerleri almak için kullanılır. endpointin sonuna ?firstName=ali şeklinde yazılır.
  //   const lastName = request.query["lastName"] as string; //! burdada lastName=veli şeklinde olur.

  //   console.log(firstName, lastName);

  //   return this.userRepository.find({
  //     where: {
  //       firstName: Like(`%${firstName}%`), //! like : içinde geçen değerleri getirir. % : başında ve sonunda olabilir.
  //       lastName: Like(`%${lastName}%`), //! localhost:3000/user/search?firstName=ali&lastName=veli şeklinde yazılır.
  //     },
  //   });
  //   // return this.userRepository.find({where: {firstName: firstName, lastName: lastName}})
  // }

  async search(request: Request) {
    const { firstName, lastName } = request.query as { firstName: string, lastName: string };
    return this.userRepository.find({ where: { firstName: Like(`%${firstName}%`), lastName: Like(`%${lastName}%`) } });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    console.log("kaydedildi");

    return this.userRepository.save(user);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.id);

    const { firstName, lastName, age }: User = request.body;

    return this.userRepository.update(
      { id: userId },
      {
        firstName,
        lastName,
        age,
      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
      console.log("çalıştırıldı");
    }

    await this.userRepository.remove(userToRemove);

    console.log("2.çalıştırıldı");

    return response.send({
      user: userToRemove,
      message: "user has been removed",
    });
  }
}
