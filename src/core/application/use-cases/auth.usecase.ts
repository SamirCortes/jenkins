import { AuthService } from '@core/domain/services/auth.service'
import { UserService } from '@core/domain/services/user.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { SingInDto } from '../dto/auth/sing-in.dto'
import { CustomException } from '../exception/custom.exception'
import { comparePasswords } from '../utils/functions.util'
import { responseSuccess } from '../utils/reponses.util'
import { Response } from '@core/domain/models/reponse-http.model'
import { PayloadTokenDto, ResponseTokenDto, TokenDto } from '../dto/token/token.dto'
import { CreateTokenDto } from '../dto/token/create-token.dto'
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId

@Injectable()
export class AuthUseCase {
    constructor(
        private authService: AuthService,
        private readonly userService: UserService
    ) {}

    /**
     * Sign in a user with the provided credentials.
     *
     * @param {SingInDto} singInDto - The sign in data containing the email and password.
     * @param {any} req - The request object.
     * @return {Promise<Response>} A promise that resolves to the response object.
     */
    async signIn(singInDto: SingInDto, req: any): Promise<Response> {
        const email =  singInDto.email
        const user = await this.userService.findOneByWhere({ email: email });
        if (!user) {
            throw new CustomException(
                'El correo electrónico y/o la contraseña no son válidos',
                HttpStatus.UNAUTHORIZED
            )
        }

        const isEqualPassword = await comparePasswords(
            singInDto.password,
            user.password
        )

        if (isEqualPassword) {
            const PAYLOAD = { sub: user.id, email: user.email }
            const token = await this.generateToken(PAYLOAD)
            return responseSuccess('Usuario autentificado', {
                user,
                token,
            })
        }

        throw new CustomException(
            'El correo electrónico y/o la contraseña no son válidos',
            HttpStatus.UNAUTHORIZED
        ) 
    }

    /**
     * Generates a token using the provided payload.
     *
     * @param {PayloadTokenDto} payload - The payload used to generate the token.
     * @return {Promise<ResponseTokenDto>} The generated token.
     */
    async generateToken(payload: PayloadTokenDto): Promise<ResponseTokenDto> {
        const ACCESS_TOKEN = await this.authService.generateToken(payload)
        this.storeToken({
            userId: payload.sub,
            token: ACCESS_TOKEN,
        })
        return this.decodeToken(ACCESS_TOKEN)
    }

    /**
     * Stores a token by finding the user associated with the token's userId and then storing the token using the authService.
     *
     * @param {CreateTokenDto} token - The token to be stored.
     * @return {Promise<void>} - A promise that resolves when the token is stored successfully.
     */
    async storeToken(token: CreateTokenDto) {
        token.user = await this.userService.findById(new ObjectId(token.userId))
        this.authService.storeToken(token)
    }

    /**
     * Decodes a given token and returns the corresponding response token DTO.
     *
     * @param {string} token - The token to be decoded.
     * @return {Promise<ResponseTokenDto>} The response token DTO containing the decoded token, its expiration date, and the issuing date.
     */
    async decodeToken(token: string): Promise<ResponseTokenDto> {
        const DECODED_TOKEN: TokenDto =
            await this.authService.decodeToken(token)
        return {
            accessToken: token,
            expiresIn: new Date(DECODED_TOKEN.exp * 1000),
            issuedAt: new Date(DECODED_TOKEN.iat * 1000),
        }
    }

    /**
     * Sign up a user using the provided token.
     *
     * @param {string} token - The token used for signing up.
     * @return {Promise<Response>} A promise that resolves to a response indicating the success or failure of the sign up process.
     */
    async signUp(token: string): Promise<Response> {
        token = token.split(' ')[1]
        const TOKEN_OLD = await this.authService.findToken(token)
        if (!TOKEN_OLD) {
            throw new CustomException('Token inválido', HttpStatus.UNAUTHORIZED)
        }
        this.authService.removeToken({ id: TOKEN_OLD.id })
        return responseSuccess('Cierre de sesión', null)
    }

    /**
     * Retrieves the status of the user by refreshing their token and returning a success response with the token and session.
     *
     * @param {any} req - The request object containing the user information.
     * @return {Promise<Response>} A promise that resolves to a success response with the token and session.
     * @throws {CustomException} If the user is not authenticated.
     */
    async status(req: any): Promise<Response> {
        if (!req) {
            throw new CustomException(
                'Usuario no autentificado',
                HttpStatus.UNAUTHORIZED
            )
        }
        const token = await this.refreshToken(req)
        return responseSuccess('Usuario autentificado', {
            token,
            session: req.session,
        })
    }

    /**
     * Refreshes the access token for the user.
     *
     * @param {Object} req - The request object containing the user token and access token.
     * @param {TokenDto} req.user - The user token.
     * @param {string} req.token - The access token.
     * @return {Promise<any>} A promise that resolves to the refreshed access token or the decoded access token.
     */
    async refreshToken(req: { user: TokenDto; token: string }): Promise<any> {
        const EXPIRES_IN: { exp: number } = await this.authService.decodeToken(
            req.token
        )
        const NOW = Math.floor(Date.now() / 1000)
        const TIME_EXPIRATION = EXPIRES_IN.exp - NOW
        if (TIME_EXPIRATION < 300) {
            const PAYLOAD = {
                sub: req.user.sub,
                email: req.user.email,
            }
            this.authService.removeToken({ id: req.token })
            return await this.generateToken(PAYLOAD)
        }
        return this.decodeToken(req.token)
    }

}
