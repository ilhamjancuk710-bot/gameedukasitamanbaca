// =============================
// JAWABAN BENAR
// =============================
const jawabanBenar = "HITAM PUTIH";

// =============================
// SISTEM UNTUK TOMBOL TULISAN
// =============================
const buttons = document.querySelectorAll(".grid-boxes button");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let jawabanUser = btn.innerText.trim();

        buttons.forEach(b => b.disabled = true);

        // attach handlers
        optionButtons.forEach(b => {
            // initialize
            b.dataset.correct = '0';
            b.addEventListener('click', function () {
                if (gameOver) return;
                // disable briefly to avoid repeated clicks
                optionButtons.forEach(x => x.disabled = true);
                const isCorrect = b.dataset.correct === '1';

                if (isCorrect) {
                    score += 1;
                    updateScoreDisplay();
                } else {
                    lives -= 1;
                    updateLivesDisplay();
                }

                showFeedback(isCorrect);
                markButton(b, isCorrect);

        if (jawabanUser === jawabanBenar) {
            btn.classList.add("correct-effect");

            setTimeout(() => {
                window.location.href = "benar5.html";
            }, 1000);

        } else {
            btn.classList.add("wrong-effect");

            setTimeout(() => {
                window.location.href = "salah4.html";
            }, 800);
        }
    });
});