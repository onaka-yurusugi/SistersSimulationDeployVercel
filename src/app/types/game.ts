import { PersonalityType, CustomCharacter } from "./character";

export interface GameState {
    isLocked: boolean;
    affectionTotal: number;
    personality: PersonalityType | string;
    isFreeTextMode: boolean;
    lastResult: EvaluationResult | null;
}

export interface EvaluationResult {
    評価: number;
    反応: string;
    心の声: string;
}

export interface GameProps {
    initialPersonality?: PersonalityType;
    customCharacter?: CustomCharacter | null;
}
