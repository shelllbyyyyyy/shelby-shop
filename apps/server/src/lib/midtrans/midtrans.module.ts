import { Module } from "@nestjs/common";

import { ConfigurableModuleClass } from "./midtrans.module-definition";
import { SnapService } from "./snap.service";

@Module({
  providers: [SnapService],
  exports: [SnapService],
})
export class MidtransModule extends ConfigurableModuleClass {}
