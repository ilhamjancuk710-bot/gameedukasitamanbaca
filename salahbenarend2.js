// Jawaban yang benar
const jawabanBenar = "HITAM PUTIH";

// Ambil semua tombol
const buttons = document.querySelectorAll(".grid-boxes button");

// Loop semua tombol
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        let jawabanUser = btn.innerText.trim();

        // Nonaktifkan semua tombol supaya tidak double klik
        buttons.forEach(b => b.disabled = true);

        // Jika benar
        if (jawabanUser === jawabanBenar) {
            btn.classList.add("correct-effect");

            setTimeout(() => {
                window.location.href = "salahayamend1.html";
            }, 1000);

        // Jika salah
        } else {
            btn.classList.add("wrong-effect");

            setTimeout(() => {
                window.location.href = "salah4.html";
            }, 800);
       
        }
    });
});