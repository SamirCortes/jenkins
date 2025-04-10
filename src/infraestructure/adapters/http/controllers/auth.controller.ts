
import { SingInDto } from '@core/application/dto/auth/sing-in.dto'
import { TokenDto } from '@core/application/dto/token/token.dto'
import { AuthInputPort } from '@core/application/ports/input/auth-input.port'
import { AuthUseCase } from '@core/application/use-cases/auth.usecase'
import { Response } from '@core/domain/models/reponse-http.model'
import { SwaggerResponse } from '@core/domain/models/swagger-response.model'
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthJwtGuard } from '../guards/jwt-auth.guard'

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements AuthInputPort {
    constructor(private readonly authUseCase: AuthUseCase) {}

    @ApiResponse({
        description: 'Iniciar sesión',
        type: SwaggerResponse,
    })
    @Post('login')
    async signIn(@Body() singInDto: SingInDto, @Req() req): Promise<Response> {
        return this.authUseCase.signIn(singInDto, req)
    }

    @ApiResponse({
        description: 'Cerrar sesión',
        type: SwaggerResponse,
    })
    @Get('logout')
    @UseGuards(AuthJwtGuard)
    async signUp(@Req() req: any): Promise<Response> {
        const token = req.headers['authorization']
        return this.authUseCase.signUp(token)
    }

    @Get('status')
    @UseGuards(AuthJwtGuard)
    async status(
        @Req() req: { user: TokenDto; token: string }
    ): Promise<Response> {
        return await this.authUseCase.status(req)
    }

}
