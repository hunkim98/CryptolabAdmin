// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetSingleCategoryResDto } from "@/dto/categories/res/get.single.category.res.dto";
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSingleCategoryResDto>
) {
  const query = req.query;
  const { id } = query;
  if (!id) {
    res.status(502).end();
  }
  if (req.method === "GET") {
    const response = await axios.get<GetSingleCategoryResDto>(
      `${process.env.API_URL}/category/${id}/`
    );
    // console.log(response.data);
    res.status(200).send(response.data);
  }
}
