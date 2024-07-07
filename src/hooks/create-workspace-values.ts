import { create } from "zustand";

type CreateWorkSpaceValues = {
    name: string;
    imageUrl: string;
    updateImageURL: (url: string) => void;
    updateValues: (values: Partial<CreateWorkSpaceValues>) => void;
    currStep: number;
    setCurrStep: (step: number) => void;
}

export const useCreateWorkSpaceValues = create<CreateWorkSpaceValues>(set => ({
    name: "",
    imageUrl: "",
    updateImageURL: url => set({ imageUrl: url }),
    updateValues: values => set(values),
    currStep: 1,
    setCurrStep: step => set({ currStep: step })
}))