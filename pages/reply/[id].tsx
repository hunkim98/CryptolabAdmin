import { PatchRepliesBodyDto } from "@/dto/replies/body/patch.replies.body";
import { PostRepliesBodyDto } from "@/dto/replies/body/post.replies.body.dto";
import { GetReportItemType } from "@/dto/reports/res/get.reports.res.dto";
import { GetSpecificReportResDto } from "@/dto/reports/res/get.specific.report.res.dto";
import { Reply } from "@/models/reply";
import { useAppDispatch } from "@/store/hooks";
import { patchReply, postReply } from "@/store/modules/reply";
import { returnCategoryFromIndex } from "@/utils/categoryVectorizer";
import {
  Container,
  Group,
  TextInput,
  Title,
  Text,
  Divider,
  Flex,
  Textarea,
  Button,
} from "@mantine/core";
import { Form } from "@mantine/form";
import axios from "axios";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { BarChart, Label } from "recharts";

interface DataFromServer {
  reply: Reply;
  report: GetSpecificReportResDto;
}

export const getServerSideProps: GetServerSideProps<DataFromServer> = async ({
  params,
}) => {
  const id = params?.id;
  if (!id) throw new Error("No id");
  const reply = (await axios.get<Reply>(`${process.env.API_URL}/reply/${id}/`))
    .data;
  const report = (
    await axios.get<GetSpecificReportResDto>(
      `${process.env.API_URL}/report/${reply.report}/`
    )
  ).data;
  return { props: { reply, report } };
};

const Report: NextPage<DataFromServer> = ({ reply, report }) => {
  const [input, setInput] = useState<string>(reply.content || "");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const body: PatchRepliesBodyDto = {
        content: input,
      };
      const dispatchData = { ...body, id: reply.id };
      dispatch(patchReply(dispatchData))
        .unwrap()
        .then((res) => {
          console.log(res);
          router.push(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [input, dispatch, router, reply.id]
  );
  return (
    <Container fluid>
      <Title size="h2" mb={20}>
        Modify Reply
      </Title>
      <Flex direction={"column"} gap={10} mb={50}>
        <Text size={20}>
          Category : <strong>{returnCategoryFromIndex(report.category)}</strong>
        </Text>
        <Text lineClamp={2}>
          {`"`}
          {report.content}
          {`"`}
        </Text>
      </Flex>

      <Textarea
        placeholder="Your reply"
        label="Your reply"
        style={{ marginTop: 20 }}
        mb={20}
        minRows={10}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
};

export default Report;
