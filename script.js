const startDate = new Date("2025-11-12 15:30:00"); 
const DOGRU_SIFRE = "27012004";
const API_KEY = "61f5c664edc0463abc591104252911";

const iltifatlar = ["Seni Seviyorum ❤️", "Gülüşüne hayranım ✨", "Kalbimin tek sahibi 💘", "İyi ki varsın sevgilim 💖"];

const heartInterval = setInterval(() => {
    const h = document.createElement("div");
    h.className = "floating-heart";
    h.innerText = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (Math.random() * 20 + 20) + "px";
    document.getElementById('floatingHearts').appendChild(h);
    setTimeout(() => h.remove(), 6000);
}, 400);

function check() {
    const pass = document.getElementById('password').value;
    if(pass === DOGRU_SIFRE) {
        clearInterval(heartInterval);
        document.getElementById('floatingHearts').innerHTML = "";
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
        document.getElementById('music').play().catch(e => console.log("Müzik için etkileşim bekliyor."));
        initApp();
    } else {
        document.getElementById('wrong').innerText = 'Yanlış şifre sevgilim!';
    }
}

function initApp() {
    setInterval(updateCounter, 1000);
    const hour = new Date().getHours();
    document.getElementById('arkaPlanKatmani').className = (hour >= 19 || hour < 6) ? "tema-gece" : "tema-gunduz";
    updateWeather();
    let i = 0;
    setInterval(() => {
        document.getElementById('askBulutu').innerText = iltifatlar[i % iltifatlar.length];
        i++;
    }, 4000);
    buildStory();
    window.addEventListener('scroll', checkFinalSurprise);
}

function updateCounter() {
    const diff = new Date() - startDate;
    const gun = Math.floor(diff / 86400000);
    const saat = Math.floor((diff % 86400000) / 3600000);
    const dak = Math.floor((diff % 3600000) / 60000);
    const san = Math.floor((diff % 60000) / 1000);
    document.getElementById('counter').innerHTML = `${gun} Gün, ${saat} Saat, ${dak} Dakika, ${san} Saniye... ❤️`;
}

async function updateWeather() {
    try {
        const r = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Kastamonu&lang=tr`);
        const d = await r.json();
        const durum = d.current.condition.text.toLowerCase();
        let anektot = "Hava kapalı olsa da bizim kalbimiz hep aydınlık.";
        if (durum.includes("yağmur")) anektot = "☔ Kastamonu yağmurlu... Şemsiyeni ve o güzel gülüşünü yanına almayı unutma.";
        else if (durum.includes("kar")) anektot = "❄️ Kar yağıyor! Senin sıcaklığın bana yetse de sakın üşüme.";
        else if (durum.includes("güneş") || durum.includes("açık")) anektot = "☀️ Hava pırıl pırıl, ama benim asıl güneşim sensin.";
        document.getElementById('havaDurumuMesaji').innerText = `Kastamonu ${d.current.temp_c}°C | ${anektot}`;
    } catch (e) { document.getElementById('havaDurumuMesaji').innerText = "Kalbimiz hep 25 derece sevgilim! ❤️"; }
}

function buildStory() {
    const container = document.getElementById('anaAkis');
    const story = [
        { t: 'img', s: 'KHNP9943.JPG' },
        { t: 'txt', c: 'Seninle beraber olmak dünyanın en büyük zenginliği.' },
        { t: 'img', s: 'URQC8638.JPG' },
        { t: 'txt', c: 'Hayatta insanın iyi ki diyeceği en güzel detaysın sevgilim.' },
        { t: 'img', s: 'GXDX6003.JPG' },
        { t: 'txt', c: 'En güzel zamanım, hayatımın seninle olan saniyeleri.' },
        { t: 'img', s: 'QTYJ9434.JPG' },
        { t: 'txt', c: 'Evrende bir ses sonsuza kadar gider teorisini bildiğimden beri her saniye kalbimde seni sevdiğimi söylüyorum ki sosnuza kadar gitsin bu diye.❤️' },
        { t: 'img', s: 'RYIT9255.JPG' },
        { t: 'head', c: 'En güzel çiçek ve çiçekleri' },
        { t: 'img', s: 'URCA7427.JPG' },
        { t: 'img', s: 'OUTP4409.JPG' },
        { t: 'img', s: 'ATJO2520.JPG' },
        { t: 'txt', c: 'Seninle yaptığım, gezdiğim, yediğim, içtiğim her şey benim için dünyanın en değerli ve en güzel şeyleri.' },
        { t: 'img', s: 'ORBD1779.JPG' },
        { t: 'img', s: 'FLOQ7231.JPG' },
        { t: 'img', s: 'IMG-20251128-WA0034.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0035.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0036.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0037.jpg' },
        { t: 'img', s: 'UGTL1004.JPG' },
        { t: 'img', s: 'LVVL1378.JPG' },
        { t: 'img', s: 'IMG_6415.HEIC' }
    ];
    story.forEach(item => {
        let el;
        if (item.t === 'img') { el = document.createElement('img'); el.src = `images/${item.s}`; el.className = 'hikaye-resmi'; }
        else if (item.t === 'txt') { el = document.createElement('div'); el.className = 'hikaye-metni'; el.innerText = item.c; }
        else if (item.t === 'head') { el = document.createElement('h2'); el.className = 'hikaye-metni'; el.style.textAlign = 'center'; el.innerText = item.c; }
        container.appendChild(el);
    });
}

let surpriseActive = false;
function checkFinalSurprise() {
    const bitis = document.getElementById('bitisNoktasi');
    if (!surpriseActive && bitis.getBoundingClientRect().top < window.innerHeight) {
        surpriseActive = true;
        const c = document.getElementById('celebrationContainer');
        const items = ['🎈', '🎉', '🎊', '❤️', '💖', '✨', '🌸', '🌹', '🦋', '🍭'];
        let end = Date.now() + 5000;
        let timer = setInterval(() => {
            if (Date.now() > end) { clearInterval(timer); return; }
            const div = document.createElement('div');
            div.className = 'confetti';
            div.innerText = items[Math.floor(Math.random() * items.length)];
            div.style.left = Math.random() * 100 + "vw";
            div.style.fontSize = (Math.random() * 30 + 20) + "px";
            div.style.animationDuration = (Math.random() * 2 + 1) + "s";
            c.appendChild(div);
            setTimeout(() => div.remove(), 5000);
        }, 40); // 40ms hızında patlama (Baya cafcaflı)
    }
}