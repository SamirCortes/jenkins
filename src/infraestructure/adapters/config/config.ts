import { ConfigModuleOptions } from '@nestjs/config'
import environment from './environment.config'
export const configEnv = (): ConfigModuleOptions => ({
    isGlobal: true,
    expandVariables: true,
    envFilePath: ['.env'],
    load: [environment],
    validationSchema: null,
    validationOptions: {
        allowUnknown: true,
        abortEarly: false,
    },
})
