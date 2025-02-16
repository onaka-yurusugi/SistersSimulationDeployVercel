import { useState, useCallback } from "react";
import { GameState, EvaluationResult } from "@/types/game";
import { PersonalityType } from "@/types/character";
import { evaluateMessage } from "@/lib/api";

export const useGameState = (initialPersonality?: PersonalityType) => {
    const [state, setState] = useState<GameState>({
        isLocked: false,
        affectionTotal: 0,
        personality: initialPersonality || "ツンデレ妹",
        isFreeTextMode: false,
        lastResult: null,
    });

    const handleSelection = useCallback(
        async (message: string): Promise<EvaluationResult | undefined> => {
            if (state.isLocked) return;

            setState((prev) => ({ ...prev, isLocked: true }));

            try {
                const result = await evaluateMessage(
                    message,
                    state.personality,
                    state.affectionTotal
                );

                setState((prev) => ({
                    ...prev,
                    affectionTotal: prev.affectionTotal + result.評価,
                    lastResult: result,
                    isLocked: false,
                }));

                // playAnimation();  ← この呼び出しを削除またはコメントアウト
                return result;
            } catch (error) {
                console.error("Error:", error);
                setState((prev) => ({ ...prev, isLocked: false }));
            }
        },
        [state.isLocked, state.personality, state.affectionTotal]
    );

    const handleFreeText = useCallback(
        async (text: string) => {
            if (!text.trim()) return;
            return handleSelection(text);
        },
        [handleSelection]
    );

    const toggleMode = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isFreeTextMode: !prev.isFreeTextMode,
        }));
    }, []);

    return {
        state,
        setState,
        handleSelection,
        handleFreeText,
        toggleMode,
    };
};
