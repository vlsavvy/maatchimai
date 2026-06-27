const STORAGE_KEY = "maatchimai_gemini_api_key";

export function getApiKey() {
    return localStorage.getItem(STORAGE_KEY);
}

export function saveApiKey(key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearApiKey() {
    localStorage.removeItem(STORAGE_KEY);
}

export async function ensureApiKey() {

    let key = getApiKey();

    if (key) {
        return key;
    }

    key = window.prompt(
`Enter your Google Gemini API Key.

It will be stored only in this browser and is never uploaded to GitHub.

You can remove it anytime from Settings.`);

    if (!key || key.trim() === "") {
        throw new Error("Gemini API key not provided.");
    }

    saveApiKey(key);

    return key.trim();
}
