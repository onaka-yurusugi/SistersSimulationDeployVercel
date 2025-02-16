import { EvaluationResult } from '@/types/game';

interface ResultContainerProps {
  result: EvaluationResult | null;
  affectionTotal: number;
}

export default function ResultContainer({ result, affectionTotal }: ResultContainerProps) {
  if (!result) return null;

  const getIcon = (score: number) => {
    if (score <= 0) return "😅 バッド";
    if (score < 10) return "😉 ノーマル";
    if (score < 20) return "😊 グッド";
    return "😇 パーフェクト";
  };

  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-sm m-4 transition-all duration-300">
      <div className="text-2xl mb-2">{getIcon(result.評価)}</div>
      <p className="text-lg mb-1">評価: {result.評価}</p>
      <p className="font-bold">累計親愛度: {affectionTotal}</p>
    </div>
  );
}
