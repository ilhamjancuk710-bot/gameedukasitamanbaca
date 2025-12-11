// Suara.js - menghubungkan tombol play di `game.html` ke file audio
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.play-btn');
    if (!btn) return; // nothing to do if button not present

    // Ubah path ini sesuai lokasi file audio Anda
    // Jika nanti ada lebih banyak suara, tambahkan pada objek `audioToLabel`
    const audioSrc = 'sound/monyet.mp3';
    const audio = new Audio(audioSrc);

    // Mapping dari file audio ke label jawaban yang benar (teks pada tombol)
    // Sesuaikan nilai kanan ('BABI','BURUNG','AYAM') sesuai teks tombol Anda
    const audioToLabel = {
        'sound/monyet.mp3': 'MONYET',
        // contoh tambahan: 'sound/burung.mp3': 'BURUNG'
    };
    audio.preload = 'auto';

    // Jika file audio tidak ditemukan, tunjukkan peringatan di konsol
    audio.addEventListener('error', function () {
        console.warn('Audio file not found or failed to load:', audioSrc);
        // beri tahu pengguna secara jelas
        alert('Gagal memuat file suara: ' + audioSrc + "\nPastikan file ada di folder 'sound' dan path benar.");
    });

    btn.addEventListener('click', function () {
        // sebelum memutar, set jawaban benar berdasarkan file audio
        const correctLabel = audioToLabel[audioSrc] || null;
        if (correctLabel) {
            setCorrectByLabel(correctLabel);
        } else {
            // jika tidak ada mapping, pastikan tidak ada jawaban yang ditandai
            clearCorrectMarks();
        }

        // putar dari awal setiap kali ditekan
        try {
            audio.currentTime = 0;
            audio.play().catch(function (err) {
                console.warn('Playback failed:', err);
                alert('Gagal memutar suara. Lihat konsol untuk detail.');
            });
            // tambahkan kelas singkat untuk feedback visual
            btn.classList.add('playing');
            setTimeout(function () { btn.classList.remove('playing'); }, 220);
        } catch (e) {
            console.warn('Error when trying to play audio:', e);
        }
    });

    // --- Jawaban benar/salah logic ---
    const optionButtons = Array.from(document.querySelectorAll('.grid-boxes button'));
    const feedbackEl = document.getElementById('feedback');

    // Score & lives
    let score = 0;
    let lives = 3;
    let gameOver = false;
    const scoreEl = document.getElementById('scoreValue');
    const livesEl = document.getElementById('lives');

    function updateScoreDisplay() {
        if (scoreEl) scoreEl.textContent = String(score);
    }

    function updateLivesDisplay() {
        if (!livesEl) return;
        if (lives <= 0) {
            livesEl.textContent = '❌';
        } else {
            // render heart emojis separated by space
            livesEl.textContent = Array.from({length: lives}).map(() => '❤️').join(' ');
        }
    }

    function endGame() {
        gameOver = true;
        // disable all option buttons and play button
        optionButtons.forEach(b => b.disabled = true);
        if (btn) btn.disabled = true;
        if (feedbackEl) {
            feedbackEl.textContent = 'Game Over';
            feedbackEl.classList.remove('correct','wrong');
            feedbackEl.classList.add('wrong','show');
        }
    }

    updateScoreDisplay();
    updateLivesDisplay();

    if (optionButtons.length > 0 && feedbackEl) {
        // utility: clear all correct marks
        function clearCorrectMarks() {
            optionButtons.forEach(b => b.dataset.correct = '0');
        }

        // set correct button by matching its visible text (case-insensitive)
        function setCorrectByLabel(label) {
            const target = optionButtons.find(b => b.textContent.trim().toUpperCase() === (label || '').toUpperCase());
            optionButtons.forEach(b => b.dataset.correct = (b === target) ? '1' : '0');
        }

        function showFeedback(isCorrect) {
            feedbackEl.textContent = isCorrect ? 'Benar!' : 'Salah!';
            feedbackEl.classList.remove('correct','wrong','show');
            feedbackEl.classList.add(isCorrect ? 'correct' : 'wrong');
            // trigger show after class changes
            setTimeout(() => feedbackEl.classList.add('show'), 10);
            // hide after 1.2s
            setTimeout(() => feedbackEl.classList.remove('show'), 1200);
        }

        // visual classes for buttons
        function markButton(b, isCorrect) {
            b.classList.remove('correct','wrong');
            b.classList.add(isCorrect ? 'correct' : 'wrong');
            setTimeout(() => b.classList.remove('correct','wrong'), 900);
        }

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

                // re-enable after feedback unless game over
                setTimeout(() => {
                    if (!gameOver) {
                        optionButtons.forEach(x => x.disabled = false);
                    }
                }, 900);

                // redirect to correct.html or wrong.html after short delay
                setTimeout(() => {
                    try {
                        const redirectPage = isCorrect ? 'benar1.html' : 'wrong.html';
                        window.location.href = redirectPage + '?score=' + score + '&lives=' + lives;
                    } catch (e) {
                        console.warn('Redirect failed:', e);
                    }
                }, 900);

                if (lives <= 0) {
                    endGame();
                }
            });
        });
    }

    // Reset game button logic (mulai ulang)
    const resetBtn = document.getElementById('resetBtn');
    function resetGame() {
        score = 0;
        lives = 3;
        gameOver = false;
        updateScoreDisplay();
        updateLivesDisplay();

        // clear feedback
        if (feedbackEl) {
            feedbackEl.classList.remove('show','correct','wrong');
            feedbackEl.textContent = '';
        }

        // enable buttons
        optionButtons.forEach(b => {
            b.disabled = false;
            b.classList.remove('correct','wrong');
            b.dataset.correct = '0';
        });

        if (btn) btn.disabled = false;
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            resetGame();
        });
    }
});

