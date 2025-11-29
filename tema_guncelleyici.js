// =======================================================
// TEMA GÜNCELLEYİCİ - SADECE ARKA PLAN RENGİNİ AYARLAR
// =======================================================

// KASTAMONU VE API ANAHTARINIZ BU DOSYADA TANIMLIDIR
const OPENWEATHER_API_KEY = "4bba39abc1a54bc8504cae5957a8b2c4"; 
const SEHIR_ADI = "Kastamonu"; 

function temayiGuncelle(havaDurumuKodu) {
    const arkaPlanKatmani = document.getElementById('arkaPlanKatmani');
    
    // Eski sınıfları temizle
    arkaPlanKatmani.classList.remove('hava-güneşli', 'hava-bulutlu', 'hava-yağmurlu', 'hava-karlı'); 

    // Hava durumu koduna göre sınıf atama
    if (havaDurumuKodu >= 200 && havaDurumuKodu <= 599) {
        arkaPlanKatmani.classList.add('hava-yağmurlu');
    } else if (havaDurumuKodu >= 600 && havaDurumuKodu <= 699) {
        arkaPlanKatmani.classList.add('hava-karlı');
    } else if (havaDurumuKodu >= 700 && havaDurumuKodu <= 800) {
        // 800 (Açık) kodu Güneşli Temasına atanır
        arkaPlanKatmani.classList.add('hava-güneşli');
    } else if (havaDurumuKodu > 800) {
        // 80x kodları Bulutlu Temasına atanır
        arkaPlanKatmani.classList.add('hava-bulutlu');
    }
    
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
            }
        })
        .catch(error => {
            console.error("Hava durumu verisi çekilemedi. Varsayılan tema kullanılacak.");
            // Hata durumunda, index.html'e eklediğimiz varsayılan tema (hava-güneşli) görünmeye devam eder.
        });
}

// Hava durumu çekme işlemini hemen başlat ve her 30 dakikada bir güncelle
havaDurumuCekVeTemayiAyarla();
setInterval(havaDurumuCekVeTemayiAyarla, 1800000);