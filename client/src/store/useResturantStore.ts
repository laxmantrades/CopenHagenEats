import { Orders } from "@/types/orderType";
import { MenuItem, ResturantState } from "@/types/resturantTypes";
import axios from "axios";
import { toast } from "sonner";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = window.location.hostname === "copenhageneats.netlify.app"
  ? "https://copenhageneats.onrender.com/api/v1/resturant"
  : "http://localhost:8080/api/v1/resturant";

axios.defaults.withCredentials = true;
export const useResturantStore = create<ResturantState>()(
  persist(
    (set, get) => ({
      loading: false,
      resturant: null,
      searchedResturant: null,
      appliedFilter: [],
      signleResturant: null,
      resturantOrder: [],
      createResturant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ loading: false });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      getResturant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
       
          
          
          if (response.data.success) {
            set({ loading: false });
            set({ resturant: response.data.resturant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ resturant: null });
          }
          set({ loading: false });
        }
      },
      updateResturant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ loading: false });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      searchResturant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          await new Promise((resolve) => setTimeout(resolve, 1000));
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`,
            {
              headers: {
                "Content-Type": "",
              },
            }
          );
          if (response.data.success) {
            set({ loading: false, searchedResturant: response.data });
          }
        } catch (error) {
          set({ loading: false });
        }
      },
      addMenuToResturant: (menu: MenuItem) => {
        set((state: any) => ({
          resturant: state.resturant
            ? { ...state.resturant, menu: [...state.resturant.menu, menu] }
            : null,
        }));
      },
      updatedMenuResturant: (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.resturant) {
            const updatedMenuList = state.resturant.menu.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return { resturant: { ...state.resturant, menu: updatedMenuList } };
          }
          return state;
        });
      },
      setAppliedFilter: (value: string) => {
        set((state: any) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item: any) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getSingleResturant: async (resturantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${resturantId}`);
          if (response.data.success) {
            set({ signleResturant: response.data.restaurant });
          }
        } catch (error) {}
      },
      getresturantOrder: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ resturantOrder: response.data.order });
          }
        } catch (error) {
          toast.error("Error fetching restauratnOrder")
        }
      },
      updateResturantOrder: async (orderId: string,status:string) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updateOrder = get().resturantOrder.map((order: Orders) => {
              return order.id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ resturantOrder: updateOrder });
            toast.success(response.data.message)
          }
        } catch (error:any) {
          toast.error(error.response.data.message)
        }
      },
    }),

    {
      name: "resturant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
