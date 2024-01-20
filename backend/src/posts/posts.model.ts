import { IsInt, IsString } from 'class-validator';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export class CreatePostDto {
    @IsInt()
    userId: number;

    @IsString()
    title: string;

    @IsString()
    body: string;
}