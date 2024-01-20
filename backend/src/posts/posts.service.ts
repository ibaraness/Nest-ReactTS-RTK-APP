import { Injectable } from "@nestjs/common";
import { Observable, from, map, switchMap } from "rxjs";
import { ResourceService } from "src/resource/resource.service";
import { CreatePostDto, Post } from "./posts.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from "./posts.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PostsService {

    private static ID_Mask = 100000;

    constructor(private resource: ResourceService,
        private userService: UsersService,
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,) { }

    getPosts(): Observable<any[]> { //for tests only
        return this.resource.getAllPosts().pipe(
            switchMap(posts => from(this.postsRepository.find({ relations: { user: true } })).pipe(
                map(others => others.map(other => this.formatPostEntity(other))),
                map(others => [...others, ...posts])
                )
            )
        );
    }

    getUserPosts(userId: number): Observable<Post[]> {
        return this.resource.getAllPosts().pipe(
            map(posts => (posts.filter(post => +post.userId === +userId))),
            switchMap(posts => from(this.postsRepository.find({ relations: { user: true } })).pipe(
                map(others => others.filter(other => +other.user.publicId === +userId)),
                map(others => others.map(other => this.formatPostEntity(other))),
                map(others => [...others, ...posts])
                )
            )
        )
    }

    private formatPostEntity(postEntity: PostEntity) {
        return {
            userId: postEntity.user.publicId,
            id: +postEntity.id + PostsService.ID_Mask,
            title: postEntity.title,
            body: postEntity.body
        }
    }

    async createNewPost({ userId, title, body }: CreatePostDto): Promise<Post> {
        // Create or find user entity
        const userEntity = await this.userService.getUserEntityById(userId);

        // Create a new post
        const post = this.postsRepository.create();
        post.body = body;
        post.title = title;
        post.user = userEntity;
        const postEntity = await this.postsRepository.save(post);

        return this.formatPostEntity(postEntity);
    }
}