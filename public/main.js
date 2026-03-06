const stockSW = '/uv/uv.sw.js';
const swConfig = { prefix: '/service/' };
const frame = document.getElementById('uv-frame');

// Registration of the Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(stockSW, { scope: swConfig.prefix });
}

function encodeUV(str) {
    if (!str) return str;
    return encodeURIComponent(str.split('').map((char, i) => i % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char).join(''));
}

function load(type) {
    if (type === 'games') frame.src = "game.html";
    if (type === 'social') frame.src = swConfig.prefix + encodeUV("https://discord.com");
}

document.getElementById('uv-address').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let url = this.value.trim();
        if (!url.includes('.') || url.includes(' ')) {
            url = "https://www.google.com/search?q=" + encodeURIComponent(url);
        } else {
            if (!url.startsWith('http')) url = 'https://' + url;
        }
        frame.src = swConfig.prefix + encodeUV(url);
    }
});

function panic() { window.location.href = "https://classroom.google.com"; }
