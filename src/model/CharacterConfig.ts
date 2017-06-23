export interface CharacterConfig {
    amount: number;
    type: CharacterConfig.STATUS

}
export namespace CharacterConfig {
    export enum STATUS {
        NONE,
        ONEPLUS,
        CUSTOM
    }
}