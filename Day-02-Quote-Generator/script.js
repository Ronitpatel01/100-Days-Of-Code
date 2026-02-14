const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const btn = document.querySelector("#btn");
const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

async function getQuote() {
    // 1. Start Fade Out
    quoteText.classList.add("hidden");
    authorText.classList.add("hidden");

    // 2. Create two promises: one for data, one for a minimum delay
    const fetchPromise = fetch(url).then(res => res.json());
    const delayPromise = new Promise(resolve => setTimeout(resolve, 400));

    try {
        // Wait for BOTH to finish
        const [data] = await Promise.all([fetchPromise, delayPromise]);

        // 3. Update Content
        quoteText.innerText = `"${data.data.content}"`;
        authorText.innerText = `- ${data.data.author}`;

        // 4. Fade In
        quoteText.classList.remove("hidden");
        authorText.classList.remove("hidden");

    } catch (error) {
        quoteText.innerText = "Connection lost...";
        quoteText.classList.remove("hidden");
    }
}

btn.addEventListener("click", getQuote);

getQuote();
