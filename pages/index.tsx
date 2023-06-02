import { Button, Container, Group, Pagination, Table } from "@mantine/core";
import { NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ComplaintBarChart, { BarChartArrayElement } from "@/components/BarChart";
import report, { getReports } from "@/store/modules/report";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { returnCategoryFromIndex } from "@/utils/categoryVectorizer";

const Index: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reports = useAppSelector((state) => state.report.reports);
  const [page, setPage] = useState<number>(1);

  const barchartData: Array<BarChartArrayElement> = useMemo(() => {
    // we will filter only 7 days
    const filtered = reports.filter(
      (el) =>
        new Date(el.created_at).getTime() >
        new Date().getTime() - 1000 * 60 * 60 * 24 * 7
    );
    const dateIndices: Array<string> = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * i
      ).toLocaleDateString();
      dateIndices.push(date);
    }
    // dateIndices.reverse();
    const data: Array<BarChartArrayElement> = [];
    dateIndices.reverse();
    for (let i = 0; i < dateIndices.length; i++) {
      data[i] = {
        // "Improper use of your report": 0,
        // "Trouble during payment process": 0,
        // "Problem with a purchase shown on your statement": 0,
        // "Took or threatened to take negative or legal action": 0,
        // "Struggling to pay mortgage": 0,
        // "Closing an account": 0,
        // "Getting a credit card": 0,
        date: dateIndices[i],
      };
    }
    filtered.forEach((element) => {
      const date = new Date(element.created_at).toLocaleDateString();
      if (dateIndices.includes(date)) {
        const index = dateIndices.indexOf(date);
        const categoryName = returnCategoryFromIndex(element.category);
        if (!data[index][categoryName]) {
          data[index][categoryName] = 1;
        } else {
          data[index][categoryName]! += 1;
        }
      }
    });
    return data;
  }, [reports]);
  const paginatedReports = useMemo(() => {
    return reports?.slice((page - 1) * 10, page * 10);
  }, [reports, page]);
  useEffect(() => {
    dispatch(getReports())
      .unwrap()
      .then((res) => {
        console.log(res);
      });
    // fetch("/api/report?device_id=1").then((res) => console.log(res));
  }, [dispatch]);

  const onClickReply = useCallback(
    (id: number) => {
      router.push(`/reply/${id}`);
    },
    [router]
  );

  return (
    <Container fluid style={{ alignItems: "center" }}>
      <div style={{ height: 500, width: "90%", margin: "0 auto" }}>
        <ComplaintBarChart data={barchartData} />
      </div>
      <Table style={{ marginTop: 25, height: 50, marginBottom: 25 }}>
        <thead>
          <tr>
            <th>category</th>
            {/* <th>title</th> */}
            <th>content</th>
            <th>created at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody style={{ height: 100, overflow: "auto" }}>
          {paginatedReports &&
            paginatedReports.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.category}</td>
                  <td>{element.content}</td>
                  <td>{new Date(element.created_at).toLocaleDateString()}</td>
                  <td>
                    <Button onClick={() => onClickReply(element.id)}>
                      Reply
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination total={!reports ? 1 : Math.floor(reports.length / 10)} />
    </Container>
  );
};

export default Index;
