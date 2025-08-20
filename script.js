document.addEventListener('DOMContentLoaded', () => {
    // --- GAME STATE ---
    let runs = 0;
    let outs = 0;
    let overCount = 0;
    let ballCount = 0;
    let batsmen = {
        Rahul: 0,
        Rohith: 0
    };
    let striker = 'Rahul';
    let freeHitActive = false;

    // --- UI ELEMENTS ---
    const scoreEl = document.getElementById('team-score-display');
    const wicketsEl = document.getElementById('wickets-display');
    const overEl = document.getElementById('overs-display');
    const RahulEl = document.getElementById('player-Rahul');
    const RohithEl = document.getElementById('player-Rohith');
    const freeHitEl = document.getElementById('free-hit-status');

    // --- DISPLAY REFRESH ---
    function renderScoreboard() {
        scoreEl.textContent = `${runs}/${outs}`;
        wicketsEl.textContent = outs;
        overEl.textContent = `${overCount}.${ballCount}`;

        // reset text
        RahulEl.textContent = `Rahul: ${batsmen.Rahul}`;
        RohithEl.textContent = `Rohith: ${batsmen.Rohith}`;

        // clear striker styles
        RahulEl.classList.remove('striker');
        RohithEl.classList.remove('striker');

        // add striker indicator
        if (striker === 'Rahul') {
            RahulEl.textContent += '*';
            RahulEl.classList.add('striker');
        } else {
            RohithEl.textContent += '*';
            RohithEl.classList.add('striker');
        }

        freeHitEl.textContent = freeHitActive ? 'FREE HIT!' : '';
    }

    // --- GAME ACTIONS ---
    function toggleStriker() {
        striker = striker === 'Rahul' ? 'Rohith' : 'Rahul';
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
        batsmen.Rahul = 0;
        batsmen.Rohith = 0;
        striker = 'Rahul';
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
