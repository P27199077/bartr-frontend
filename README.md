# 🔁 BartR - Campus Trade & Shoutout Community

BartR is a premium, interactive web application prototype designed for campus-wide item trading, broadcast updates (shoutouts), and real-time student connections. 

Built with **React**, **Vite**, **Lucide Icons**, and custom CSS variables, the frontend serves as an elegant, high-fidelity wireframe demonstrating interactive student-to-student transactions.

---

## 🎨 App Modules & Features

### 1. 🤝 Swap Board (`SwapView`)
- Displays item barter requests where students list items they have and what they'd like in return.
- Category filters to easily locate textbooks, clothing, electronics, or dorm gear.

### 2. 📢 Shoutout Broadcasts (`ShoutoutView`)
- A real-time campus bulletin board for quick calls-to-action (e.g., Chess games at the SAC, study buddies, music jam sessions).
- Differentiates between open-ended events and limited-response posts (which close automatically once the capacity limit is met).

### 3. 📍 Interactive Campus Map (`MapView`)
- An interactive map interface showing live pins of active shoutouts geolocated to coordinates across campus landmarks.
- Enables users to click pins and reply directly to broadcast shoutouts directly from the map.

### 4. 💬 Chat Portal (`ChatView`)
- Private messaging interface for students to coordinate item meetups, negotiate swaps, and finalize barter trades securely.

### 5. 👤 Profile & Verification (`ProfileView`)
- Student profile detailing campus details, trade history metrics, and active swap listings.

---

## 📂 Repository Structure

- **`src/views/`**: View components for `SwapView`, `ShoutoutView`, `MapView`, `ChatView`, and `ProfileView`.
- **`src/App.jsx`**: Manages tab navigation states and initializes mock database records.
- **`src/index.css` & `src/App.css`**: Vanilla CSS layouts, custom grids, and interactive navigational elements.
- **`vite.config.js`**: React-Vite project compiler settings.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation & Local Run
1. Navigate into the project folder:
   ```bash
   cd bartr-frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Launch the local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local link (usually `http://localhost:5173/`) in your browser to view the application.
