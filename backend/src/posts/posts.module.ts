import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./posts.entity";
import { ResourceModule } from "src/resource/resource.module";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { UserEntity } from "src/users/users.entity";
import { UsersModule } from "src/users/users.module";

@Module({
    imports:[TypeOrmModule.forFeature([PostEntity, UserEntity]), ResourceModule, UsersModule],
    controllers:[PostsController],
    providers:[PostsService]
})
export class PostsModule {}