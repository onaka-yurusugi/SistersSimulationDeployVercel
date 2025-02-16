import { useState } from 'react';
import { PersonalityType, CustomCharacter } from '@/types/character';

interface CharacterSelectModalProps {
  onSelect: (personality: PersonalityType, customData?: CustomCharacter) => void;
  onClose: () => void;
}

export default function CharacterSelectModal({ onSelect, onClose }: CharacterSelectModalProps) {
  const [personality, setPersonality] = useState<PersonalityType>("ツンデレ妹");
  const [customData, setCustomData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleSubmit = () => {
    if (personality === "その他") {
      onSelect(personality, customData);
    } else {
      onSelect(personality);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">妹の性格を選んでください</h2>

        <select
          className="w-full p-2 border rounded mb-4"
          value={personality}
          onChange={(e) => setPersonality(e.target.value as PersonalityType)}
        >
          <option value="ツンデレ妹">ツンデレ妹</option>
          <option value="クーデレ妹">クーデレ妹</option>
          <option value="デレデレ妹">デレデレ妹</option>
          <option value="ヤンデレ妹">ヤンデレ妹</option>
          <option value="活発妹">活発妹</option>
          <option value="ダウナー妹">ダウナー妹</option>
          <option value="おっとり妹">おっとり妹</option>
          <option value="ミステリアス妹">ミステリアス妹</option>
          <option value="社交的妹">社交的妹</option>
          <option value="クリエイティブ妹">クリエイティブ妹</option>
          <option value="委員長妹">委員長妹</option>
          <option value="夢見がち妹">夢見がち妹</option>
          <option value="その他">その他</option>
        </select>

        {personality === "その他" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="名前"
              className="w-full p-2 border rounded"
              value={customData.name}
              onChange={(e) => setCustomData(prev => ({ ...prev, name: e.target.value }))}
            />
            <textarea
              placeholder="性格の説明"
              className="w-full p-2 border rounded"
              value={customData.description}
              onChange={(e) => setCustomData(prev => ({ ...prev, description: e.target.value }))}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
            />
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
}
