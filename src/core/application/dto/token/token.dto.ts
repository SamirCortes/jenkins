export class TokenDto {
    email?: string
    sub?: string
    iat?: number
    exp?: number
}

export class PayloadTokenDto {
    email: string
    sub: string
}

export class ResponseTokenDto {
    accessToken: string
    expiresIn: Date
    issuedAt: Date
}
