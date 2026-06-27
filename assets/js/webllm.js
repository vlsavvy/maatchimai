import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

let engine = null;

export async function initializeModel() {

    const modelStatus = document.getElementById("modelStatus");
    const modelProgress = document.getElementById("modelProgress");
    const generateBtn = document.getElementById("generateBtn");

    modelStatus.textContent = "Loading AI model...";

    try {

        engine = await CreateMLCEngine(

            "Llama-3.2-3B-Instruct-q4f16_1-MLC",

            {

                initProgressCallback(progress) {

                    modelStatus.textContent = progress.text;

                    if(progress.progress){

                        modelProgress.value =
                            progress.progress * 100;

                    }

                }

            }

        );

        modelStatus.textContent =
            "✅ Local AI Ready";

        modelProgress.value = 100;

        generateBtn.disabled = false;

        generateBtn.textContent =
            "Generate";

    }

    catch(err){

        console.error(err);

        modelStatus.textContent =
            "❌ Failed to load AI model";

    }

}

export async function askLLM(prompt){

    const reply =
        await engine.chat.completions.create({

            messages:[

                {

                    role:"system",

                    content:
                    "You are a senior B2B marketing strategist."

                },

                {

                    role:"user",

                    content:prompt

                }

            ],

            temperature:0.7,

            stream:false

        });

    return reply.choices[0].message.content;

}
