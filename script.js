const DOGRU_SIFRE = "sevmek";

function check() {
    let pass = document.getElementById('password').value;
    if(pass.toLowerCase() === DOGRU_SIFRE) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
        
        const music = document.getElementById('music');
        music.play().catch(e => console.log("Etkileşim gerekiyor."));
    } else {
        document.getElementById('wrong').innerText = "Hiç anlamadın ki beni, hiç dediklerim seni alakadar etmedi ki bak şifreyi bile yanlış giriyorsun. Pek söze gerek yok.";
    }
}