import { Inject, Injectable } from "@nestjs/common";
import { PAYSTACK_OPTIONS  } from "../constants";
import { HttpService } from "@nestjs/axios";
// import { Observable } from "rxjs";
import { AxiosError, AxiosResponse } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { PaystackModuleOptions } from "../interfaces";


@Injectable()
export class PaystackService {

    private readonly secretKey: string;
    private readonly baseUrl: string;
    private readonly subaccountCode: string;

  constructor(
    @Inject(PAYSTACK_OPTIONS) private readonly options: PaystackModuleOptions,
    private readonly httpService: HttpService
  ) {
    this.secretKey = options.paystackSecretKey;
    this.baseUrl = options.paystackBaseUrl;
    this.subaccountCode = options.paystackSubaccountCode;
  }

  async initializeTransaction(
    amount: number,
    email: string,
    reference: string,
  ): Promise<AxiosResponse> {
    const { data } = await firstValueFrom(
        
        this.httpService.post(
            `${this.baseUrl}/transaction/initialize`,
            {
                amount,
                email,
                reference,
                subaccount: this.subaccountCode,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    'Content-Type': 'application/json',
                },
            },
        ).pipe (
            catchError((error: AxiosError) => {
                throw error.response;
            })
        )
    );
    return data;
  }

  async verifyTransaction(reference: string): Promise<AxiosResponse> {
    const { data } = await firstValueFrom(
        this.httpService.get(
            `${this.baseUrl}/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    'Content-Type': 'application/json',
                },
            },
        ).pipe (
            catchError((error: AxiosError) => {
                throw error.response;
            })
        )
    );
    return data;
  }
}