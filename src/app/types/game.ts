export interface GameState {
    isLocked: boolean;
    affectionTotal: number;
    personality: PersonalityType | string;
    isFreeTextMode: boolean;
}

export interface EvaluationResult {
    評価: number;
    反応: string;
    心の声: string;
}

export interface GameProps {
    initialPersonality?: PersonalityType;
}
