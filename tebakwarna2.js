// =============================
// JAWABAN BENAR
// =============================
const jawabanBenar = "PUTIH";

// =============================
// SISTEM UNTUK TOMBOL TULISAN
// =============================
const buttons = document.querySelectorAll(".grid-boxes button");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let jawabanUser = btn.innerText.trim();

        buttons.forEach(b => b.disabled = true);

        if (jawabanUser === jawabanBenar) {
            btn.classList.add("correct-effect");

            setTimeout(() => {
                window.location.href = "benar2.html";
            }, 1000);

        } else {
            btn.classList.add("wrong-effect");

            setTimeout(() => {
                window.location.href = "salah4.html";
            }, 800);
        }
    });
});


// =============================
// SISTEM UNTUK GAMBAR (BUTTON GAMBAR)
// =============================
const pilihanGambar = document.querySelectorAll(".animal-button");

pilihanGambar.forEach(imgBtn => {
    imgBtn.addEventListener("click", () => {

        const jawabanUser = imgBtn.getAttribute("data-answer");

        pilihanGambar.forEach(i => i.disabled = true);

        if (jawabanUser === jawabanBenar) {
            imgBtn.classList.add("correct-effect");

            setTimeout(() => {
                window.location.href = "benar2.html";
            }, 1000);

        } else {
            imgBtn.classList.add("wrong-effect");

            setTimeout(() => {
                window.location.href = "salah4.html";
            }, 800);
        }

    });
});
