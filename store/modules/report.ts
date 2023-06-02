import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import { Report } from "@/models/report";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReports = createAsyncThunk<
  GetReportsResDto,
  { device_id?: string }
>("report/getReports", async ({ device_id }, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/report", {
      params: { device_id },
    });
    console.log(response);
    return response.data;
  } catch (e: any) {
    rejectWithValue(e.response.data);
    console.log(e);
  }
});

interface ReportState {
  reports: Array<Report>;
  selectedReport: Report | null;
}

const initialState: ReportState = {
  reports: [],
  selectedReport: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReports.fulfilled, (state, action) => {
      state.reports = action.payload;
    });
  },
});

export const assetActions = reportSlice.actions;
export default reportSlice.reducer;
