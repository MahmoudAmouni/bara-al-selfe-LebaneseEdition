# 🎲 برا السالفة — النسخة اللبنانية

<p align="center">
  <img src="baraAlSelfe-LebansesEdition/assets/images/bara-al-selfe-logo.png" alt="Bara Al-Selfe Logo" width="200"/>
</p>

<p align="center">
  <strong>Bara Al-Selfe — Lebanese Edition</strong><br/>
  A fast-paced, social deduction party game for friends & families 🇱🇧
</p>

---

## 📖 Table of Contents

- [About / لمحة عن اللعبة](#-about--لمحة-عن-اللعبة)
- [Features / المميزات](#-features--المميزات)
- [How to Play / كيف بتلعب؟](#-how-to-play--كيف-بتلعب)
- [Categories / الفئات](#-game-categories--الفئات)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🇱🇧 About / لمحة عن اللعبة

**Bara Al-Selfe Lebanese Edition** is a "pass-and-play" social deduction game — no internet required! Everyone knows a secret word **except one person**, who is **"Outside the Story" (برا السالفة)**. Their goal is to blend in; everyone else's goal is to expose them.

> لعبة "برا السالفة" بنسختها اللبنانية — لعبة ذكاء، تمويه، وتسلية! الكل بيعرفوا الكلمة السرية إلا واحد... هيدا هو اللي "برا السالفة".

---

## ✨ Features / المميزات

- 🗣️ **Lebanese Dialect** — Fully localized content, humor, and categories for the Lebanese community
- 📵 **100% Offline** — No internet needed, perfect for cafes, road trips & gatherings
- 👨‍👩‍👧 **Pass & Play** — Supports 3 to 10+ players on a single device
- 🎨 **Premium UI/UX** — Glassmorphism design, smooth animations, vibrant Lebanese color tones
- 📂 **Dynamic Categories** — Thousands of words across Lebanese-themed categories
- 💾 **Persistent Storage** — Game state saved with AsyncStorage

---

## 🎮 How to Play / كيف بتلعب؟

1. **Choose a Category** — Pick from Lebanese food, animals, landmarks & more
2. **Distribute Roles** — Pass the phone around; each player secretly sees the word (or "إنت برا السالفة!")
3. **Ask Questions** — Take turns asking each other short questions about the secret word — stay clever!
4. **Vote** — After the round, vote on who you think is "برا السالفة"
5. **Reveal** — The outsider is revealed. Can they guess the word to save themselves?

---

## 📦 Game Categories / الفئات

| Category | Examples |
|----------|---------|
| 🥙 أكل لبناني | Hummus, Tabbouleh, Kibbeh, Mansaf |
| 🐾 حيوانات | Local & global animals in Lebanese dialect |
| 🥦 خضار وفواكه | Fresh produce from Lebanese markets |
| 👗 ملابس | Traditional and modern Lebanese fashion |
| 🍮 حلويات | Knefe, Baklawa, Maamoul & more |

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| [Expo](https://expo.dev/) | React Native framework |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [Zustand](https://github.com/pmndrs/zustand) | State management |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local data persistence |
| TypeScript | Type safety |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS)
- [Expo Go](https://expo.dev/go) app on your phone (or a simulator)

### Installation
```bash
# 1. Clone the repo
git clone https://github.com/MahmoudAmouni/bara-al-selfe-LebaneseEdition.git

# 2. Navigate to the app folder
cd bara-al-selfe-LebaneseEdition/baraAlSelfe-LebansesEdition

# 3. Install dependencies
npm install

# 4. Start the development server
npx expo start
```

Scan the QR code with **Expo Go** on your phone and start playing! 🎉

---

## 📁 Project Structure
```
.
├── baraAlSelfe-LebansesEdition/
│   ├── app/              # Expo Router pages
│   ├── components/       # Reusable UI components
│   ├── screens/          # Feature-specific screens
│   ├── store/            # Zustand state management
│   ├── data/             # Lebanese word categories & game data
│   └── assets/           # Images, fonts, graphics
├── README.md
└── LICENSE
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/new-category`
3. Commit your changes: `git commit -m 'Add new category: مهن'`
4. Push to the branch: `git push origin feature/new-category`
5. Open a Pull Request

---

## 👤 Credits

Developed with ❤️ by **Mahmoud Amouni**

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).