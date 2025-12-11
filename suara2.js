// Suara2.js - untuk slide3.html dengan sound/2.mp3
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.play-btn');
    if (!btn) return; // nothing to do if button not present

    // Audio untuk slide3
    const audioSrc = 'sound/harimau.mp3';
    const audio = new Audio(audioSrc);

    // Mapping dari file audio ke label jawaban yang benar
    const audioToLabel = {
        'sound/harimau.mp3': 'HARIMAU'
    };
    audio.preload = 'auto';

    // Jika file audio tidak ditemukan, tunjukkan peringatan di konsol
    audio.addEventListener('error', function () {
        console.warn('Audio file not found or failed to load:', audioSrc);
        alert('Gagal memuat file suara: ' + audioSrc + "\nPastikan file ada di folder 'sound' dan path benar.");
    });

    btn.addEventListener('click', function () {
        // sebelum memutar, set jawaban benar berdasarkan file audio
        const correctLabel = audioToLabel[audioSrc] || null;
        if (correctLabel) {
            setCorrectByLabel(correctLabel);
        } else {
            clearCorrectMarks();
        }

        // putar dari awal setiap kali ditekan
        try {
            audio.currentTime = 0;
            audio.play().catch(function (err) {
                console.warn('Playback failed:', err);
                alert('Gagal memutar suara. Lihat konsol untuk detail.');
            });
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
    let score = 2;
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
            livesEl.textContent = Array.from({length: lives}).map(() => '❤️').join(' ');
        }
    }

    function endGame() {
        gameOver = true;
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
        function clearCorrectMarks() {
            optionButtons.forEach(b => b.dataset.correct = '0');
        }

        function setCorrectByLabel(label) {
            const target = optionButtons.find(b => b.textContent.trim().toUpperCase() === (label || '').toUpperCase());
            optionButtons.forEach(b => b.dataset.correct = (b === target) ? '1' : '0');
        }

        function showFeedback(isCorrect) {
            feedbackEl.textContent = isCorrect ? 'Benar!' : 'Salah!';
            feedbackEl.classList.remove('correct','wrong','show');
            feedbackEl.classList.add(isCorrect ? 'correct' : 'wrong');
            setTimeout(() => feedbackEl.classList.add('show'), 10);
            setTimeout(() => feedbackEl.classList.remove('show'), 1200);
        }

        function markButton(b, isCorrect) {
            b.classList.remove('correct','wrong');
            b.classList.add(isCorrect ? 'correct' : 'wrong');
            setTimeout(() => b.classList.remove('correct','wrong'), 900);
        }

        optionButtons.forEach(b => {
            b.dataset.correct = '0';
            b.addEventListener('click', function () {
                if (gameOver) return;
                optionButtons.forEach(x => x.disabled = true);
                const isCorrect = b.dataset.correct === '1';

                if (isCorrect) {
                    score += 1;
                    updateScoreDisplay();
                } else {
                    lives -= 2;
                    updateLivesDisplay();
                }

                showFeedback(isCorrect);
                markButton(b, isCorrect);

                setTimeout(() => {
                    if (!gameOver) {
                        optionButtons.forEach(x => x.disabled = false);
                    }
                }, 900);

                setTimeout(() => {
                    try {
                        if (isCorrect) {
                            window.location.href = 'correct.html?score=' + score + '&lives=' + lives;
                        } else {
                            window.location.href = 'wrong.html?lives=' + lives + '&score=' + score;
                        }
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

    // Reset game button logic
    const resetBtn = document.getElementById('resetBtn');
    function resetGame() {
        score = 2;
        lives = 3;
        gameOver = false;
        updateScoreDisplay();
        updateLivesDisplay();

        if (feedbackEl) {
            feedbackEl.classList.remove('show','correct','wrong');
            feedbackEl.textContent = '';
        }

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
