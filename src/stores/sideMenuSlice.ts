
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
      pathname: "/",
      title: "Dashbaord ",
    },
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
      pathname: "/yogaCategoryRequirement",
      title: "YogaCategoryRequirement ",
    }, {
      icon: "ActivitySquare",
      pathname: "/yogaCategoryRule",
      title: "YogaCategoryRule ",
    },
    {
      icon: "ActivitySquare",
      pathname: "/instructors",
      title: "Instructors",
    },
    {
      icon: "ActivitySquare",
      pathname: "/yogaclassfrom",
      title: "Yogaclassfrom",
    },
    {
      icon: "ActivitySquare",
      pathname: "/instructorDashboard",
      title: "InstructorDashboard",
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
    {
      icon: "ActivitySquare",
      pathname: "/banner",
      title: "Banner",
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
