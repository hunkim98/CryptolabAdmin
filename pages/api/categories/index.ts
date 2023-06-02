// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetCategoriesResDto } from "@/dto/categories/res/get.categories.res.dto";
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCategoriesResDto>
) {
  if (req.method === "GET") {
    const response = await axios.get<GetCategoriesResDto>(
      `${process.env.API_URL}/category/`
    );
    // console.log(response.data);
    res.status(200).send(response.data);
  } else {
    res.status(502).end();
  }
}
