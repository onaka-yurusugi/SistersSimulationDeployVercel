import { useState, useEffect } from 'react';
import { getRandomOptions } from '@/lib/options';

interface OptionsContainerProps {
  onSelect: (message: string) => Promise<void>;
}

export default function OptionsContainer({ onSelect }: OptionsContainerProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setOptions(getRandomOptions());
  }, []);

  const handleClick = async (option: string) => {
    setSelectedOption(option);
    await onSelect(option);
    setSelectedOption(null);
    setOptions(getRandomOptions());
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-button ${selectedOption === option ? 'selected' : ''}`}
          onClick={() => handleClick(option)}
          disabled={selectedOption !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
