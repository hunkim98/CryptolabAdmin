import { GetCategoriesResDto } from "@/dto/categories/res/get.categories.res.dto";
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import { Category } from "@/models/category";
import { Report } from "@/models/report";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk<GetCategoriesResDto>(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/categories");
      console.log(response);
      return response.data;
    } catch (e: any) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

interface CategoryState {
  categories: Array<Category>;
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const categoryAction = categorySlice.actions;
export default categorySlice.reducer;
