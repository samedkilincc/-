// =======================================================
// YENİ TEMA GÜNCELLEYİCİ - WEATHERAPI (61f5c664edc0463abc591104252911)
// =======================================================

const WEATHERAPI_KEY = "61f5c664edc0463abc591104252911"; 
const SEHIR_ADI = "Kastamonu"; 

// HAVA DURUMU KODLARINA GÖRE RENK PALETLERİ
// Tema renkleri direkt JavaScript tarafından atanacağı için en kesin yöntemdir.
const TEMA_PALETLERI = {
    // Açık, Güneşli (1000)
    gunesli: 'linear-gradient(135deg, #ffc439, #ff9139)', 
    
    // Bulutlu, Kapalı (1003, 1006, 1009)
    bulutlu: 'linear-gradient(135deg, #95a5a6, #bdc3c7)', 
    
    // Sisli, Puslu (Mist: 1030, Fog: 1135, Freezing Fog: 1147)
    sisli: 'linear-gradient(135deg, #a4b0be, #dfe4ea)', 
    
    // Yağmurlu, Çiseleyen, Dolu (Rain codes: 1180-1201)
    yagmurlu: 'linear-gradient(135deg, #486a98, #829cbc)', 
    
    // Karlı, Sulu Kar (Snow codes: 1210-1225)
    karli: 'linear-gradient(135deg, #e4f1fe, #c4d7e7)', 
    
    // Varsayılan / Hata Durumu (Sizin özel pembe temanız)
    varsayilan: 'linear-gradient(135deg, #ff9ec7, #ffd0e7)'
};


function temayiGuncelle(havaDurumuKodu) {
    const arkaPlanKatmani = document.getElementById('arkaPlanKatmani');
    let atanacakTema = TEMA_PALETLERI.varsayilan;

    // WeatherAPI kodlarına göre tema atama (En Sık Karşılaşılan Kodlar)
    if (havaDurumuKodu === 1000) {
        atanacakTema = TEMA_PALETLERI.gunesli;
    } else if (havaDurumuKodu >= 1003 && havaDurumuKodu <= 1009) {
        atanacakTema = TEMA_PALETLERI.bulutlu;
    } else if (havaDurumuKodu === 1030 || havaDurumuKodu === 1135 || havaDurumuKodu === 1147) {
        // Sisli ve Puslu havalar
        atanacakTema = TEMA_PALETLERI.sisli;
    } else if (havaDurumuKodu >= 1180 && havaDurumuKodu <= 1201) { 
        // Yağmur türleri
        atanacakTema = TEMA_PALETLERI.yagmurlu;
    } else if (havaDurumuKodu >= 1210 && havaDurumuKodu <= 1225) { 
        // Kar türleri
        atanacakTema = TEMA_PALETLERI.karli;
    }

    // GÜÇLÜ ATAMA: CSS önceliği için direkt inline stil ataması
    arkaPlanKatmani.style.background = atanacakTema;
    arkaPlanKatmani.style.setProperty('filter', 'brightness(0.9)', 'important'); 

    // Hava durumu bilgisini saate ekle (sadece bir kere eklenir)
    const gosterge = document.getElementById('saatGostergeci');
    if (gosterge && !gosterge.innerText.includes(SEHIR_ADI)) {
        gosterge.innerText += ` | ${SEHIR_ADI}`;
    }
}


function havaDurumuCekVeTemayiAyarla() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${SEHIR_ADI}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.current && data.current.condition) {
                const havaDurumuKodu = data.current.condition.code;
                temayiGuncelle(havaDurumuKodu);
            } else {
                temayiGuncelle(0); 
            }
        })
        .catch(error => {
            console.error("WeatherAPI verisi çekilemedi. Varsayılan tema kullanılacak.");
            temayiGuncelle(0); 
        });
}

// Hava durumu çekme işlemini hemen başlat ve her 30 dakikada bir güncelle
havaDurumuCekVeTemayiAyarla();
setInterval(havaDurumuCekVeTemayiAyarla, 1800000);