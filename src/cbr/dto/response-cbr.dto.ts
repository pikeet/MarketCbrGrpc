import { ICurrency } from "../model/currency.model";

export interface IResponseCurrency{
    statusCode: string;
    currency: ICurrency | ICurrency[]
}