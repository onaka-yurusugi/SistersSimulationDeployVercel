'use client';

import { useCharacterSelect } from '@/hooks/useCharacterSelect';
import GameContainer from '@/components/GameContainer';
import CharacterSelectModal from '@/components/Modal/CharacterSelectModal';

export default function Home() {
  const {
    showModal,
    selectedPersonality,
    customCharacter,
    handleCharacterSelect,
    setShowModal
  } = useCharacterSelect();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          妹萌え萌えコミュニケーションゲーム
        </h1>

        <GameContainer
          initialPersonality={selectedPersonality}
          customCharacter={customCharacter}
        />

        {showModal && (
          <CharacterSelectModal
            onSelect={handleCharacterSelect}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
