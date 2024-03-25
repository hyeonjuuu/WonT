import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegionStoreType = {
  selectedRegionName: null | string;
  setRegionName: (name: string) => void;
  resetRegionName: () => void;
};

export const RegionStore = create(
  persist<RegionStoreType>(
    (set) => ({
      selectedRegionName: null,
      setRegionName: (name: string) => set({ selectedRegionName: name }),
      resetRegionName: () => set({ selectedRegionName: "" }),
    }),
    {
      name: "tripRegionStorage",
    },
  ),
);
