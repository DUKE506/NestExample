import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/create-authCredential.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }


    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        try {
            const { account, password, name } = authCredentialDto;

            console.log('아이디 : ', account)

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = this.create({
                account,
                password: hashedPassword,
                name
            });

            await this.save(user);
        } catch (err) {
            console.log('[Error][auth][create] 사용자 생성 에러');
            if (err.code = 23505) {
                throw new ConflictException(`${authCredentialDto.account} is Existing`);
            } else {
                throw new InternalServerErrorException();
            }

        }

    }
} 