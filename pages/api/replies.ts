// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostRepliesBodyDto } from "@/dto/replies/body/post.replies.body.dto";
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body as PostRepliesBodyDto;

  if (req.method === "POST") {
    try {
      const response = await axios.post<PostRepliesBodyDto>(
        `${process.env.API_URL}/reply/`,
        body
      );
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
    // console.log(response.data);
  } else {
    res.status(405).end();
  }
}
