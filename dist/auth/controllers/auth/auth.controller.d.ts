import LoginUserDto from 'src/auth/dto/login-user.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import SignUserDto from 'src/auth/dto/sign-user.dto';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(res: FastifyReply, reqBody: LoginUserDto): Promise<void>;
    register(res: FastifyReply, reqBody: CreateUserDto): Promise<void>;
    getProfile(req: FastifyRequest): SignUserDto;
}
