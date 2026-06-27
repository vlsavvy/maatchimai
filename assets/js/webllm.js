// assets/js/webllm.js

import { ensureApiKey } from "./settings.js";

const MODEL = "gemini-2.5-flash";

let initialized = false;

export async function initializeModel() {

    const modelStatus = document.getElementById("modelStatus");
    const modelProgress = document.getElementById("modelProgress");
    const generateBtn = document.getElementById("generateBtn");

    try {

        await ensureApiKey();

        initialized = true;

        modelStatus.textContent = "✅ Gemini Connected";

        if (modelProgress) {
            modelProgress.value = 100;
        }

        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.textContent = "Generate";
        }

    } catch (err) {

        console.error(err);

        modelStatus.textContent = "⚠ Gemini API Key Required";

    }

}

export async function askLLM(prompt) {

    if (!initialized) {
        await initializeModel();
    }

    const apiKey = await ensureApiKey();

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text:
`You are a senior B2B marketing strategist.

${prompt}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const json = await response.json();

    return json.candidates[0].content.parts[0].text;
}
