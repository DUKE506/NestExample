import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'JwtSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    //검증
    async validate(payload) {
        const { account } = payload;
        const user: User = await this.userRepository.findOne({
            select: { account: true, name: true },
            where: { account }
        });

        //실패
        if (!user) {
            throw new UnauthorizedException();
        }

        //성공
        return user;
    }
}