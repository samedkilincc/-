// =======================================================
// SABİT DEĞİŞKENLER VE AYARLAR
// =======================================================

// LÜTFEN BAŞLANGIÇ TARİHİNİ KONTROL EDİN
let startDate = new Date("2025-11-12"); 

// API Anahtarınız ve Şehir Adı
const OPENWEATHER_API_KEY = "4bba39abc1a54bc8504cae5957a8b2c4"; 
const SEHIR_ADI = "Kastamonu"; 

const DOGRU_SIFRE = "27012004";
const YAZI_HIZI = 40; 

// Resim Yolları (images/ klasöründeki dosya adlarıyla eşleşmeli)
let photos = [
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.49_e611421e.jpg",
    "images/WhatsApp Görsel 2025-11-12 saat 21.16.41_d90d8e5e.jpg",
    "images/WhatsApp Görsel 2025-11-24 saat 00.06.21_82137cff.jpg",
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.55_45c99fa5.jpg"
];

// SADECE 'Seni Seviyorum' temalı mesajlar
const askMesajlari = [
    "Seni Seviyorum ❤️", "Çok Seviyorum! ✨", "Sana Aşkım Sonsuz ♾️", 
    "Seni her şeyden çok seviyorum.", "Dünyamın en güzelisin! 💖", "I Love You! 🥰", 
    "Seninle Tamamlandım.", "Kalbimin Sahibi! 💘"
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
// HAVA DURUMU VE ZAMAN FONKSİYONLARI
// =======================================================

function temayiGuncelle(havaDurumuKodu) {
    const body = document.body;
    body.classList.remove('hava-güneşli', 'hava-bulutlu', 'hava-yağmurlu', 'hava-karlı'); 
    
    // Tema atama
    if (havaDurumuKodu >= 200 && havaDurumuKodu <= 599) {
        body.classList.add('hava-yağmurlu');
    } else if (havaDurumuKodu >= 600 && havaDurumuKodu <= 699) {
        body.classList.add('hava-karlı');
    } else if (havaDurumuKodu >= 700 && havaDurumuKodu <= 800) {
        body.classList.add('hava-güneşli');
    } else if (havaDurumuKodu > 800) {
        body.classList.add('hava-bulutlu');
    }
    
    // Saatin yanına şehir bilgisini ekler
    const gosterge = document.getElementById('saatGostergeci');
    if (gosterge) {
        // Eğer zaten tarih varsa, şehir adını ekle (temiz kod)
        gosterge.innerText += ` | ${SEHIR_ADI}`;
    }
}


function havaDurumuCek() {
    if (!OPENWEATHER_API_KEY) {
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
            console.error("Hava durumu verisi çekilemedi, varsayılan tema kullanılıyor:", error);
        });
}

function guncelSaatiGoster() {
    const tarih = new Date();
    const saat = tarih.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const gun = tarih.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const gosterge = document.getElementById('saatGostergeci');
    if (gosterge) {
        gosterge.innerText = `${gun} | ${saat}`;
    }
}

function saatiBaslat() {
    guncelSaatiGoster(); 
    setInterval(guncelSaatiGoster, 1000); 
}


function updateDetailedCounter() {
    const start = startDate.getTime();
    const now = new Date().getTime();
    let difference = now - start;

    const totalSeconds = Math.floor(difference / 1000);
    
    const saniye = totalSeconds % 60;
    const dakika = Math.floor(totalSeconds / 60) % 60;
    const saat = Math.floor(totalSeconds / 3600) % 24;
    
    const gun = Math.floor(totalSeconds / (3600 * 24));
    
    const yil = Math.floor(gun / 365.25); 
    const kalanGun = gun - Math.floor(yil * 365.25);
    const ay = Math.floor(kalanGun / 30.44); 
    const kalanGunFinal = Math.floor(kalanGun % 30.44);

    const pad = (n) => (n < 10) ? '0' + n : n;

    const output = `
        ${yil} Yıl, ${ay} Ay, ${kalanGunFinal} Gün, <br>
        ${pad(saat)} Saat, ${pad(dakika)} Dakika, ${pad(saniye)} Saniye
    `;

    document.getElementById("counter").innerHTML = `
        Bugün birlikteliğimizin tam: <b><br>${output}</b> 💞
    `;
}


// =======================================================
// HİKAYE AKIŞI VE DİĞER ÖZELLİKLER
// =======================================================

function rastgeleMesajGoster() {
    const mesajAlani = document.getElementById('askBulutu');
    const rastgeleIndex = Math.floor(Math.random() * askMesajlari.length);
    mesajAlani.innerText = askMesajlari[rastgeleIndex];
    mesajAlani.style.display = 'block';
    setInterval(() => {
        const yeniIndex = Math.floor(Math.random() * askMesajlari.length);
        mesajAlani.innerText = askMesajlari[yeniIndex];
    }, 10000); 
}

function gosterIcerikAkisli() {
    if (akisIndex < bolunmusMesajlar.length) {
        
        const metinKutusu = document.createElement('div');
        metinKutusu.classList.add('hikaye-metni');
        kapsayici.appendChild(metinKutusu);
        
        yazdirHarfHarf(metinKutusu, bolunmusMesajlar[akisIndex], function() {
            
            if (akisIndex < photos.length) { 
                const resimElementi = document.createElement('img');
                resimElementi.src = photos[akisIndex];
                resimElementi.classList.add('hikaye-resmi');
                kapsayici.appendChild(resimElementi);
            }
            
            akisIndex++;
            setTimeout(gosterIcerikAkisli, 1500); 
        });

    } 
}

function yazdirHarfHarf(element, metin, callback) {
    let harfIndex = 0;
    function yazdir() {
        if (harfIndex < metin.length) {
            element.innerHTML += metin.charAt(harfIndex);
            harfIndex++;
            setTimeout(yazdir, YAZI_HIZI);
        } else {
            if (callback) callback();
        }
    }
    yazdir();
}

function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerText = "💗";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        document.getElementById("hearts").appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 300);
}


// =======================================================
// ANA KONTROL FONKSİYONU (Şifre Giriş)
// =======================================================

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
havaDurumuCek();