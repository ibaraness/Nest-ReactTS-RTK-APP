import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable, lastValueFrom, map } from "rxjs";
import { ResourceService } from "src/resource/resource.service";
import { UserEntity } from "./users.entity";
import { Repository } from "typeorm";
import { User, UserDTO } from "./users.model";

@Injectable()
export class UsersService {

    constructor(private http: HttpService, private resource: ResourceService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>) { }

    getAllUsers(): Observable<User[]> {
        return this.resource.getAllUsers();
    }

    //get userById internally and create a local user from that
    async getUserEntityById(id: number) {
        // Check if already exist
        const existUser = await this.usersRepository.findOneBy({publicId:id});
        if(existUser){
            return existUser;
        }

        const user = await lastValueFrom(this.getAllUsers().pipe(
            map(users => users.find(user => +user.id === +id))));
        if(!user){
            throw new HttpException('User does not exist', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.createUser(user);
    }

    private async createUser({ companyName, email, name, id }: UserDTO): Promise<UserEntity> {
        const user = this.usersRepository.create();
        user.companyName = companyName;
        user.email = email;
        user.name = name;
        user.publicId = id;
        return this.usersRepository.save(user);
    }
}