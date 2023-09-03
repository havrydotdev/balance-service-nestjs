import { JwtService } from '@nestjs/jwt';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import { UsersService } from 'src/users/services/users/users.service';
import CreateUserDto from 'src/users/dto/create-user.dto';
import SignUserDto from 'src/auth/dto/sign-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser({ email, password, }: LoginUserDto): Promise<SignUserDto | null>;
    login(loginDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    register(regDto: CreateUserDto): Promise<number>;
}
