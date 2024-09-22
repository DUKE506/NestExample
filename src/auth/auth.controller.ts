import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/create-authCredential.dto';
import { SignInUserDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * POST 사용자 생성
     * @param authCredentialDto 
     * @returns 
     */
    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
    ): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) signInUserDto: SignInUserDto
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInUserDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req)
    }
}
