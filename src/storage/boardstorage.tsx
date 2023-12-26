import { create } from "zustand";

type BoardState = {
  currentBoard: string;
  historyBoard: number[];
  changeBoard: (newBoard: string) => void;
  changeHistoryBoard: (newHistoryBoard: number[]) => void;
};

export const useBoard = create<BoardState>((set) => ({
  currentBoard: "Bead Plate",
  historyBoard: [],
  changeBoard: (newBoard) => set({ currentBoard: newBoard }),
  changeHistoryBoard: (newHistoryBoard) =>
    set({ historyBoard: newHistoryBoard }),
}));
