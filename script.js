// =======================================================
// SABİT DEĞİŞKENLER VE AYARLAR
// =======================================================

// İLİŞKİ BAŞLANGIÇ GÜN VE SAATİ: 12 Kasım 2025, 15:30
let startDate = new Date("2025-11-12 15:30:00"); 

const DOGRU_SIFRE = "12112025";
const YAZI_HIZI = 40; 

// WEATHERAPI AYARLARI: Anahtar, Netlify Ortam Değişkeninden çekilir
const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY; 
const SEHIR_ADI = "Kastamonu"; 

// Resim Yolları
let photos = [
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.49_e611421e.jpg",
    "images/WhatsApp Görsel 2025-11-12 saat 21.16.41_d90d8e5e.jpg",
    "images/WhatsApp Görsel 2025-11-24 saat 00.06.21_82137cff.jpg",
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.55_45c99fa5.jpg"
];

const askMesajlari = [
    "Seni Seviyorum ❤️", "Çok Seviyorum! ✨", "Sana Aşkım Sonsuz ♾️", 
    "Seni her şeyden çok seviyorum.", "Dünyamın en güzelisin! 💖", "I Love You! 🥰", 
    "Seninle Tamamlandım.", "Kalbimin Sahibi! 💘"
];

let bolunmusMesajlar = [
    "Evet yine senin için yaptığım, emek harcadığım, belki beğenip çok mutlu olacağın, belki de bu düşüncemi özgün bulmayıp beğenmeden sıkılıp bu ne böyle diyeceğin bir şeyle karşındayım.",
    "Belki bu fikir özgün değil kabul ediyorum ama şunu bilmeni istiyorum ki yazacağım bu yazıyı tamamen benliğimle yazıyorum. Evet bir şair değilim yazar değilim ki burada edebi güzellemeler yapıp hoşuna gidecek cümleleri yazayım.",
    "Ama ben Samed’im. Sana karşı içimde taşıdığım duyguları ifade edebilirim. Hayatıma girdiğinden beri o kadar enerji dolu, o kadar huzur dolu zamanlarım oldu ki halen de öyle. İnsan gerçekten sevmeli gerçekten de sevilmeliymiş. İlk defa yaşadığım bir durum bu. Bunun için sana minnettarım. Hayatında ilkleri yaşayınca insanı ayrı bir heyecan kaplıyor.",
    "Bu heyecanım hep ilk günkü gibi ve hep de öyle kalacak. Aynı sana olan sevgim gibi. Seni her şeyden çok seviyorum. Her zaman, her anında yanında olmak istiyorum. Birlikte aşarız insanı olalım. İyi ki varsın, iyi ki benim sevgilimsin.❤️"
];


let akisIndex = 0;
const kapsayici = document.getElementById('ozelIcerikKapsayici');


// =======================================================
// HAVA DURUMU MESAJI VE DİĞER FONKSİYONLAR
// =======================================================

function havaDurumuMesajiGoster() {
    // Anahtar, Netlify'dan çekilecek
    if (!WEATHERAPI_KEY) { 
        console.error("API Anahtarı bulunamadı. Lütfen Netlify'da ayarlayın.");
        return; 
    }
    
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${SEHIR_ADI}&lang=tr`;
    const mesajKapsayici = document.getElementById('havaDurumuMesaji');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.current && data.current.condition) {
                const durum = data.current.condition.text.toLowerCase();
                let mesaj = "";

                // Hava durumu mesajı mantığı
                if (durum.includes("yağmur") || durum.includes("sağanak") || durum.includes("çise") || durum.includes("dolu")) {
                    mesaj = `☔ Bugün ${SEHIR_ADI}'da hava **yağmurlu**. Dışarı çıkarken yanına şemsiyeni ve içimi ısıtan gülümsemeni almayı unutma!`;
                } else if (durum.includes("kar") || durum.includes("sulu kar")) {
                    mesaj = `❄️ ${SEHIR_ADI}'ya **kar** yağıyor! Birlikteliğimizin en sıcak günü. Kombinini ona göre yap, soğuk almasın.`;
                } else if (durum.includes("sis") || durum.includes("duman") || durum.includes("pus")) {
                    mesaj = `🌫️ ${SEHIR_ADI}'da hava **sisli**. Unutma, nerede olursan ol, kalbimdeki yolun her zaman açık!`;
                } else if (durum.includes("güneşli") || durum.includes("açık") || durum.includes("güneş")) {
                    mesaj = `☀️ Bugün ${SEHIR_ADI}'da hava pırıl pırıl **güneşli**. Tıpkı aşkımızın geleceği gibi!`;
                } else if (durum.includes("bulutlu") || durum.includes("kapalı")) {
                    mesaj = `☁️ ${SEHIR_ADI}'da hava biraz **bulutlu** ama unutma, sen benim güneşimsin!`;
                } else {
                     mesaj = `🌍 Bugün ${SEHIR_ADI}'daki hava durumu: **${durum}**. Günümüz hep özel!`;
                }

                mesajKapsayici.innerHTML = `<p style="font-weight: bold; margin-bottom: 10px; color: #ff3c9d;"> Hava Durumu Bilgisi:</p>${mesaj}`;
                mesajKapsayici.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Hava durumu mesajı çekilemedi:", error);
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

function enterTusuDinleyicisi() {
    const sifreInput = document.getElementById('password');
    sifreInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            check(); 
        }
    });
}

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
        
        // ÖNEMLİ: Hava Durumu Mesajı Gösteriliyor
        havaDurumuMesajiGoster(); 
        
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