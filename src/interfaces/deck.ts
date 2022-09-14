export enum DECK_TYPE {FULL = 'FULL', SHORT = 'SHORT'}

export const DECK_SHORT_AMOUNT = 32;

export interface IDeck {
    id: string,
    type: DECK_TYPE,
    shuffled: boolean,
}