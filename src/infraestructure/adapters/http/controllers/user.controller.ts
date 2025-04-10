
import { UserInputPort } from '@core/application/ports/input/user-input.port'
import { UserUseCase } from '@core/application/use-cases/user.usecase'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common'
import { UpdateUserDto } from '@core/application/dto/user/update-user.dto'
import { CreateUserDto } from '@core/application/dto/user/create-user.dto'
import { Response } from '@core/domain/models/reponse-http.model'
import { SwaggerResponse } from '@core/domain/models/swagger-response.model'

@ApiTags('Usuarios')
@Controller('users')
export class UserController implements UserInputPort {
    constructor(private readonly userUseCase: UserUseCase) { }
    @ApiResponse({
        description: 'Obtener todos los usuarios',
        type: SwaggerResponse,
    })
    @Get('all')
    async all(
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ): Promise<any> {
        const queryParams = { page, limit }
        return await this.userUseCase.findAll(queryParams)
    }

    @ApiResponse({
        description: 'Obtener usuario por ID',
        type: SwaggerResponse,
    })
    @Get('for-id/:uid')
    async forId(@Param('uid') uid: string): Promise<any> {
        return await this.userUseCase.findById(uid)
    }

    @ApiResponse({
        description: 'Eliminar usuario por ID',
        type: SwaggerResponse,
    })
    @Delete('delete/:uid')
    async delete(@Param('uid') uid: string): Promise<any> {
        return await this.userUseCase.delete(uid)
    }

    @ApiResponse({ description: 'Actualizar usuario', type: SwaggerResponse })
    @Put('update')
    async update(@Body() updateUserDto: UpdateUserDto): Promise<any> {
        return await this.userUseCase.update(updateUserDto)
    }

    @ApiResponse({ description: 'Crear usuario', type: SwaggerResponse })
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<Response> {
        return await this.userUseCase.create(createUserDto) as Response
    }
    
}
