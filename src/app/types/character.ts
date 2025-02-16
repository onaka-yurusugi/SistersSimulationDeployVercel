export type PersonalityType =
    | "ツンデレ妹"
    | "クーデレ妹"
    | "デレデレ妹"
    | "ヤンデレ妹"
    | "活発妹"
    | "ダウナー妹"
    | "おっとり妹"
    | "ミステリアス妹"
    | "社交的妹"
    | "クリエイティブ妹"
    | "委員長妹"
    | "夢見がち妹"
    | "その他";

export interface Character {
    characterImage: string;
    characterName: string;
    producerText: string;
}

export interface CustomCharacter {
    name: string;
    description: string;
    image: string;
}
