
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "@/components/Base/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    "DASHBOARDS",
    {
      icon: "ActivitySquare",
      pathname: "/specialisation",
      title: "Specialisation ",
    },
 
    {
      icon: "ActivitySquare",
      pathname: "/category",
      title: "category ",
    },
    {
      icon: "ActivitySquare",
      pathname: "/instructors",
      title: "Instructors",
    },
    {
      icon: "ActivitySquare",
      pathname: "/view",
      title: "View",
    },
    {
      icon: "ActivitySquare",
      pathname: "/upload",
      title: "Upload",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
