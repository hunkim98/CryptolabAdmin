import {
  GetReportItemType,
  GetReportsResDto,
} from "@/dto/reports/res/get.reports.res.dto";
import { GetSpecificReportResDto } from "@/dto/reports/res/get.specific.report.res.dto";
import { Report } from "@/models/report";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSpecificReport = createAsyncThunk<
  GetSpecificReportResDto,
  number
>("report/getSpecificReport", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<GetSpecificReportResDto>(
      `/api/reports/${id}`
    );
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
});

export const getReports = createAsyncThunk<
  GetReportsResDto,
  string | undefined
>("report/getReports", async (device_id, { rejectWithValue }) => {
  try {
    const response = await axios.get<GetReportsResDto>("/api/reports", {
      params: { device_id },
    });
    console.log(response);
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
});

interface ReportState {
  reports: GetReportsResDto;
  selectedReport: GetReportItemType | null;
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
      state.reports = action.payload.reverse();
    });
    builder.addCase(getSpecificReport.fulfilled, (state, action) => {
      state.selectedReport = action.payload;
    });
  },
});

export const assetActions = reportSlice.actions;
export default reportSlice.reducer;
