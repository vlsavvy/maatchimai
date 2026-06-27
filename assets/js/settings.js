const STORAGE_KEY = "maatchimai_gemini_api_key";

/*
----------------------------------------
Local Storage
----------------------------------------
*/

export function getApiKey() {
    return localStorage.getItem(STORAGE_KEY);
}

export function saveApiKey(key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearApiKey() {
    localStorage.removeItem(STORAGE_KEY);
}

/*
----------------------------------------
Modal
----------------------------------------
*/

export async function ensureApiKey() {

    // Already saved?
    const existingKey = getApiKey();

    if (existingKey) {
        return existingKey;
    }

    // Show modal
    return new Promise((resolve, reject) => {

        const modal = document.getElementById("apiModal");
        const input = document.getElementById("apiKeyInput");
        const saveBtn = document.getElementById("saveApiBtn");
        const cancelBtn = document.getElementById("cancelApiBtn");

        input.value = "";

        modal.style.display = "flex";

        input.focus();

        function cleanup() {

            saveBtn.removeEventListener("click", onSave);
            cancelBtn.removeEventListener("click", onCancel);

        }

        function onSave() {

            const key = input.value.trim();

            if (!key) {

                alert("Please enter your Gemini API Key.");

                return;

            }

            saveApiKey(key);

            modal.style.display = "none";

            cleanup();

            resolve(key);

        }

        function onCancel() {

            modal.style.display = "none";

            cleanup();

            reject(new Error("API key not provided."));

        }

        saveBtn.addEventListener("click", onSave);

        cancelBtn.addEventListener("click", onCancel);

    });

}
