import { Module } from "@nestjs/common";
import { FuncService } from "src/func/func.service";

@Module({
    providers: [FuncService]
})
export class GatewayModule{}