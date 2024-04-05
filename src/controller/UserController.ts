import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
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
        age
      
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
