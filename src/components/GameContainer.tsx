// src/components/GameContainer.tsx
'use client';

import { useState, useEffect } from 'react';
import { GameProps, GameState, EvaluationResult } from '@/types/game';
import CharacterWindow from './CharacterWindow';
import OptionsContainer from './OptionsContainer';
import ResultContainer from './ResultContainer';
import { evaluateMessage } from '@/lib/api';
import { useGameState } from '@/hooks/useGameState';

export default function GameContainer({ initialPersonality }: GameProps) {
  const {
    state,
    setState,
    handleSelection,
    handleFreeText,
    toggleMode
  } = useGameState(initialPersonality);

  const [showAnimation, setShowAnimation] = useState(false);

  const playAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 4000);
  };

  const handleResult = async (message: string) => {
    if (state.isLocked) return;

    setState(prev => ({ ...prev, isLocked: true }));

    try {
      const result = await evaluateMessage(
        message,
        state.personality,
        state.affectionTotal
      );

      setState(prev => ({
        ...prev,
        affectionTotal: prev.affectionTotal + result.評価,
        isLocked: false
      }));

      playAnimation();
      return result;
    } catch (error) {
      console.error('Error:', error);
      setState(prev => ({ ...prev, isLocked: false }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <CharacterWindow
        personality={state.personality}
        showAnimation={showAnimation}
      />

      {state.isFreeTextMode ? (
        <div className="p-4 flex gap-2">
          <textarea
            className="flex-1 p-2 border rounded"
            placeholder="自由に入力してください..."
            onChange={(e) => handleFreeText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleFreeText}
          >
            送信
          </button>
        </div>
      ) : (
        <OptionsContainer onSelect={handleSelection} />
      )}

      <ResultContainer
        result={state.lastResult}
        affectionTotal={state.affectionTotal}
      />

      <button
        className="w-full p-4 bg-orange-500 text-white hover:bg-orange-600 transition"
        onClick={toggleMode}
      >
        {state.isFreeTextMode ? '選択肢モードに切り替え' : '自由記入モードに切り替え'}
      </button>
    </div>
  );
}
