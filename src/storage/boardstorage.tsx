import { create } from "zustand";

type BoardState = {
  currentBoard: string;
  changeBoard: (newBoard: string) => void;
};

export const useBoard = create<BoardState>((set) => ({
  currentBoard: "Bead Plate",
  changeBoard: (newBoard) => set({ currentBoard: newBoard }),
}));
