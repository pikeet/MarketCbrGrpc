import { ICurrency } from "./currency.model";

export interface IResponseCurrency{
    statusCode: string;
    currency: ICurrency | ICurrency[]
}