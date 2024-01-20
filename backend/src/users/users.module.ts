import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users.entity";
import { PostEntity } from "src/posts/posts.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ResourceModule } from "src/resource/resource.module";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]), HttpModule, ResourceModule],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {

}