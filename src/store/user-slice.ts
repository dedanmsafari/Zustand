import { StateCreator } from "zustand";

//?Define  what your user will look like and have that as the slice, abstract join using unions.
//?Slices are created using the StateCreator with gets the set utility that will be called.

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};

type UserAction = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  address: "",
  age: 0,
  fullName: "",
  userName: "",
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({
      address: "",
      age: 30,
      fullName: "Dedan Msafari",
      userName: "dedan@mail.com",
    });
  },
});
