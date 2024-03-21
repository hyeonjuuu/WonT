import { create } from "zustand";

type ModalStateStoreType = {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
};

export const useModalStateStore = create<ModalStateStoreType>((set) => ({
  showModal: false,
  setShowModal: (state: boolean) => set({ showModal: state }),
}));
