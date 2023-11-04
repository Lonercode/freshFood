export interface PaystackModuleOptions {
    paystackBaseUrl: string
    paystackSecretKey: string
    paystackPublicKey?: string
    paystackSubaccountCode?: string
}

export interface PaystackModuleAsyncOptions {
    imports?: any[];
    useFactory: (...args: any[]) => Promise<PaystackModuleOptions> | PaystackModuleOptions;
    inject?: any[];
  }