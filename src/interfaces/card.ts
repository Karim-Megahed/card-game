export interface ICard {
    id: number,
    value: string,
    suit: string,
    code: string
}

export const EXCLUDED_CARDS: string[] = ['2', '3', '4', '5', '6'];
