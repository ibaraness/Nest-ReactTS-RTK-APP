import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { Observable } from "rxjs";

@Module({
    imports:[HttpModule],
    providers:[ResourceService],
    exports:[ResourceService]
})
export class ResourceModule {}