import { Module } from "@nestjs/common";
import { AdminModule } from "src/admin/admin.module";
import { AdminService } from "src/admin/admin.service";
import { FuncService } from "src/func/func.service";
import { Gateway } from "./gateway";

@Module({
    imports: [AdminModule],
    providers: [FuncService, AdminService, Gateway]
})
export class GatewayModule{}