document.addEventListener('DOMContentLoaded', () => {
    // --- GAME STATE ---
    let runs = 0;
    let outs = 0;
    let overCount = 0;
    let ballCount = 0;
    let batsmen = {
        Viraj: 0,
        Meka: 0
    };
    let striker = 'Viraj';
    let freeHitActive = false;

    // --- UI ELEMENTS ---
    const scoreEl = document.getElementById('team-score-display');
    const wicketsEl = document.getElementById('wickets-display');
    const overEl = document.getElementById('overs-display');
    const VirajEl = document.getElementById('player-Viraj');
    const MekaEl = document.getElementById('player-Meka');
    const freeHitEl = document.getElementById('free-hit-status');

    // --- DISPLAY REFRESH ---
    function renderScoreboard() {
        scoreEl.textContent = `${runs}/${outs}`;
        wicketsEl.textContent = outs;
        overEl.textContent = `${overCount}.${ballCount}`;

        // reset text
        VirajEl.textContent = `Viraj: ${batsmen.Viraj}`;
        MekaEl.textContent = `Meka: ${batsmen.Meka}`;

        // clear striker styles
        VirajEl.classList.remove('striker');
        MekaEl.classList.remove('striker');

        // add striker indicator
        if (striker === 'Viraj') {
            VirajEl.textContent += '*';
            VirajEl.classList.add('striker');
        } else {
            MekaEl.textContent += '*';
            MekaEl.classList.add('striker');
        }

        freeHitEl.textContent = freeHitActive ? 'FREE HIT!' : '';
    }

    // --- GAME ACTIONS ---
    function toggleStriker() {
        striker = striker === 'Viraj' ? 'Meka' : 'Viraj';
    }

    function nextBall() {
        if (outs >= 10) return;
        ballCount++;
        if (ballCount === 6) {
            ballCount = 0;
            overCount++;
            toggleStriker();
        }
    }

    function scoreRuns(num) {
        if (outs >= 10) return;
        runs += num;
        batsmen[striker] += num;
        nextBall();
        if (num % 2 === 1) toggleStriker();
        freeHitActive = false;
        renderScoreboard();
    }

    function recordWicket() {
        if (freeHitActive) {
            // wicket ignored on free hit
            freeHitActive = false;
            nextBall();
            renderScoreboard();
            return;
        }
        if (outs < 10) {
            outs++;
            nextBall();
            // striker stays same unless new batsman added manually
        }
        freeHitActive = false;
        renderScoreboard();
    }

    function resetBoard() {
        runs = 0;
        outs = 0;
        overCount = 0;
        ballCount = 0;
        batsmen.Viraj = 0;
        batsmen.Meka = 0;
        striker = 'Viraj';
        freeHitActive = false;
        renderScoreboard();
    }

    // --- BUTTON EVENTS ---
    document.getElementById('btn-run-1').onclick = () => scoreRuns(1);
    document.getElementById('btn-run-2').onclick = () => scoreRuns(2);
    document.getElementById('btn-run-3').onclick = () => scoreRuns(3);
    document.getElementById('btn-run-4').onclick = () => scoreRuns(4);
    document.getElementById('btn-run-6').onclick = () => scoreRuns(6);

    document.getElementById('btn-wicket').onclick = recordWicket;
    document.getElementById('btn-lbw').onclick = recordWicket;

    document.getElementById('btn-wide').onclick = () => {
        if (outs < 10) {
            runs++;
            renderScoreboard();
        }
    };

    document.getElementById('btn-no-ball').onclick = () => {
        if (outs < 10) {
            runs++;
            batsmen[striker]++;
            freeHitActive = true;
            renderScoreboard();
        }
    };

    document.getElementById('btn-bye').onclick = () => {
        if (outs < 10) {
            runs++;
            nextBall();
            if (runs % 2 === 1) toggleStriker();
            renderScoreboard();
        }
    };

    document.getElementById('btn-leg-bye').onclick = () => {
        if (outs < 10) {
            runs++;
            nextBall();
            if (runs % 2 === 1) toggleStriker();
            renderScoreboard();
        }
    };

    document.getElementById('btn-switch-striker').onclick = () => {
        toggleStriker();
        renderScoreboard();
    };

    document.getElementById('btn-free-hit').onclick = () => {
        if (outs < 10) {
            freeHitActive = true;  // no extra run here
            renderScoreboard();
        }
    };

    document.getElementById('btn-reset').onclick = resetBoard;

    // --- INITIALIZE ---
    renderScoreboard();
});
