import { Module } from "@nestjs/common";
import { AdminModule } from "src/admin/admin.module";
import { AdminService } from "src/admin/admin.service";
import { FuncService } from "src/func/func.service";

@Module({
    imports: [AdminModule],
    providers: [FuncService, AdminService]
})
export class GatewayModule{}