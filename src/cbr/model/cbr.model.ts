export interface ICbr{
    ValCurs: ValCurs
}

export interface ValCurs {
    Valute:      Valute[];
}

export interface Valute {
    NumCode:     CharCode;
    CharCode:    CharCode;
    Nominal:     CharCode;
    Name:        CharCode;
    Value:       CharCode;
}

export interface CharCode {
    _text: string;
}