import { JWTTokenOutputPort } from '@core/application/ports/output/jwt-token-output.port';
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JWTTokenRepository implements JWTTokenOutputPort {
    constructor(private readonly _jwtService: JwtService) {}

    async generate(payload: { sub: string; email: string }): Promise<string> {
        return await this._jwtService.signAsync(payload)
    }

    async decode(token: string): Promise<any> {
        return await this._jwtService.decode(token)
    }

    async verify(token: string): Promise<any> {
        return await this._jwtService.verify(token)
    }
}
