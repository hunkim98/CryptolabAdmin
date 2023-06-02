// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await axios.get<GetReportsResDto>(
    `${process.env.API_URL}/report/`
  );
  console.log(response.data);
  res.status(200).send(response.data);
}
