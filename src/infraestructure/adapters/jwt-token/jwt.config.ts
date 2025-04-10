import { JwtModuleOptions } from '@nestjs/jwt'
import { ENV } from '../config/environment.config'

export const jwtModuleConfig = (): JwtModuleOptions => ({
    secret: ENV.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
    global: true,
})
