import { Container, Group, Table } from "@mantine/core";
import { NextPage } from "next";
import React, { useEffect } from "react";
import ComplaintBarChart from "@/components/BarChart";

const Index: NextPage = () => {
  useEffect(() => {}, []);
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
