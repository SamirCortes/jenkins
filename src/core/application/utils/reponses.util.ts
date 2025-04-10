import * as moment from 'moment-timezone'

export const response = (message: string, data: any, statusCode: number) => {
    return {
        message,
        data,
        statusCode,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
}

export const responseSuccess = (
    message: string,
    data: Array<object> | object | boolean | null,
    statusCode = 200
) => {
    return response(message, data, statusCode)
}
