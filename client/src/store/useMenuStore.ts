import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useResturantStore } from "./useResturantStore";
type MenuState = {
  loading: boolean;
  menu: any;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (formData: FormData,id: string, ) => Promise<void>;
};
const API_END_POINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;
export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          //update resturant
          useResturantStore.getState().addMenuToResturant(response.data.menu)
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      editMenu: async (formData, id) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          //update resturant menus
          useResturantStore.getState().updatedMenuResturant(response.data.menu)
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
