import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        Logger.error(exception.message, 'HttpExceptionFilter')
        response.status(status).send({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
            path: request.url,
        })
    }
}
