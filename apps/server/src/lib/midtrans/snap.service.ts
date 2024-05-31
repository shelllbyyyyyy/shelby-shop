import { Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { MODULE_OPTIONS_TOKEN } from "./midtrans.module-definition";
import { MidtransConfig } from "./dto/config";
import { BaseService } from "./base.service";
import { CheckoutDTO, SnapTransactionDTO } from "@shelby/dto";

@Injectable()
export class SnapService extends BaseService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly config: MidtransConfig) {
    super();
    this.init(config);
  }

  public init(config: MidtransConfig) {
    const authToken = Buffer.from(config.serverKey + ":").toString("base64");
    const baseUrl = config.sandbox ? "https://app.sandbox.midtrans.com/snap" : "https://app.midtrans.com/snap";
    this.httpClient = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  public async transaction(payload: SnapTransactionDTO) {
    return await this.handleRequest("post", `/v1/transactions`, payload);
  }
}
