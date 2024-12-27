let quoteArray = [];
let index = 0;
let textPosition = 0;
let flag = true;
let destination = document.getElementById("typetext");
window.addEventListener('load', () => {
    loadQuote();
    typewriter();
});
function loadQuote() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error(`HTTP error: ${response.status}`);
        })
        .then(data => {
            quoteArray = data.map(post => post.body);
        })
        .catch(error => console.error('Error fetching quotes:', error));
}
function typewriter() {
    if (quoteArray.length === 0) {
        setTimeout(typewriter, 100);
        return;
    }
    if (flag) {
        flag = false;
        textPosition = 0;
    }
    const currentQuote = quoteArray[index];
    destination.innerHTML = currentQuote.substring(0, textPosition) + '<span>\u25AE</span>';

    if (textPosition++ < currentQuote.length) {
        setTimeout(typewriter, 100);
    } else {
        textPosition = 0;
        flag = true;
        index = (index + 1) % quoteArray.length;
        setTimeout(typewriter, 3000);
    }
}
