import { create } from 'zustand';

export const useCreateListStore = create((set) => ({
    stArrowFlag: false,
    stFnSetArrowFlag: (stArrowFlag) => set(() => ({ stArrowFlag })),
}))