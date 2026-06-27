let engine = null;

let modelLoaded = false;

const MODEL = "Llama-3.2-3B-Instruct-q4f16_1";
// Later we can easily switch to Gemma or Phi.

async function initializeModel() {

    const status =
        document.getElementById("modelStatus");

    const progress =
        document.getElementById("modelProgress");

    const button =
        document.getElementById("generateBtn");

    try {

        status.textContent = "Loading WebLLM...";

        engine = new window.webllm.MLCEngine();

        await engine.reload(

            MODEL,

            {

                initProgressCallback(report) {

                    progress.value =
                        report.progress * 100;

                    status.textContent =
                        report.text;

                }

            }

        );

        modelLoaded = true;

        progress.value = 100;

        status.textContent =
            "✅ AI Ready (Running Locally)";

        button.disabled = false;

        button.textContent =
            "Generate";

    }

    catch (err) {

        console.error(err);

        status.textContent =
            "❌ Failed to load model";

    }

}

async function generate(prompt) {

    if (!modelLoaded)
        throw new Error("Model not ready");

    const reply = await engine.chat.completions.create({

        messages: [

            {

                role: "system",

                content:
                    "You are an expert B2B marketing strategist."

            },

            {

                role: "user",

                content: prompt

            }

        ],

        temperature: 0.7,

        max_tokens: 1200

    });

    return reply.choices[0].message.content;

}

window.generate = generate;

initializeModel();
