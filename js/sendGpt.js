async function evaluateMessage(
    message,
    personality,
    affectionScore,
    customPrompt = null
) {
    const apiKey = "app-pr3GqTgsBf6MW7Z93akXKUw0"; // Dify APIキーに置き換えてください
    const apiUrl = "https://api.dify.ai/v1/workflows/run";
    const errorMessage = {
        評価: 0,
        反応: "＜エラー＞APIリクエストに失敗したみたい。sendGpt.js内のAPIキーの設定を確認してみてね。",
        心の声: "早くお兄ちゃんと話したいなあ。",
    };

    const data = {
        inputs: {
            message: message,
            personality: personality,
            affectionScore: affectionScore + 1, // 0だとAPIエラーになるので+1する
        },
        response_mode: "blocking",
        user: "abc-123",
    };

    // customPromptが存在する場合のみ追加
    if (customPrompt) {
        data.inputs.customPrompt = customPrompt;
    }

    console.log("Sending data to API:", data); // APIに送信するデータをログ出力

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Error:", error);
            return errorMessage;
        }

        const resultData = await response.json();
        console.log("API response:", resultData); // APIからの応答をログ出力

        if (
            resultData &&
            resultData.data &&
            resultData.data.outputs &&
            resultData.data.outputs.result
        ) {
            const result = resultData.data.outputs.result.trim();

            // 応答がJSONかテキストかを判断
            if (result.startsWith("{") && result.endsWith("}")) {
                try {
                    return JSON.parse(result);
                } catch (parseError) {
                    console.error("Error parsing JSON:", parseError);
                    console.log("Raw result:", result);
                }
            }

            // JSONでない場合、テキスト応答として処理
            return {
                評価: 10, // デフォルト値
                反応: result,
                心の声: "テキスト応答を受け取りました。",
            };
        } else {
            console.error("Unexpected API response structure:", resultData);
            return errorMessage;
        }
    } catch (error) {
        console.error("Error:", error);
        return errorMessage;
    }
}
