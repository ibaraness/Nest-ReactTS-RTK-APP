import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { lastValueFrom } from "rxjs";
import { ExecutionTime } from "./../common/decorators/execution-time.decorator";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get()
    @ExecutionTime()
    async getAll(): Promise<any> {
        return lastValueFrom(this.userService.getAllUsers())
    }

    @Get(':id')
    @ExecutionTime()
    async getUser(@Param('id') id: number): Promise<any> {
        return this.userService.getUserEntityById(id);
    }
}