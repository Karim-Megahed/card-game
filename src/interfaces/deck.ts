export enum DECK_TYPE {FULL = 'FULL', HALF = 'HALF'}

export const DECK_FULL_AMOUNT = 52;
export const DECK_HALF_AMOUNT = 32;

export interface IDeck {
    id: number,
    uuid: string
    type: DECK_TYPE,
    shuffled: boolean,
}