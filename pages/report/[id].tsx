import { PostRepliesBodyDto } from "@/dto/replies/body/post.replies.body.dto";
import { GetReportItemType } from "@/dto/reports/res/get.reports.res.dto";
import { GetSpecificReportResDto } from "@/dto/reports/res/get.specific.report.res.dto";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postReply } from "@/store/modules/reply";
import { getSpecificReport } from "@/store/modules/report";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BarChart, Label } from "recharts";

// interface DataFromServer {
//   data: GetReportItemType;
// }

// export const getServerSideProps: GetServerSideProps<DataFromServer> = async ({
//   params,
// }) => {
//   const id = params?.id;
//   if (!id) throw new Error("No id");
//   const { data } = await axios.get<GetSpecificReportResDto>(
//     `${process.env.API_URL}/report/${id}/`
//   );
//   if (!data) throw new Error("No data");
//   return { props: { data: data } };
// };

const Report: NextPage = () => {
  const data = useAppSelector((state) => state.report.selectedReport);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const reportId = useMemo(() => router.query.id, [router.query.id]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (reportId) {
      const id = Number(reportId);
      if (isNaN(id)) return;
      dispatch(getSpecificReport(id))
        .unwrap()
        .then((res) => {
          setInput(res.replies[0]?.content || "");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reportId, dispatch]);
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (!data) return;

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
    [input, dispatch, router, data]
  );
  if (!data) return <div>loading...</div>;
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
