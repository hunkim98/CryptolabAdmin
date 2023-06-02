import { Container, Group, Table } from "@mantine/core";
import { NextPage } from "next";
import React, { useEffect } from "react";
import ComplaintBarChart from "@/components/BarChart";
import { getReports } from "@/store/modules/report";
import { useAppDispatch } from "@/store/hooks";
import axios from "axios";

const Index: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("hi");
    axios.get("/api/reports").then((res) => console.log(res.data));
    // fetch("/api/report?device_id=1").then((res) => console.log(res));
  }, []);
  return (
    <Container fluid>
      <div>hi</div>
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
          </tr>
        </thead>
        <tbody>
          {/* {bookSales &&
            Array.from(bookSales.keys()).map((element) => {
              return (
                <tr key={element}>
                  <td>{bookSales.get(element)?.name}</td>
                  <td>{bookSales.get(element)?.price}</td>
                  <td>{bookSales.get(element)?.purchaseCount}</td>
                  <td>{bookSales.get(element)?.sales}</td>
                </tr>
              );
            })} */}
        </tbody>
      </Table>
    </Container>
  );
};

export default Index;
