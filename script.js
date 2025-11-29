// =======================================================
// SABİT DEĞİŞKENLER VE AYARLAR
// =======================================================

let startDate = new Date("2025-11-12 15:30:00"); 

const DOGRU_SIFRE = "12112025";
const YAZI_HIZI = 40; 
const WEATHERAPI_KEY = "61f5c664edc0463abc591104252911"; 
const SEHIR_ADI = "Kastamonu"; 

// HİKAYE AKIŞI FOTOĞRAFLARI (Ana 4 yazıya karşılık gelen)
let photos = [
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.49_e611421e.jpg",
    "images/WhatsApp Görsel 2025-11-12 saat 21.16.41_d90d8e5e.jpg",
    "images/WhatsApp Görsel 2025-11-24 saat 00.06.21_82137cff.jpg",
    "images/WhatsApp Görsel 2025-11-17 saat 23.30.55_45c99fa5.jpg"
];

// ELLE BÖLÜNMÜŞ METİN PARÇALARI (Ana 4 yazı)
let bolunmusMesajlar = [
    "Evet yine senin için yaptığım, emek harcadığım, belki beğenip çok mutlu olacağın, belki de bu düşüncemi özgün bulmayıp beğenmeden sıkılıp bu ne böyle diyeceğin bir şeyle karşındayım.",
    "Belki bu fikir özgün değil kabul ediyorum ama şunu bilmeni istiyorum ki yazacağım bu yazıyı tamamen benliğimle yazıyorum. Evet bir şair değilim yazar değilim ki burada edebi güzellemeler yapıp hoşuna gidecek cümleleri yazayım.",
    "Ama ben Samed’im. Sana karşı içimde taşıdığım duyguları ifade edebilirim. Hayatıma girdiğinden beri o kadar enerji dolu, o kadar huzur dolu zamanlarım oldu ki halen de öyle. İnsan gerçekten sevmeli gerçekten de sevilmeliymiş. İlk defa yaşadığım bir durum bu. Bunun için sana minnettarım. Hayatında ilkleri yaşayınca insanı ayrı bir heyecan kaplıyor.",
    "Bu heyecanım hep ilk günkü gibi ve hep de öyle kalacak. Aynı sana olan sevgim gibi. Seni her şeyden çok seviyorum. Her zaman, her anında yanında olmak istiyorum. Birlikte aşarız insanı olalım. İyi ki varsın, iyi ki benim sevgilimsin.❤️"
];

// YENİ SLAYT MATERYALLERİ (Gezdiğimiz Yerler)
const gezdigimizYerlerMateryalleri = [
    { type: 'image', src: "images/IMG-20251128-WA0034.jpg" },
    { type: 'image', src: "images/IMG-20251128-WA0035.jpg" },
    { type: 'image', src: "images/IMG-20251128-WA0036.jpg" },
    { type: 'image', src: "images/IMG-20251128-WA0037.jpg" },
    { type: 'video', src: "images/VID-20251128-WA0006.mp4" }
];

// DİĞER SABİT MESAJLAR
const askMesajlari = ["Seni Seviyorum ❤️", "Çok Seviyorum! ✨", "Sana Aşkım Sonsuz ♾️", "Seni her şeyden çok seviyorum.", "Dünyamın en güzelisin! 💖", "I Love You! 🥰", "Seninle Tamamlandım.", "Kalbimin Sahibi! 💘"];

let akisIndex = 0;
let currentSlaytIndex = 0; 
let slaytInterval;
const kapsayici = document.getElementById('ozelIcerikKapsayici');


// =======================================================
// AKIŞ YÖNETİMİ VE TEMEL FONKSİYONLAR
// =======================================================

function gosterAkisiSirala() {
    // 1. Ana Yazı-Resim Akışını Başlat
    gosterMetinVeResimAkisi(0); 
}

function gosterMetinVeResimAkisi(metinIndex) {
    if (metinIndex < bolunmusMesajlar.length) {
        
        const metinKutusu = document.createElement('div');
        metinKutusu.classList.add('hikaye-metni');
        kapsayici.appendChild(metinKutusu);
        
        yazdirHarfHarf(metinKutusu, bolunmusMesajlar[metinIndex], function() {
            // Metin bitince resmi göster
            if (metinIndex < photos.length) { 
                const resimElementi = document.createElement('img');
                resimElementi.src = photos[metinIndex];
                resimElementi.classList.add('hikaye-resmi');
                kapsayici.appendChild(resimElementi);
            }
            
            // Bir sonraki metin parçasını 1.5 saniye sonra başlat
            setTimeout(() => {
                gosterMetinVeResimAkisi(metinIndex + 1);
            }, 1500); 

        });
    } else {
        // 2. Ana Akış bitti, Sabit Başlık ve Fotoğraflara geç
        gosterSabitIcerikler();
    }
}

function gosterSabitIcerikler() {
    // Çilekhan Başlığı ve Fotoğrafı
    const cilekhanBaslik = document.createElement('h3');
    cilekhanBaslik.classList.add('hikaye-metni');
    cilekhanBaslik.innerHTML = '<b style="font-size: 26px;">İlk çocuğumuz Çilekhan</b>';
    cilekhanBaslik.style.textAlign = 'center';
    cilekhanBaslik.style.marginTop = '50px';
    cilekhanBaslik.style.marginBottom = '20px';
    kapsayici.appendChild(cilekhanBaslik);
    
    const cilekhanResim = document.createElement('img');
    cilekhanResim.src = "images/WhatsApp Görsel 2025-11-28 saat 21.54.46_089aff93.jpg";
    cilekhanResim.classList.add('hikaye-resmi');
    cilekhanResim.style.maxWidth = '400px';
    kapsayici.appendChild(cilekhanResim);

    // Kasımpatı Başlığı ve Fotoğrafı
    const kasimpatiBaslik = document.createElement('h3');
    kasimpatiBaslik.classList.add('hikaye-metni');
    kasimpatiBaslik.innerHTML = '<b style="font-size: 26px;">İlk kasımpatın ve çiçeğin</b>';
    kasimpatiBaslik.style.textAlign = 'center';
    kasimpatiBaslik.style.marginTop = '50px';
    kasimpatiBaslik.style.marginBottom = '20px';
    kapsayici.appendChild(kasimpatiBaslik);

    const kasimpatiResim = document.createElement('img');
    kasimpatiResim.src = "images/WhatsApp Görsel 2025-11-28 saat 21.54.01_63be7dee.jpg";
    kasimpatiResim.classList.add('hikaye-resmi');
    kasimpatiResim.style.maxWidth = '400px';
    kapsayici.appendChild(kasimpatiResim);

    // 3. Slayt Gösterisine Geç
    setTimeout(gosterSlaytBolumu, 1500); 
}

function gosterSlaytBolumu() {
    const slaytBaslik = document.createElement('h3');
    slaytBaslik.classList.add('hikaye-metni');
    slaytBaslik.innerHTML = '<b style="font-size: 26px;">Gezdiğimiz Yerler</b>';
    slaytBaslik.style.textAlign = 'center';
    slaytBaslik.style.marginTop = '50px';
    slaytBaslik.style.marginBottom = '20px';
    kapsayici.appendChild(slaytBaslik);
    
    // Slayt Kapsayıcısını oluştur
    const slaytKapsayici = document.createElement('div');
    slaytKapsayici.id = 'gezdigimizYerlerSlayt';
    slaytKapsayici.classList.add('slayt-kapsayici');
    kapsayici.appendChild(slaytKapsayici);

    // Slaytı Başlat
    initializeGezdigimizYerlerSlayt();
}


// =======================================================
// SLAYT GÖSTERİSİ FONKSİYONLARI
// =======================================================

function initializeGezdigimizYerlerSlayt() {
    const slaytKapsayici = document.getElementById('gezdigimizYerlerSlayt');
    
    gezdigimizYerlerMateryalleri.forEach((materyal, index) => {
        let element;
        if (materyal.type === 'image') {
            element = document.createElement('img');
            element.src = materyal.src;
        } else if (materyal.type === 'video') {
            element = document.createElement('video');
            element.src = materyal.src;
            element.controls = false;
            element.loop = true;
            element.muted = true;
            element.autoplay = true; 
        }

        element.classList.add('slayt-materyal');
        if (index === 0) element.classList.add('active'); 

        slaytKapsayici.appendChild(element);
    });

    slaytInterval = setInterval(nextSlayt, 3500); 
}

function nextSlayt() {
    const slaytlar = document.querySelectorAll('#gezdigimizYerlerSlayt .slayt-materyal');
    if (slaytlar.length === 0) return;

    slaytlar[currentSlaytIndex].classList.remove('active');

    currentSlaytIndex = (currentSlaytIndex + 1) % slaytlar.length;

    slaytlar[currentSlaytIndex].classList.add('active');

    if (slaytlar[currentSlaytIndex].tagName === 'VIDEO') {
        slaytlar[currentSlaytIndex].play();
    }
}

// ... (Diğer fonksiyonlar: havaDurumuMesajiGoster, updateDetailedCounter, check vb. aynı kalır)

// =======================================================
// DİĞER TÜM KODLAR (Tekrar yazılmaz, önceki mesajdaki kodlar geçerlidir)
// =======================================================