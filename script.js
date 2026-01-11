const startDate = new Date("2025-11-12 15:30:00"); 
const DOGRU_SIFRE = "27012004";
const API_KEY = "61f5c664edc0463abc591104252911";

const iltifatlar = [
    "Dünyanın en güzel gülüşüne sahipsin sevgilim ✨",
    "Seninle geçen her saniye bir ömre bedel ❤️",
    "Gözlerin benim en huzurlu limanım ⚓",
    "İyi ki varsın, iyi ki benimlesin Hatice'm 💖",
    "Kalbimin her atışı senin ismini fısıldıyor 💘"
];

function check() {
    let pass = document.getElementById('password').value;
    if(pass === DOGRU_SIFRE) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
        document.getElementById('music').play();
        baslat();
    } else {
        document.getElementById('wrong').innerText = 'Yanlış şifre sevgilim!';
    }
}

function baslat() {
    setInterval(detayliSayacGuncelle, 1000);
    havaVeTemaGuncelle();
    
    let i = 0;
    setInterval(() => {
        document.getElementById('askBulutu').innerText = iltifatlar[i % iltifatlar.length];
        i++;
    }, 4000);

    akisOlustur();
    window.addEventListener('scroll', surprizKontrol);
}

function detayliSayacGuncelle() {
    const simdi = new Date();
    const fark = simdi - startDate;

    const yil = Math.floor(fark / (1000 * 60 * 60 * 24 * 365));
    const gun = Math.floor((fark / (1000 * 60 * 60 * 24)) % 365);
    const saat = Math.floor((fark / (1000 * 60 * 60)) % 24);
    const dak = Math.floor((fark / (1000 * 60)) % 60);
    const san = Math.floor((fark / 1000) % 60);

    document.getElementById('counter').innerHTML = 
        `Birlikteliğimizin <br> <span style="font-size:30px">${gun}</span> Gün, ${saat} Saat, ${dak} Dakika, ${san} Saniye... ❤️`;
}

async function havaVeTemaGuncelle() {
    const bg = document.getElementById('arkaPlanKatmani');
    const saat = new Date().getHours();
    
    // Önce Gece/Gündüz Kontrolü
    if(saat >= 20 || saat <= 6) bg.className = "tema-gece";
    else bg.className = "tema-gunduz";

    try {
        const r = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Kastamonu&lang=tr`);
        const d = await r.json();
        const durum = d.current.condition.text.toLowerCase();
        let anektot = "";

        if (durum.includes("yağmur")) {
            anektot = "☔ Kastamonu yağmurlu sevgilim... Şemsiyeni ve içimi ısıtan o güzel gülüşünü yanına almayı unutma.";
            bg.className = "tema-yagmurlu";
        } else if (durum.includes("kar")) {
            anektot = "❄️ Kar yağıyor! Senin sıcaklığın bana yetse de sakın üşüme, sıkı giyin.";
        } else if (durum.includes("güneş")) {
            anektot = "☀️ Hava pırıl pırıl güneşli, ama benim asıl güneşim sensin.";
        } else {
            anektot = "☁️ Hava biraz kapalı ama bizim kalbimiz hep aydınlık sevgilim.";
        }

        document.getElementById('havaDurumuMesaji').innerText = `Kastamonu ${d.current.temp_c}°C | ${anektot}`;
    } catch (e) { document.getElementById('havaDurumuMesaji').innerText = "Hava durumuna bakamadım ama kalbim hep seninle!"; }
}

function akisOlustur() {
    const ana = document.getElementById('anaAkis');
    const veriler = [
        { t: 'img', s: 'KHNP9943.JPG' },
        { t: 'txt', c: 'Evet yine senin için yaptığım, emek harcadığım, belki beğenip çok mutlu olacağın bir sürprizle karşındayım.' },
        { t: 'img', s: 'URQC8638.JPG' },
        { t: 'txt', c: 'Belki bu fikir özgün değil ama yazacağım her kelime tamamen benim içimden geliyor.' },
        { t: 'img', s: 'GXDX6003.JPG' },
        { t: 'txt', c: 'Sana karşı taşıdığım duygular o kadar enerji ve huzur dolu ki, bunu her saniye hissediyorum.' },
        { t: 'img', s: 'QTYJ9434.JPG' },
        { t: 'txt', c: 'Seninle yaşadığım her ilk, kalbimde ayrı bir heyecan yaratıyor Hatice’m. Seni çok seviyorum.' },
        { t: 'img', s: 'RYIT9255.JPG' },
        { t: 'img', s: 'UGTL1004.JPG' },
        { t: 'head', c: 'Çiçeğim ve çiçekleri' },
        { t: 'img', s: 'URCA7427.JPG' },
        { t: 'img', s: 'OUTP4409.JPG' },
        { t: 'img', s: 'ATJO2520.JPG' },
        { t: 'txt', c: 'Seninle yediğim, içtiğim, gezdiğim her şey dünyanın en değerli şeyi benim için.' },
        { t: 'img', s: 'ORBD1779.JPG' },
        { t: 'img', s: 'FLOQ7231.JPG' },
        { t: 'img', s: 'IMG-20251128-WA0034.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0035.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0036.jpg' },
        { t: 'img', s: 'IMG-20251128-WA0037.jpg' },
        { t: 'img', s: 'LVVL1378.JPG' },
        { t: 'img', s: 'IMG_6415.HEIC' }
    ];

    veriler.forEach(item => {
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
        ana.appendChild(el);
    });
}

let done = false;
function surprizKontrol() {
    const bitis = document.getElementById('bitisNoktasi');
    if (!done && bitis.getBoundingClientRect().top < window.innerHeight) {
        done = true;
        coskuluKutlama();
    }
}

function coskuluKutlama() {
    const c = document.getElementById('kutlamaAlani');
    const icons = ['🎈', '🎉', '🎊', '❤️', '💖', '🌸', '✨', '🎈', '🍾', '💘', '🦋'];
    
    // 5 saniye boyunca her 50 milisaniyede bir nesne fırlat (Çok daha yoğun)
    let timer = setInterval(() => {
        const div = document.createElement('div');
        div.className = 'celebrate-obj';
        div.innerText = icons[Math.floor(Math.random() * icons.length)];
        div.style.left = Math.random() * 100 + "vw";
        div.style.fontSize = (Math.random() * 40 + 20) + "px";
        div.style.animationDuration = (Math.random() * 2 + 2) + "s";
        c.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }, 50);

    setTimeout(() => clearInterval(timer), 6000);
}