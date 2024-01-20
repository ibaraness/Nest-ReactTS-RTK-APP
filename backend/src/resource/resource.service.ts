import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { RawResourceUser } from "./resource.model";
import { User } from "src/users/users.model";
import { Post } from "src/posts/posts.model";

@Injectable()
export class ResourceService {

    // external resource base
    private static base = "https://jsonplaceholder.typicode.com";

    constructor(private httpService: HttpService) { }

    getAllUsers(): Observable<User[]> {
        const url = `${ResourceService.base}/users`;
        return this.httpService.get(url).pipe(
            map(res => res.data),
            map((users: RawResourceUser[]) => users.map(
                ({ name, id, email, company }) => ({
                    id, name, email, companyName: company.name
                })
            ))
        )
    }

    getAllPosts(): Observable<Post[]>{
        const url = `${ResourceService.base}/posts`;
        return this.httpService.get(url).pipe(
            map(res => res.data)
        )
    }
}