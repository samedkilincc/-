// =======================================================
// SABİT DEĞİŞKENLER VE AYARLAR
// =======================================================

// BURAYA KENDİ ALDIĞINIZ API ANAHTARINIZ GİRİLDİ
const OPENWEATHER_API_KEY = "4bba39abc1a54bc8504cae5957a8b2c4"; 
const SEHIR_ADI = "Kastamonu"; 

let startDate = new Date("2025-11-12"); 
const DOGRU_SIFRE = "12112025";
const YAZI_HIZI = 40; 
const MUZIK_DOSYA_ADI = "Neyleyim.mp3"; 

// Düzeltilmiş Resim Yolları
let photos = [
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.49_e611421e.jpg",
    "images/WhatsApp Görsel 2025-11-12 saat 21.16.41_d90d8e5e.jpg",
    "images/WhatsApp Görsel 2025-11-24 saat 00.06.21_82137cff.jpg",
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.55_45c99fa5.jpg"
];

// SADECE 'Seni Seviyorum' temalı mesajlar
const askMesajlari = [
    "Seni Seviyorum ❤️",
    "Çok Seviyorum! ✨",
    "Sana Aşkım Sonsuz ♾️",
    "Seni her şeyden çok seviyorum.",
    "Dünyamın en güzelisin! 💖",
    "I Love You! 🥰",
    "Seninle Tamamlandım.",
    "Kalbimin Sahibi! 💘"
];

// ELLE BÖLÜNMÜŞ MESAJ PARÇALARI
let bolunmusMesajlar = [
    "Evet yine senin için yaptığım, emek harcadığım, belki beğenip çok mutlu olacağın, belki de bu düşüncemi özgün bulmayıp beğenmeden sıkılıp bu ne böyle diyeceğin bir şeyle karşındayım.",

    "Belki bu fikir özgün değil kabul ediyorum ama şunu bilmeni istiyorum ki yazacağım bu yazıyı tamamen benliğimle yazıyorum. Evet bir şair değilim yazar değilim ki burada edebi güzellemeler yapıp hoşuna gidecek cümleleri yazayım.",

    "Ama ben Samed’im. Sana karşı içimde taşıdığım duyguları ifade edebilirim. Hayatıma girdiğinden beri o kadar enerji dolu, o kadar huzur dolu zamanlarım oldu ki halen de öyle. İnsan gerçekten sevmeli gerçekten de sevilmeliymiş. İlk defa yaşadığım bir durum bu. Bunun için sana minnettarım. Hayatında ilkleri yaşayınca insanı ayrı bir heyecan kaplıyor.",

    "Bu heyecanım hep ilk günkü gibi ve hep de öyle kalacak. Aynı sana olan sevgim gibi. Seni her şeyden çok seviyorum. Her zaman, her anında yanında olmak istiyorum. Birlikte aşarız insanı olalım. İyi ki varsın, iyi ki benim sevgilimsin.❤️"
];


let akisIndex = 0;
const kapsayici = document.getElementById('ozelIcerikKapsayici');


// =======================================================
// YENİ ÖZELLİK: HAVA DURUMUNA GÖRE TEMA FONKSİYONLARI
// =======================================================

function temayiGuncelle(havaDurumuKodu) {
    const body = document.body;
    body.classList.remove('hava-güneşli', 'hava-bulutlu', 'hava-yağmurlu', 'hava-karlı'); 
    
    // Açık hava durumuna göre basitçe tema atama
    if (havaDurumuKodu >= 200 && havaDurumuKodu <= 599) {
        body.classList.add('hava-yağmurlu');
    } else if (havaDurumuKodu >= 600 && havaDurumuKodu <= 699) {
        body.classList.add('hava-karlı');
    } else if (havaDurumuKodu >= 700 && havaDurumuKodu <= 800) {
        body.classList.add('hava-güneşli');
    } else if (havaDurumuKodu > 800) {
        body.classList.add('hava-bulutlu');
    }
    
    // Saatin yanına hava durumu bilgisini ekleyelim (Opsiyonel)
    const gosterge = document.getElementById('saatGostergeci');
    if (gosterge) {
        gosterge.innerText += ` | ${SEHIR_ADI}`;
    }
}


function havaDurumuCek() {
    if (!OPENWEATHER_API_KEY) {
        console.error("Lütfen OpenWeatherMap API anahtarınızı girin!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${SEHIR_ADI}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=tr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.weather && data.weather.length > 0) {
                const havaDurumuKodu = data.weather[0].id;
                temayiGuncelle(havaDurumuKodu);
            }
        })
        .catch(error => {
            console.error("Hava durumu verisi çekilemedi:", error);
        });
}


// =======================================================
// GİRİŞ KONTROLÜ VE EĞLENCE FONKSİYONLARI (Kısaltıldı)
// =======================================================

function enterTusuDinleyicisi() {
    // ... (Aynı kalır)
}

function guncelSaatiGoster() {
    // ... (Aynı kalır)
}

function saatiBaslat() {
    guncelSaatiGoster(); 
    setInterval(guncelSaatiGoster, 1000); 
}

function rastgeleMesajGoster() {
    // ... (Aynı kalır)
}

function gosterIcerikAkisli() {
    // ... (Aynı kalır)
}

function yazdirHarfHarf(element, metin, callback) {
    // ... (Aynı kalır)
}

function startHeartRain() {
    // ... (Aynı kalır)
}

function updateDetailedCounter() {
    // ... (Aynı kalır)
}

function check() {
    let pass = document.getElementById("password").value;

    if(pass === DOGRU_SIFRE) {
        document.getElementById("login").style.display = "none";
        document.getElementById("content").classList.remove("hidden");

        // Tüm Özellikleri Başlat
        document.getElementById("music").play();
        updateDetailedCounter();
        setInterval(updateDetailedCounter, 1000); 
        startHeartRain();
        rastgeleMesajGoster();
        gosterIcerikAkisli();
        
    } else {
        document.getElementById("wrong").innerText = "Yanlış şifre!";
    }
}

// =======================================================
// SAYFA BAŞLANGICINDA ÇALIŞACAK KODLAR
// =======================================================

saatiBaslat();
enterTusuDinleyicisi(); 
havaDurumuCek(); // YENİ: Hava durumunu çek ve temayı ayarla!