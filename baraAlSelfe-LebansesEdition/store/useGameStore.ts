import { create } from 'zustand';
import { CategoryKey } from '@/constants/categoriesConfig';
import categoriesData from '@/data/lebaneseGameData';

interface GameState {
  players: string[];
  categoryId: CategoryKey | null;
  secretWord: string;
  spyIndex: number;
  currentPlayerIndex: number;
  isRoleRevealed: boolean;
  gameStarted: boolean;

  startGame: (players: string[], categoryId: CategoryKey) => void;
  toggleReveal: () => void;
  nextPlayer: () => boolean;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  categoryId: null,
  secretWord: '',
  spyIndex: -1,
  currentPlayerIndex: 0,
  isRoleRevealed: false,
  gameStarted: false,

  startGame: (players, categoryId) => {
    const categoryWords = categoriesData[categoryId];
    const randomIndex = Math.floor(Math.random() * categoryWords.length);
    const secretWord = categoryWords[randomIndex];
    const spyIndex = Math.floor(Math.random() * players.length);

    set({
      players,
      categoryId,
      secretWord,
      spyIndex,
      currentPlayerIndex: 0,
      isRoleRevealed: false,
      gameStarted: true,
    });
  },

  toggleReveal: () => {
    set((state) => ({ isRoleRevealed: !state.isRoleRevealed }));
  },

  nextPlayer: () => {
    const { currentPlayerIndex, players } = get();
    if (currentPlayerIndex < players.length - 1) {
      set({
        currentPlayerIndex: currentPlayerIndex + 1,
        isRoleRevealed: false,
      });
      return true;
    }
    return false;
  },

  resetGame: () => {
    set({
      players: [],
      categoryId: null,
      secretWord: '',
      spyIndex: -1,
      currentPlayerIndex: 0,
      isRoleRevealed: false,
      gameStarted: false,
    });
  },
}));
