import { create } from "zustand";

export type FlashcardOption = {
  key: string;
  value: string;
};

export type Flashcard = {
  question: string;
  options: FlashcardOption[];
  correctAnswer: string; // Should match one of the option labels (e.g., "A", "B", "C", "D")
};


export type Flashcards = Flashcard[];

export type FlashCardStoreProps = {
  flashCards: Flashcards;
  setFlashCards: (items: Flashcard[]) => void;
  removeFlashCards: () => void;
};

export const useFlashCardStore = create<FlashCardStoreProps>((set) => ({
  flashCards: [],
  setFlashCards: (items: Flashcard[]) => set(() => ({ flashCards: items })),
  removeFlashCards: () => set({ flashCards: [] }),
}));
