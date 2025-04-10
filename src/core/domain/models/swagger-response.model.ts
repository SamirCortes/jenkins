import { ApiProperty } from '@nestjs/swagger'

export class SwaggerResponse {
    @ApiProperty()
    statusCode: number
    @ApiProperty()
    message: string
    @ApiProperty({ nullable: true })
    data?: Array<object> | object | boolean
    @ApiProperty()
    timestamp: string
}
