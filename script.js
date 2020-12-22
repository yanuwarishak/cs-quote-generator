const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  try {
    const response = await fetch(
      "http://quotes.stormconsultancy.co.uk/random.json"
    );
    const data = await response.json();

    // In case author is blank, we would print out Unknown
    if (data.author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.author;
    }

    // Reduce font size for long quote
    if (data.quote.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quote;
    // Stop loader then shows quote
    removeLoadingSpinner();
  } catch (error) {
    console.log("No quote loaded", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterIntent = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterIntent, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
