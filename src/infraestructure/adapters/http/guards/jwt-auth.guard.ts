
import { CustomException } from '@core/application/exception/custom.exception'
import { AuthService } from '@core/domain/services/auth.service'
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common'
import { JWTTokenRepository } from 'src/infraestructure/repositories/jwt-token.repository'

@Injectable()
export class AuthJwtGuard implements CanActivate {
    constructor(private readonly authRepository: JWTTokenRepository, private readonly _authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const REQUEST = context.switchToHttp().getRequest()
        try {
            const TOKEN = await this.extractJwtFromRequest(REQUEST)
            const DECODED_TOKEN = await this.authRepository.verify(TOKEN)
            REQUEST.user = DECODED_TOKEN
            REQUEST.token = TOKEN
            return true
        } catch (error) {
            throw new CustomException('Token invalido', HttpStatus.UNAUTHORIZED)
        }
    }

    private async extractJwtFromRequest(request: any): Promise<string> {
        const AUTH_HEADER = request.headers.authorization
        if (!AUTH_HEADER) {
            throw new CustomException(
                'Token no proporcionado',
                HttpStatus.UNAUTHORIZED
            )
        }
        const [BEARER, TOKEN] = AUTH_HEADER.split(' ')
        if (BEARER !== 'Bearer' || !TOKEN) {
            throw new CustomException(
                'Formato de token invalido',
                HttpStatus.UNAUTHORIZED
            )
        }

        const IS_DELETED_TOKEN = await this._authService.findToken(TOKEN)
        if (!IS_DELETED_TOKEN) {
            throw new UnauthorizedException({
                code: 401,
                status: 'error',
                message: 'Token invalido',
                data: null,
            })
        }
        return TOKEN
    }
}
