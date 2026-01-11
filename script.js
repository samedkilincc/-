const startDate = new Date("2025-11-12 15:30:00"); 
const DOGRU_SIFRE = "27012004";
const API_KEY = "61f5c664edc0463abc591104252911";

const iltifatlar = ["Seni Seviyorum ❤️", "Gülüşüne hayranım ✨", "İyi ki hayatımdasın 💘", "Kalbimin tek sahibi 💖, "En değerlim😘"];

// Giriş sayfasında yükselen kalpler
function createFloatingHeart() {
    const h = document.createElement("div");
    h.className = "floating-heart";
    h.innerText = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (Math.random() * 20 + 20) + "px";
    document.getElementById('floatingHearts').appendChild(h);
    setTimeout(() => h.remove(), 6000);
}
let heartInterval = setInterval(createFloatingHeart, 400);

function check() {
    let pass = document.getElementById('password').value;
    if(pass === DOGRU_SIFRE) {
        clearInterval(heartInterval); // Girişten sonra yükselen kalpleri durdur
        document.getElementById('floatingHearts').innerHTML = "";
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
        document.getElementById('music').play();
        init();
    } else {
        document.getElementById('wrong').innerText = 'Yanlış şifre sevgilim!';
    }
}

function init() {
    setInterval(updateCounter, 1000);
    applyDayNightTheme(); // Tema kontrolü
    updateWeather();
    
    let i = 0;
    setInterval(() => {
        document.getElementById('askBulutu').innerText = iltifatlar[i % iltifatlar.length];
        i++;
    }, 4000);

    buildStory();
    window.addEventListener('scroll', checkSurprise);
}

function updateCounter() {
    const diff = new Date() - startDate;
    const gun = Math.floor(diff / (1000 * 60 * 60 * 24));
    const saat = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const dak = Math.floor((diff / (1000 * 60)) % 60);
    const san = Math.floor((diff / 1000) % 60);
    document.getElementById('counter').innerHTML = 
        `Birlikteliğimizin <br> ${gun} Gün, ${saat} Saat, ${dak} Dakika, ${san} Saniye... ❤️`;
}

function applyDayNightTheme() {
    const bg = document.getElementById('arkaPlanKatmani');
    const hour = new Date().getHours();
    if(hour >= 19 || hour < 6) bg.className = "tema-gece";
    else bg.className = "tema-gunduz";
}

async function updateWeather() {
    try {
        const r = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Kastamonu&lang=tr`);
        const d = await r.json();
        const durum = d.current.condition.text.toLowerCase();
        let anektot = "Hava biraz kapalı ama bizim kalbimiz hep aydınlık sevgilim.";

        if (durum.includes("yağmur")) anektot = "☔ Kastamonu yağmurlu sevgilim... Şemsiyeni ve içimi ısıtan o güzel gülüşünü yanına almayı unutma.";
        else if (durum.includes("kar")) anektot = "❄️ Dışarıda kar var! Senin sıcaklığın bana yetse de sakın üşüme, sıkı giyin.";
        else if (durum.includes("güneş") || durum.includes("açık")) anektot = "☀️ Hava pırıl pırıl, ama benim asıl güneşim sensin.";

        document.getElementById('havaDurumuMesaji').innerText = `Kastamonu ${d.current.temp_c}°C | ${anektot}`;
    } catch (e) { document.getElementById('havaDurumuMesaji').innerText = "Hava durumuna bakamadım ama kalbim hep seninle!"; }
}

function buildStory() {
    const container = document.getElementById('anaAkis');
    const story = [
        { t: 'img', s: 'KHNP9943.JPG' },
        { t: 'txt', c: 'Evet yine senin için yaptığım, emek harcadığım, belki beğenip çok mutlu olacağın, belki de bu düşüncemi özgün bulmayıp beğenmeden sıkılıp bu ne böyle diyeceğin bir şeyle karşındayım.' },
        { t: 'img', s: 'URQC8638.JPG' },
        { t: 'txt', c: 'Belki bu fikir özgün değil kabul ediyorum ama şunu bilmeni istiyorum ki yazacağım bu yazıyı tamamen benliğimle yazıyorum. Evet bir şair değilim yazar değilim ki burada edebi güzellemeler yapıp hoşuna gidecek cümleleri yazayım.' },
        { t: 'img', s: 'GXDX6003.JPG' },
        { t: 'txt', c: 'Ama ben Samed’im. Sana karşı içimde taşıdığım duyguları ifade edebilirim. Hayatıma girdiğinden beri o kadar enerji dolu, o kadar huzur dolu zamanlarım oldu ki halen de öyle. İnsan gerçekten sevmeli gerçekten de sevilmeliymiş.' },
        { t: 'img', s: 'QTYJ9434.JPG' },
        { t: 'txt', c: 'İlk defa yaşadığım bir durum bu. Bunun için sana minnettarım. Hayatında ilkleri yaşayınca insanı ayrı bir heyecan kaplıyor. Bu heyecanım hep ilk günkü gibi ve hep de öyle kalacak. Aynı sana olan sevgim gibi. Seni her şeyden çok seviyorum.' },
        { t: 'img', s: 'RYIT9255.JPG' },
        { t: 'img', s: 'UGTL1004.JPG' },
        { t: 'head', c: 'Çiçeğim ve çiçekleri' },
        { t: 'img', s: 'URCA7427.JPG' },
        { t: 'img', s: 'OUTP4409.JPG' },
        { t: 'img', s: 'ATJO2520.JPG' },
        { t: 'head', c: 'Seninle Her Şey Değerli' },
        { t: 'img', s: 'ORBD1779.JPG' },
        { t: 'img', s: 'FLOQ7231.JPG' },
        { t: 'img', s: 'IMG-20251128-WA0034.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0035.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0036.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0037.jpg' },
        { t: 'img', s: 'LVVL1378.JPG' },
        { t: 'img', s: 'IMG_6415.HEIC' }
    ];

    story.forEach(item => {
        let el;
        if (item.t === 'img') {
            el = document.createElement('img');
            el.src = `images/${item.s}`;
            el.className = 'hikaye-resmi';
        } else if (item.t === 'txt') {
            el = document.createElement('div');
            el.className = 'hikaye-metni';
            el.innerText = item.c;
        } else if (item.t === 'head') {
            el = document.createElement('h2');
            el.className = 'hikaye-metni';
            el.style.textAlign = 'center';
            el.innerText = item.c;
        }
        container.appendChild(el);
    });
}

let surpriseTriggered = false;
function checkSurprise() {
    const trigger = document.getElementById('bitisNoktasi');
    if (!surpriseTriggered && trigger.getBoundingClientRect().top < window.innerHeight) {
        surpriseTriggered = true;
        launchCelebration();
    }
}

function launchCelebration() {
    const c = document.getElementById('celebrationContainer');
    const icons = ['🎈', '🎉', '🎊', '❤️', '💖', '✨', '🦋', '💐'];
    let end = Date.now() + 6000;
    let timer = setInterval(() => {
        if (Date.now() > end) { clearInterval(timer); return; }
        const div = document.createElement('div');
        div.className = 'obj-celebrate';
        div.innerText = icons[Math.floor(Math.random() * icons.length)];
        div.style.left = Math.random() * 100 + "vw";
        div.style.animationDuration = (Math.random() * 2 + 2) + "s";
        c.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }, 60);
}