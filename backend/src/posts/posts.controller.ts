import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { delay, lastValueFrom } from "rxjs";
import { CreatePostDto } from "./posts.model";
import { ExecutionTime } from "src/common/decorators/execution-time.decorator";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){}

    @Get('all')
    @ExecutionTime()
    async getAll(){
        return lastValueFrom(this.postService.getPosts());
    }

    @Get(':userId')
    @ExecutionTime()
    async getUserPosts(@Param('userId') userId: number){
        return lastValueFrom(this.postService.getUserPosts(userId));
    }

    @Post()
    @ExecutionTime()
    async createPost(@Body() createPostDto: CreatePostDto){
        return this.postService.createNewPost(createPostDto);
    }
}