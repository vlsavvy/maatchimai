import {

initializeModel,
askLLM

}

from "./webllm.js";

import {

buildWebsitePrompt,
buildLinkedInPrompt,
buildTwitterPrompt,
buildYoutubePrompt

}

from "./prompts.js";

initializeModel();

const form =
document.getElementById("toolForm");

form.addEventListener(

"submit",

async function(e){

e.preventDefault();

document.getElementById(
"generationStatus"
).textContent =
"Generating...";

const data={

siteUrl:
document.getElementById("siteUrl").value,

brand:
document.getElementById("brand").value,

audience:
document.getElementById("audience").value,

tone:
document.getElementById("tone").value,

keywords:
document.getElementById("keywords").value

};

try{

// Website Intelligence

const websiteInfo =
await askLLM(

buildWebsitePrompt(data)

);

document.getElementById(
"outWebsite"
).textContent =
websiteInfo;


// Lead Summary

document.getElementById(
"outLead"
).textContent =
websiteInfo;


// LinkedIn

if(document.getElementById(
"linkedin").checked){

document.getElementById(
"outLinkedin"
).textContent =

await askLLM(

buildLinkedInPrompt(
websiteInfo

)

);

}


// Twitter

if(document.getElementById(
"twitter").checked){

document.getElementById(
"outTwitter"
).textContent =

await askLLM(

buildTwitterPrompt(
websiteInfo

)

);

}


// YouTube

if(document.getElementById(
"youtube").checked){

document.getElementById(
"outYoutube"
).textContent =

await askLLM(

buildYoutubePrompt(
websiteInfo

)

);

}


document.getElementById(
"generationStatus").textContent =
" Completed";

}

catch(err){

console.error(err);

document.getElementById(
"generationStatus"
).textContent =
"Generation failed.";

}

}

);
