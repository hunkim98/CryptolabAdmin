import { Button, Container, Group, Table } from "@mantine/core";
import { NextPage } from "next";
import React, { useCallback, useEffect } from "react";
import ComplaintBarChart from "@/components/BarChart";
import { getReports } from "@/store/modules/report";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { useRouter } from "next/router";

const Index: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reports = useAppSelector((state) => state.report.reports);
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
    <Container fluid>
      <div style={{ height: 500, width: "100%" }}>
        <ComplaintBarChart />
      </div>
      <Table style={{ marginTop: 25 }}>
        <thead>
          <tr>
            <th>category</th>
            {/* <th>title</th> */}
            <th>content</th>
            <th>created at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {reports &&
            reports.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.category}</td>
                  <td>{element.content}</td>
                  <td>{element.created_at}</td>
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
    </Container>
  );
};

export default Index;
