import { Reply } from "@/models/reply";
import { Report } from "@/models/report";

export interface GetReportItemType extends Report {
  replies: Array<Reply>;
}

export type GetReportsResDto = Array<GetReportItemType>;
