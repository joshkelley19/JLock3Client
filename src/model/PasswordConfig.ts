import { CharacterConfig } from './CharacterConfig';
export interface PasswordConfig {
    custom: boolean;
    length: number;
    upperCase: CharacterConfig;
    lowerCase: CharacterConfig;
    numbers: CharacterConfig;
    characters: CharacterConfig;
    charStandard: boolean;
}