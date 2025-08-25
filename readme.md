# 🏏 Cricket Scoreboard – Interactive Web App

## Introduction
A lightweight, interactive **cricket scoreboard** built using **HTML5**, **CSS3**, and **JavaScript**.  
This project is designed to track scores, overs, and players in real time with an intuitive UI.

---

## ✨ Key Features

- **Live Score Tracking**  
  Displays team runs, wickets, and overs in real time.

- **Player Stats**  
  Tracks runs for Rahul and Rohith, with striker indicated clearly.

- **Overs Display**  
  Shows overs in `overs.balls` format (e.g., 4.2).

- **Interactive Controls**  
  Buttons for all major cricket actions:  
  Runs (1, 2, 3, 4, 6), Wicket, LBW, Wide, No Ball, Bye, Leg Bye.

- **Game Logic Automation**
  - Striker changes automatically after odd runs and at the end of overs.  
  - No Ball gives both an extra run to the team and runs to the batsman.  
  - Free Hit logic included as per assignment rules.

- **Manual Controls**
  - Switch striker anytime.  
  - Reset button resets the entire match state.

---

## 🚀 Getting Started

### Quick Launch (Recommended)
Run the app with **VS Code Live Server**:

1. Clone or download this repository.  
2. Open the project folder in **Visual Studio Code**.  
3. Install the "Live Server" extension.  
4. Right-click `index.html` → **Open with Live Server**.

### Alternative
Just open `index.html` directly in a browser (some functionality might behave differently without a server).

---

## 🎨 Design Choices & Assumptions

- Only two batsmen (`Rahul` and `Rohith`) are implemented.  
- After a wicket, **Rahul always becomes the new striker**.  
- "Wicket" and "LBW" buttons both decrease wickets by 1.  
- **Free Hit** adds 1 run to the team and applies free-hit logic for the next ball (as per assignment rules).  
- After **10 wickets**, scoring stops but no "Game Over" message is displayed.

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling (modern, responsive layout)  
- **JavaScript (Vanilla)** – Match logic & interactivity  

---

## 📂 Project Files

- `index.html` – Main structure of the scoreboard  
- `styles.css` – Styling and layout  
- `script.js` – Game logic and interactivity  

---
