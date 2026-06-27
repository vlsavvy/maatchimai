import { ensureApiKey } from "./settings.js";

const MODEL =
"gemini-2.5-flash";

export async function generate(prompt){

    const apiKey =
        await ensureApiKey();

    const response =
        await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

contents:[

{

parts:[

{

text:prompt

}

]

}

]

})

}

);

    if(!response.ok){

        const err =
            await response.text();

        throw new Error(err);

    }

    const json =
        await response.json();

    return json.candidates[0]
        .content.parts[0].text;

}
