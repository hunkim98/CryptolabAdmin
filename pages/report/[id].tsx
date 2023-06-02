import { PostRepliesBodyDto } from "@/dto/replies/body/post.replies.body.dto";
import { GetReportItemType } from "@/dto/reports/res/get.reports.res.dto";
import { GetSpecificReportResDto } from "@/dto/reports/res/get.specific.report.res.dto";
import { useAppDispatch } from "@/store/hooks";
import { postReply } from "@/store/modules/reply";
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
  data: GetReportItemType;
}

export const getServerSideProps: GetServerSideProps<DataFromServer> = async ({
  params,
}) => {
  const id = params?.id;
  if (!id) throw new Error("No id");
  const { data } = await axios.get<GetSpecificReportResDto>(
    `${process.env.API_URL}/report/${id}/`
  );
  if (!data) throw new Error("No data");
  return { props: { data: data } };
};

const Report: NextPage<DataFromServer> = ({ data }) => {
  const [input, setInput] = useState<string>(data.replies[0]?.content || "");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const body: PostRepliesBodyDto = {
        report: data.id,
        content: input,
      };
      dispatch(postReply(body))
        .unwrap()
        .then((res) => {
          console.log(res);
          router.push(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [input, data.id, dispatch, router]
  );
  return (
    <Container fluid>
      <Title size="h2" mb={20}>
        {data.replies.length !== 0 ? "Modify Reply" : "Reply"}
      </Title>
      <Flex direction={"column"} gap={10} mb={50}>
        <Text size={20}>
          Category : <strong>{returnCategoryFromIndex(data.category)}</strong>
        </Text>
        <Text lineClamp={2}>
          {`"`}
          {data.content}
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
