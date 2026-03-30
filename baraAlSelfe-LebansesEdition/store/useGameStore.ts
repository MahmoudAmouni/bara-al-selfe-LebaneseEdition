import { create } from 'zustand';
import { CategoryKey } from '@/constants/categoriesConfig';
import categoriesData from '@/data/lebaneseGameData';

function generateGuidedPairs(n: number, S: number[]): number[][] {
  const pairs: number[][] = [];
  if (n % 2 === 0) {
    for (let i = 0; i < n; i += 2) {
      pairs.push([S[i], S[i + 1]]);
    }
    for (let i = n - 1; i > 0; i -= 2) {
      pairs.push([S[i], S[(i + 1) % n]]);
    }
  } else {
    for (let i = 0; i <= n - 3; i += 2) {
      pairs.push([S[i], S[i + 1]]);
    }
    pairs.push([S[n - 2], S[n - 1]]);
    pairs.push([S[n - 1], S[0]]);
    for (let i = 1; i <= n - 4; i += 2) {
      pairs.push([S[i], S[i + 1]]);
    }
  }
  return pairs;
}

interface GameState {
  players: string[];
  categoryId: CategoryKey | null;
  secretWord: string;
  spyIndex: number;
  currentPlayerIndex: number;
  isRoleRevealed: boolean;
  gameStarted: boolean;

  round: number;
  guidedPairs: number[][];
  currentStep: number;
  
  currentAskerIndex: number;
  previousAskerIndex: number | null;
  round2QuestionCount: number;
  votes: number[]; 
  currentVoterIndex: number;
  isVoteRevealed: boolean;

  startGame: (players: string[], categoryId: CategoryKey) => void;
  toggleReveal: () => void;
  nextPlayer: () => boolean;
  resetGame: () => void;

  initQuestionPhase: () => void;
  nextGuidedStep: () => void;
  askPlayer: (targetIndex: number) => void;
  getAvailableTargets: () => number[];
  canEndEarly: () => boolean;
  endQuestionPhaseEarly: () => void;
  isQuestionPhaseOver: () => boolean;

  initVotingPhase: () => void;
  toggleVoteReveal: () => void;
  submitVote: (targetIndex: number) => boolean; 
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  categoryId: null,
  secretWord: '',
  spyIndex: -1,
  currentPlayerIndex: 0,
  isRoleRevealed: false,
  gameStarted: false,

  round: 1,
  guidedPairs: [],
  currentStep: 0,
  currentAskerIndex: 0,
  previousAskerIndex: null,
  round2QuestionCount: 0,

  votes: [],
  currentVoterIndex: 0,
  isVoteRevealed: false,

  startGame: (players, categoryId) => {
    const categoryWords = categoriesData[categoryId];
    const randomIndex = Math.floor(Math.random() * categoryWords.length);
    const secretWord = categoryWords[randomIndex];
    const spyIndex = Math.floor(Math.random() * players.length);
    
    const n = players.length;
    const S = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [S[i], S[j]] = [S[j], S[i]];
    }
    const guidedPairs = generateGuidedPairs(n, S);

    set({
      players,
      categoryId,
      secretWord,
      spyIndex,
      currentPlayerIndex: 0,
      isRoleRevealed: false,
      gameStarted: true,
      
      round: 1,
      guidedPairs,
      currentStep: 0,
      currentAskerIndex: S[0],
      previousAskerIndex: null,
      round2QuestionCount: 0,

      votes: [],
      currentVoterIndex: 0,
      isVoteRevealed: false,
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

  initQuestionPhase: () => {
  },

  nextGuidedStep: () => {
    set((state) => {
      if (state.currentStep < state.guidedPairs.length - 1) {
        return { currentStep: state.currentStep + 1 };
      } else {
        return { round: 2 };
      }
    });
  },

  askPlayer: (targetIndex) => {
    set((state) => {
      const n = state.players.length;
      const maxQuestions = n + Math.floor(n / 2);
      const nextCount = state.round2QuestionCount + 1;
      
      const nextState: Partial<GameState> = {
        currentAskerIndex: targetIndex,
        previousAskerIndex: state.currentAskerIndex,
        round2QuestionCount: nextCount,
      };

      if (nextCount >= maxQuestions) {
        nextState.round = 3;
      }
      
      return nextState;
    });
  },

  getAvailableTargets: () => {
    const { players, currentAskerIndex, previousAskerIndex, round, currentVoterIndex } = get();
    if (round === 2) {
      return players
        .map((_, index) => index)
        .filter((index) => index !== currentAskerIndex && index !== previousAskerIndex);
    }
    return players
      .map((_, index) => index)
      .filter((index) => index !== currentVoterIndex);
  },

  canEndEarly: () => {
    const { round, round2QuestionCount, players } = get();
    return round === 2 && round2QuestionCount >= players.length - 1;
  },

  endQuestionPhaseEarly: () => {
    set({ round: 3 });
  },

  isQuestionPhaseOver: () => {
    const { round } = get();
    return round === 3;
  },

  initVotingPhase: () => {
    set({
      currentVoterIndex: 0,
      isVoteRevealed: false,
      votes: [],
    });
  },

  toggleVoteReveal: () => {
    set((state) => ({ isVoteRevealed: !state.isVoteRevealed }));
  },

  submitVote: (targetIndex) => {
    const { votes, currentVoterIndex, players } = get();
    const newVotes = [...votes];
    newVotes[currentVoterIndex] = targetIndex;
    
    if (currentVoterIndex < players.length - 1) {
      set({
        votes: newVotes,
        currentVoterIndex: currentVoterIndex + 1,
        isVoteRevealed: false,
      });
      return true;
    } else {
      set({ votes: newVotes });
      return false;
    }
  },

  resetGame: () => {
    set({
      categoryId: null,
      secretWord: '',
      spyIndex: -1,
      currentPlayerIndex: 0,
      isRoleRevealed: false,
      gameStarted: false,
      
      round: 1,
      guidedPairs: [],
      currentStep: 0,
      currentAskerIndex: 0,
      previousAskerIndex: null,
      round2QuestionCount: 0,

      votes: [],
      currentVoterIndex: 0,
      isVoteRevealed: false,
    });
  },
}));
