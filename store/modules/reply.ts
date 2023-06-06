import { GetCategoriesResDto } from "@/dto/categories/res/get.categories.res.dto";
import { PatchRepliesBodyDto } from "@/dto/replies/body/patch.replies.body";
import { PostRepliesBodyDto } from "@/dto/replies/body/post.replies.body.dto";
import { GetSpecificReplyResDto } from "@/dto/replies/res/get.specific.reply.res.dto";
import { PostRepliesResDto } from "@/dto/replies/res/post.replies.res.dto";
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import { Category } from "@/models/category";
import { Report } from "@/models/report";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSpecificReply = createAsyncThunk<
  GetSpecificReplyResDto,
  number
>("reply/getSpecificReply", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<GetSpecificReplyResDto>(
      `/api/replies/${id}`
    );
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
});

export const postReply = createAsyncThunk<
  PostRepliesResDto,
  PostRepliesBodyDto
>("reply/postReply", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/replies", body);
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
});

export const patchReply = createAsyncThunk<
  PatchRepliesBodyDto,
  PatchRepliesBodyDto & { id: number }
>("reply/patchReply", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/api/replies/${body.id}`, body);
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
});

interface ReplyState {
  //   categories: Array<Category>;
  reply: GetSpecificReplyResDto | null;
}

const initialState: ReplyState = {
  //   categories: [],
  reply: null,
};

export const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postReply.fulfilled, (state, action) => {
      console.log("success");
    });
    builder.addCase(patchReply.fulfilled, (state, action) => {
      console.log("success");
    });
    builder.addCase(getSpecificReply.fulfilled, (state, action) => {
      state.reply = action.payload;
    });
  },
});

export const replyAction = replySlice.actions;
export default replySlice.reducer;
