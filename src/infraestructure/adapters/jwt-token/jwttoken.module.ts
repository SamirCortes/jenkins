import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { jwtModuleConfig } from './jwt.config'
@Global()
@Module({
    imports: [JwtModule.register(jwtModuleConfig())],
    providers: [],
})
export class JwtTokenModule {}
