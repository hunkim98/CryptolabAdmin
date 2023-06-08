// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PatchRepliesBodyDto } from "@/dto/replies/body/patch.replies.body";
import { PostRepliesBodyDto } from "@/dto/replies/body/post.replies.body.dto";
import { PatchRepliesResDto } from "@/dto/replies/res/patch.replies.res.dto";
import { PostRepliesResDto } from "@/dto/replies/res/post.replies.res.dto";
import { GetReportsResDto } from "@/dto/reports/res/get.reports.res.dto";
import { Reply } from "@/models/reply";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { id } = query;
  if (!id) {
    res.status(502).end();
  }

  if (req.method === "PATCH") {
    const body = req.body as PatchRepliesBodyDto;
    try {
      const response = await axios.patch<PatchRepliesResDto>(
        `${process.env.API_URL}/reply/${id}/`,
        body
      );
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).end();
    }
    // console.log(response.data);
  } else if (req.method === "GET") {
    try {
      const response = await axios.get<Reply>(
        `${process.env.API_URL}/reply/${id}/`
      );
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
