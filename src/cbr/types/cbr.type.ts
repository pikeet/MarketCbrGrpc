export type CbrNameType = 'Рубль' | 'Юань' | 'Доллар';
export type CbrRecord = Record<number, CbrNameType>;

export const CbrFacture: CbrRecord = {
    860: 'Рубль',
    840: 'Доллар',
    156: 'Юань'
}