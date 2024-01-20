import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { delay, lastValueFrom, map } from "rxjs";
import { ExecutionTime } from "./../common/decorators/execution-time.decorator";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get()
    @ExecutionTime()
    async getAll(): Promise<any> {
        return lastValueFrom(this.userService.getAllUsers()
            .pipe(
                map(users => [...users, {
                    "id": 11,
                    "name": "Idan Baraness",
                    "email": "idan.sad@karina.biz",
                    "companyName": "Hoeger LLC"
                }]),
            ))
    }

    @Get(':id')
    @ExecutionTime()
    async getUser(@Param('id') id: number): Promise<any> {
        return this.userService.getUserEntityById(id);
    }
}