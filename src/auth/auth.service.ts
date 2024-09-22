import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/create-authCredential.dto';
import { SignInUserDto } from './dto/signIn.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { };


    /**
     * POST 사용자 생성
     * @param authCredentialDto 
     * @returns 
     */
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
        const { account, password } = signInUserDto;
        const user = await this.userRepository.findOne({
            where: { account },
        });

        //로그인 실패
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Login Failed..')
        }

        //로그인 성공
        // 토큰 생성
        const payload = { account, user: user.name };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

}
