// =======================================================
// TEMA GÜNCELLEYİCİ - JAVASCRIPT İLE DİREKT RENK ATAMASI
// =======================================================

const OPENWEATHER_API_KEY = "4bba39abc1a54bc8504cae5957a8b2c4"; 
const SEHIR_ADI = "Kastamonu"; 

// HAVA DURUMU KODLARINA GÖRE RENK PALETLERİ
const TEMA_PALETLERI = {
    // 2xx, 3xx, 5xx (Yağmurlu / Fırtınalı)
    yagmurlu: 'linear-gradient(135deg, #486a98, #829cbc)', 
    
    // 6xx (Karlı)
    karli: 'linear-gradient(135deg, #e4f1fe, #c4d7e7)', 
    
    // 7xx (Sisli, Dumanlı, Puslu) - Sizin de istediğiniz tema
    sisli: 'linear-gradient(135deg, #a4b0be, #dfe4ea)', 
    
    // 800 (Açık)
    gunesli: 'linear-gradient(135deg, #ffc439, #ff9139)', 
    
    // 80x (Bulutlu)
    bulutlu: 'linear-gradient(135deg, #95a5a6, #bdc3c7)',
    
    // Varsayılan / Hata Durumu (Sizin özel pembe temanız)
    varsayilan: 'linear-gradient(135deg, #ff9ec7, #ffd0e7)'
};


function temayiGuncelle(havaDurumuKodu) {
    const arkaPlanKatmani = document.getElementById('arkaPlanKatmani');
    let atanacakTema = TEMA_PALETLERI.varsayilan;

    // Koda göre renk paleti seçimi
    if (havaDurumuKodu >= 200 && havaDurumuKodu <= 599) {
        atanacakTema = TEMA_PALETLERI.yagmurlu;
    } else if (havaDurumuKodu >= 600 && havaDurumuKodu <= 699) {
        atanacakTema = TEMA_PALETLERI.karli;
    } else if (havaDurumuKodu >= 700 && havaDurumuKodu <= 799) { 
        // 7xx kodları sis, duman vb. anlamına gelir
        atanacakTema = TEMA_PALETLERI.sisli;
    } else if (havaDurumuKodu === 800) {
        atanacakTema = TEMA_PALETLERI.gunesli;
    } else if (havaDurumuKodu > 800) {
        atanacakTema = TEMA_PALETLERI.bulutlu;
    }

    // CSS sınıfı kullanmak yerine, direkt stil ataması yapıyoruz.
    // Bu, tüm öncelik ve sınıflandırma sorunlarını çözer.
    arkaPlanKatmani.style.background = atanacakTema;
    arkaPlanKatmani.style.setProperty('filter', 'brightness(0.9)', 'important'); // Parlaklık ayarı

    // Hava durumu bilgisini saate ekle (sadece bir kere eklenir)
    const gosterge = document.getElementById('saatGostergeci');
    if (gosterge && !gosterge.innerText.includes(SEHIR_ADI)) {
        gosterge.innerText += ` | ${SEHIR_ADI}`;
    }
}


function havaDurumuCekVeTemayiAyarla() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${SEHIR_ADI}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=tr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.weather && data.weather.length > 0) {
                const havaDurumuKodu = data.weather[0].id;
                temayiGuncelle(havaDurumuKodu);
            } else {
                // API'dan veri gelmezse (ama hata vermezse) varsayılan tema kullanılır
                temayiGuncelle(0);
            }
        })
        .catch(error => {
            console.error("Hava durumu verisi çekilemedi. Varsayılan tema kullanılacak.");
            // Hata durumunda varsayılan tema kullanılır
            temayiGuncelle(0); 
        });
}

// Hava durumu çekme işlemini hemen başlat ve her 30 dakikada bir güncelle
havaDurumuCekVeTemayiAyarla();
setInterval(havaDurumuCekVeTemayiAyarla, 1800000);