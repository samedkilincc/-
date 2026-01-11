const startDate = new Date("2025-11-12 15:30:00"); 
const DOGRU_SIFRE = "27012004";
const API_KEY = "61f5c664edc0463abc591104252911";

const notlar = ["Seni Seviyorum ❤️", "İyi ki hayatımdasın ✨", "Kalbimin sahibi 💘", "Her şeyim sensin 💖"];

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
    setInterval(sayaciGuncelle, 1000);
    havaVeArkaPlanGuncelle();
    
    let nIdx = 0;
    setInterval(() => {
        document.getElementById('askBulutu').innerText = notlar[nIdx % notlar.length];
        nIdx++;
    }, 3000);

    icerikOlustur();
    setInterval(kalpYagdir, 600);
    window.addEventListener('scroll', surprizKontrol);
}

function sayaciGuncelle() {
    const diff = new Date() - startDate;
    const gun = Math.floor(diff / (1000 * 60 * 60 * 24));
    const saat = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const dak = Math.floor((diff / (1000 * 60)) % 60);
    const san = Math.floor((diff / 1000) % 60);
    document.getElementById('counter').innerHTML = 
        `Birlikteliğimizin <br> ${gun} gün, ${saat} saat, ${dak} dakika, ${san} saniyesi... ❤️`;
}

async function havaVeArkaPlanGuncelle() {
    try {
        const r = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Kastamonu&lang=tr`);
        const d = await r.json();
        const durum = d.current.condition.text.toLowerCase();
        const sicaklik = d.current.temp_c;
        let anektot = "";

        if (durum.includes("yağmur")) anektot = "☔ Hava yağmurlu... Şemsiyeni ve içimi yumuşatan o güzel gülüşünü almayı unutma sevgilim.";
        else if (durum.includes("kar")) anektot = "❄️ Dışarıda kar var! Sıkı giyin, senin sıcaklığın bana yetse de sakın üşüme.";
        else if (durum.includes("güneş")) anektot = "☀️ Hava güneşli ama benim gerçek güneşim sensin, bunu sakın unutma.";
        else anektot = "☁️ Hava biraz kapalı, olsun... Bizim içimiz hep huzur dolu.";

        document.getElementById('havaDurumuMesaji').innerText = `Kastamonu ${sicaklik}°C | ${anektot}`;

        const bg = document.getElementById('arkaPlanKatmani');
        if (durum.includes("güneş")) bg.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
        else if (durum.includes("yağmur")) bg.style.background = "linear-gradient(135deg, #606c88, #3f4c6b)";
        else bg.style.background = "linear-gradient(135deg, #ff9ec7, #ffd0e7)";
    } catch (e) { document.getElementById('havaDurumuMesaji').innerText = "Hava durumuna bakamadım ama kalbim hep seninle!"; }
}

function icerikOlustur() {
    const ana = document.getElementById('anaAkis');
    const veriler = [
        { t: 'img', s: 'KHNP9943.JPG' },
        { t: 'txt', c: 'Evet yine senin için yaptığım, emek harcadığım, belki beğenip çok mutlu olacağın, belki de bu düşüncemi özgün bulmayıp beğenmeden sıkılıp bu ne böyle diyeceğin bir şeyle karşındayım.' },
        { t: 'img', s: 'URQC8638.JPG' },
        { t: 'txt', c: 'Belki bu fikir özgün değil kabul ediyorum ama şunu bilmeni istiyorum ki yazacağım bu yazıyı tamamen benliğimle yazıyorum. Evet bir şair değilim yazar değilim ki burada edebi güzellemeler yapıp hoşuna gidecek cümleleri yazayım.' },
        { t: 'img', s: 'GXDX6003.JPG' },
        { t: 'txt', c: 'Ama ben Samed’im. Sana karşı içimde taşıdığım duyguları ifade edebilirim. Hayatıma girdiğinden beri o kadar enerji dolu, o kadar huzur dolu zamanlarım oldu ki halen de öyle. İnsan gerçekten sevmeli gerçekten de sevilmeliymiş.' },
        { t: 'img', s: 'QTYJ9434.JPG' },
        { t: 'txt', c: 'İlk defa yaşadığım bir durum bu. Bunun için sana minnettarım. Hayatında ilkleri yaşayınca insanı ayrı bir heyecan kaplıyor. Bu heyecanım hep ilk günkü gibi ve hep de öyle kalacak. Aynı sana olan sevgim gibi. Seni her şeyden çok seviyorum. Her zaman, her anında yanında olmak istiyorum. Birlikte aşarız insanı olalım. İyi ki varsın, iyi ki benim sevgilimsin.❤️' },
        { t: 'img', s: 'RYIT9255.JPG' },
        { t: 'img', s: 'UGTL1004.JPG' },
        { t: 'head', c: 'Çiçeğim ve çiçekleri' },
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
            el.style.fontSize = '26px';
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
        showCelebration();
    }
}

function showCelebration() {
    const c = document.getElementById('kutlamaAlani');
    const icons = ['🎈', '🎉', '🎊', '❤️', '💖', '🌸', '✨', '🎈'];
    let end = Date.now() + 5000;
    let timer = setInterval(() => {
        if (Date.now() > end) { clearInterval(timer); return; }
        const div = document.createElement('div');
        div.className = 'celebrate-obj';
        div.innerText = icons[Math.floor(Math.random() * icons.length)];
        div.style.left = Math.random() * 100 + "vw";
        div.style.animationDuration = (Math.random() * 2 + 3) + "s";
        c.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }, 100);
}

function kalpYagdir() {
    const h = document.createElement("div");
    h.className = "falling-heart"; h.innerText = "💗";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (Math.random() * 20 + 10) + "px";
    document.getElementById('hearts').appendChild(h);
    setTimeout(() => h.remove(), 5000);
}