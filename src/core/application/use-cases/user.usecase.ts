import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomException } from '../exception/custom.exception';
import { responseSuccess } from '../utils/reponses.util';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UsersMapper } from '../mappers/users.mapper';
import { UserService } from '@core/domain/services/user.service';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { Response } from '@core/domain/models/reponse-http.model';

const ObjectId = Types.ObjectId;

@Injectable()
export class UserUseCase {
  constructor(
    private userService: UserService,
    private mapper: UsersMapper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Response> {
    await this.findByExists('email', createUserDto.email);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create(createUserDto);
    const map = await this.mapper.userToDto(user);
    return responseSuccess('Usuario creado exitosamente', map);
  }

  async findByExists(
    field: string,
    value: string | Types.ObjectId,
    not: boolean = false,
  ): Promise<void> {
    const exists = await this.userService.findByExists({ [field]: value });
    if (!not && exists) {
      throw new CustomException(
        'El registro: ' + value + ' ya existe',
        HttpStatus.CONFLICT,
      );
    }
    if (not && !exists) {
      throw new CustomException(
        'El registro: ' + value + ' no existe',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findById(id: string): Promise<Response> {
    const objectId = new ObjectId(id);
    await this.findByExists('_id', objectId, true);
    const user = await this.userService.findById(objectId);
    const map = await this.mapper.userToDto(user);
    return responseSuccess('Usuario encontrado', map);
  }

  async update(updateUserDto: UpdateUserDto): Promise<Response> {
    const objectId = new ObjectId(updateUserDto._id);
    await this.findByExists('_id', objectId, true);

    const findUser = await this.userService.findById(objectId);

    const user = await this.userService.update(objectId, {
      _id: objectId,
      names: updateUserDto.names,
      surnames: updateUserDto.surnames,
      password: findUser.password,
      email: findUser.email,
    });

    return responseSuccess('Usuario actualizado exitosamente', user);
  }

  async delete(id: string): Promise<Response> {
    const objectId = new ObjectId(id);
    await this.findByExists('_id', objectId, true);
    const eliminated = (await this.userService.delete(objectId)).affected > 0;
    return responseSuccess('Usuario eliminado exitosamente', eliminated);
  }

  async findAll(queryParams: {
    page?: number;
    limit?: number;
  }): Promise<Response> {
    const users = await this.userService.findAll(queryParams);
    return responseSuccess('Listado de usuarios', users);
  }
}
