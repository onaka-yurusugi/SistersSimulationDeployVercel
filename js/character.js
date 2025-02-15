// Description: 妹ハーレムの性格を定義するオブジェクト
const personalities = {
    "ツンデレ妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【ツンデレ妹】",
        "producerText": "・・・なによ。"
    },
    "クーデレ妹": {
        "characterImage": "./images/coodere.webp",
        "characterName": "【クーデレ妹】",
        "producerText": "うん、なに？"
    },
    "デレデレ妹": {
        "characterImage": "./images/deredere.webp",
        "characterName": "【デレデレ妹】",
        "producerText": "お兄ちゃん、大好き！"
    },
    "ヤンデレ妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【ヤンデレ妹】",
        "producerText": "お兄ちゃんは私だけのもの..."
    },
    "活発妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【活発妹】",
        "producerText": "お兄ちゃん、遊ぼうよ！"
    },
    "ダウナー妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【ダウナー妹】",
        "producerText": "ふーん、別に..."
    },
    "おっとり妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【おっとり妹】",
        "producerText": "お兄ちゃん、どうしたの？"
    },
    "ミステリアス妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【ミステリアス妹】",
        "producerText": "フフフ..."
    },
    "社交的妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【社交的妹】",
        "producerText": "お兄ちゃん、洋服買いに行こうよ！"
    },
    "クリエイティブ妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【クリエイティブ妹】",
        "producerText": "お兄ちゃん、これ見て！"
    },
    "委員長妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【委員長妹】",
        "producerText": "お兄ちゃん、宿題やった？"
    },
    "夢見がち妹": {
        "characterImage": "./images/tsundere.webp",
        "characterName": "【夢見がち妹】",
        "producerText": "お兄ちゃん、夢の話しようよ！"
    }
};

function updateCharacter(personality) {
    const characterImage = document.getElementById("character-image");
    const characterName = document.getElementById("character-name");
    const producerText = document.getElementById("producer-text");

    if (typeof personality === 'string') {
        const character = personalities[personality];
        if (character) {
            characterImage.src = character.characterImage;
            characterName.textContent = character.characterName;
            producerText.textContent = character.producerText;
        }
    } else if (typeof personality === 'object') {
        // カスタムキャラクターの場合
        characterImage.src = personality.image;
        characterName.textContent = `【${personality.name}】`;
        producerText.textContent = personality.description || "..."; // 説明がない場合のデフォルトテキスト
    }
}