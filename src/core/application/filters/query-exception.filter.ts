import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = 500
        Logger.error(exception.message)
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: 'Ha ocurrido un error, por parte de nosotros.',
            path: request.url,
        })
    }
}
