import Image from 'next/image';
import { PersonalityType } from '@/types/character';

interface CharacterWindowProps {
  personality: PersonalityType | string;
  showAnimation: boolean;
}

export default function CharacterWindow({ personality, showAnimation }: CharacterWindowProps) {
  return (
    <div className="relative h-[500px]">
      <Image
        src={`/images/${personality.toLowerCase().replace('妹', '')}.webp`}
        alt={personality}
        className="w-full h-full object-cover"
        width={600}
        height={500}
        priority
      />
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg shadow-sm">
        <p className="font-bold">【{personality}】</p>
        <p id="producer-text">...</p>
      </div>
      {showAnimation && (
        <object
          type="image/svg+xml"
          data="/effects/favorability-up-animation.svg"
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
        />
      )}
    </div>
  );
}
