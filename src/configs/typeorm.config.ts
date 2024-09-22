import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'memory506',
    database: 'board',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}