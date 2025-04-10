import * as dotenv from 'dotenv'
dotenv.config()

interface AppConfig {
    SERVER_PORT: string
    MONGO_DB_URL: string
    JWT_SECRET: string
    BREEDS_API: string
    BREEDS_API_KEY: string
}

export default (): AppConfig => ENV

export const ENV = {
    JWT_SECRET: process.env.JWT_SECRET,
    SERVER_PORT: process.env.SERVER_PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    BREEDS_API: process.env.BREEDS_API,
    BREEDS_API_KEY: process.env.BREEDS_API_KEY
}
