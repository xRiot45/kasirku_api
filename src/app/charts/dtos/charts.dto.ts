export class CountDataResponseDto {
  readonly users: number;
  readonly products: number;
  readonly reports: number;
  readonly roles: number;
}

export class CountSaleByYearResponseDto {
  readonly jan: number;
  readonly feb: number;
  readonly mar: number;
  readonly apr: number;
  readonly may: number;
  readonly jun: number;
  readonly jul: number;
  readonly aug: number;
  readonly sep: number;
  readonly oct: number;
  readonly nov: number;
  readonly dec: number;
}

export class CountTotalProfitResponseDto {
  readonly total_profit: number;
}

export class CountOrderStatusResponseDto {
  readonly order_dikonfirmasi: number;
  readonly order_sedang_diproses: number;
  readonly order_selesai: number;
  readonly order_dibatalkan: number;
}
