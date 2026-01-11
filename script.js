// AYARLAR
const startDate = new Date("2025-11-12 15:30:00"); 
const DOGRU_SIFRE = "27012025";
const API_KEY = "61f5c664edc0463abc591104252911";

const kisaNotlar = [
    "Seni Seviyorum ❤️", 
    "İyi ki hayatımdasın ✨", 
    "Kalbimin tek sahibi 💘", 
    "Dünyamın en güzeli 💖"
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

async function baslat() {
    // 1. Sayaç ve Saat
    setInterval(updateCounter, 1000);
    
    // 2. Hava Durumu ve Arka Plan
    updateWeatherAndBG();

    // 3. Dönen Notlar
    let notIndex = 0;
    const notEl = document.getElementById('askBulutu');
    setInterval(() => {
        notEl.innerText = kisaNotlar[notIndex % kisaNotlar.length];
        notIndex++;
    }, 3000);

    // 4. İçerik Akışını İnşa Et
    siraliIcerikOlustur();

    // 5. Kalp Yağmuru
    setInterval(createFallingHeart, 500);

    // 6. Kaydırma Takibi (Sürpriz İçin)
    window.addEventListener('scroll', checkScrollEnd);
}

function updateCounter() {
    let diff = new Date() - startDate;
    let gun = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('counter').innerHTML = `Birlikteliğimizin ${gun}. Günü ❤️`;
}

async function updateWeatherAndBG() {
    try {
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Kastamonu&lang=tr`);
        const data = await res.json();
        const durum = data.current.condition.text;
        const code = data.current.condition.code; // Hava durumu kodu
        
        document.getElementById('havaDurumuMesaji').innerText = `Kastamonu: ${durum} | ${data.current.temp_c}°C`;

        const bg = document.getElementById('arkaPlanKatmani');
        // Hava durumuna göre arka plan geçişleri
        if (code === 1000) { // Güneşli
            bg.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
        } else if (durum.includes("yağmur") || durum.includes("sağanak")) {
            bg.style.background = "linear-gradient(135deg, #606c88, #3f4c6b)";
        } else if (durum.includes("bulut") || durum.includes("kapalı")) {
            bg.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
        } else {
            bg.style.background = "linear-gradient(135deg, #ff9ec7, #ffd0e7)";
        }
    } catch (e) { console.log("Hava durumu yüklenemedi."); }
}

function siraliIcerikOlustur() {
    const akisContainer = document.getElementById('hikayeAkisi');
    const akisVerisi = [
        { type: 'img', src: 'KHNP9943.JPG' },
        { type: 'text', content: 'Hayatıma girdiğin o günden beri her şey o kadar anlamlı ki...' },
        { type: 'img', src: 'URQC8638.JPG' },
        { type: 'text', content: 'Gözlerine her baktığımda, doğru yerde olduğumu bir kez daha anlıyorum.' },
        { type: 'img', src: 'GXDX6003.JPG' },
        { type: 'text', content: 'Seninle geçen her saniye, ömrümün en değerli hazinesi.' },
        { type: 'img', src: 'QTYJ9434.JPG' },
        { type: 'text', content: 'Mesafeler olsa da kalbim hep seninle atıyor.' },
        { type: 'img', src: 'RYIT9255.JPG' },
        { type: 'img', src: 'UGTL1004.JPG' },
        { type: 'title', content: 'Çiçeğim ve çiçekleri' },
        { type: 'img', src: 'URCA7427.JPG' },
        { type: 'img', src: 'OUTP4409.JPG' },
        { type: 'img', src: 'ATJO2520.JPG' },
        { type: 'text', content: 'Seninle yaptığım, gezdiğim, yediğim, içtiğim her şey benim için dünyanın en değerli ve en güzel şeyleri.' },
        { type: 'img', src: 'ORBD1779.JPG' },
        { type: 'img', src: 'FLOQ7231.JPG' },
        { type: 'img', src: 'IMG-20251128-WA0034.jpg' },
        { type: 'img', src: 'IMG-20251128-WA0035.jpg' },
        { type: 'img', src: 'IMG-20251128-WA0036.jpg' },
        { type: 'img', src: 'IMG-20251128-WA0037.jpg' },
        { type: 'img', src: 'UGTL1004.JPG' },
        { type: 'img', src: 'LVVL1378.JPG' },
        { type: 'img', src: 'IMG_6415.HEIC' }
    ];

    akisVerisi.forEach(item => {
        let el;
        if (item.type === 'img') {
            el = document.createElement('img');
            el.src = `images/${item.src}`;
            el.className = 'hikaye-resmi';
        } else if (item.type === 'text') {
            el = document.createElement('div');
            el.className = 'hikaye-metni';
            el.innerText = item.content;
        } else if (item.type === 'title') {
            el = document.createElement('h2');
            el.className = 'hikaye-metni';
            el.style.textAlign = 'center';
            el.style.fontSize = '28px';
            el.style.fontWeight = 'bold';
            el.innerText = item.content;
        }
        akisContainer.appendChild(el);
    });
}

// SÜRPRİZ: KONFETİ VE BALON ŞÖLENİ
let surpriseDone = false;
function checkScrollEnd() {
    const trigger = document.getElementById('sayfaSonuTetikleyici');
    const triggerPos = trigger.getBoundingClientRect().top;
    
    if (!surpriseDone && triggerPos < window.innerHeight) {
        surpriseDone = true;
        launchCelebration();
    }
}

function launchCelebration() {
    const container = document.getElementById('celebrationContainer');
    const icons = ['🎈', '🎉', '🎊', '❤️', '💖', '🌸', '✨', '🎈'];
    
    let end = Date.now() + 5000; // 5 saniye sürer

    let interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        const obj = document.createElement('div');
        obj.className = 'obj-celebrate';
        obj.innerText = icons[Math.floor(Math.random() * icons.length)];
        obj.style.left = Math.random() * 100 + "vw";
        // Rastgele hız ve boyut
        obj.style.animationDuration = (Math.random() * 2 + 3) + "s";
        container.appendChild(obj);

        // Temizlik
        setTimeout(() => obj.remove(), 5000);
    }, 100);
}

function createFallingHeart() {
    const h = document.createElement("div");
    h.className = "falling-heart";
    h.innerText = "💗";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (Math.random() * 20 + 10) + "px";
    h.style.opacity = Math.random();
    document.getElementById('hearts').appendChild(h);
    setTimeout(() => h.remove(), 5000);
}