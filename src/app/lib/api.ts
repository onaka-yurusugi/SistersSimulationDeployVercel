// src/lib/api.ts
import { EvaluationResult } from "@/types/game";
import { PersonalityType } from "@/types/character";

const API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY;
const API_URL = "https://api.dify.ai/v1/workflows/run";

interface ApiResponse {
    data: {
        outputs: {
            result: string;
        };
    };
}

const errorResult: EvaluationResult = {
    評価: 0,
    反応: "＜エラー＞APIリクエストに失敗しました。",
    心の声: "早くお兄ちゃんと話したいなあ。",
};

export async function evaluateMessage(
    message: string,
    personality: PersonalityType | string,
    affectionScore: number,
    customPrompt?: string
): Promise<EvaluationResult> {
    if (!API_KEY) {
        console.error("API key is not set");
        return errorResult;
    }

    const data = {
        inputs: {
            message,
            personality,
            affectionScore: affectionScore + 1,
            ...(customPrompt ? { customPrompt } : {}),
        },
        response_mode: "blocking",
        user: "user-" + Math.random().toString(36).substr(2, 9),
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resultData = (await response.json()) as ApiResponse;
        const result = resultData.data.outputs.result.trim();

        try {
            return JSON.parse(result) as EvaluationResult;
        } catch {
            return {
                評価: 10,
                反応: result,
                心の声: "テキスト応答を受け取りました。",
            };
        }
    } catch (error) {
        console.error("API Error:", error);
        return errorResult;
    }
}
