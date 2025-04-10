import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configEnv } from './config'

@Module({
    imports: [ConfigModule.forRoot(configEnv())],
    exports: [ConfigModule],
})
export class ConfigEnvModule {}
