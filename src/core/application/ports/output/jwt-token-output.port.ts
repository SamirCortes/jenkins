export interface JWTTokenOutputPort {
    generate(payload: { sub: string; email: string }): Promise<any>
    decode(token: string): Promise<any>
    verify(token: string): Promise<any>
}
