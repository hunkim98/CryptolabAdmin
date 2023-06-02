import { Group, TextInput, Title, Container } from "@mantine/core";
import { NextPage } from "next";
import React, { useState } from "react";
import { BarChart } from "recharts";

const Reply: NextPage = () => {
  const [input, setInput] = useState<string>("");
  return (
    <Container fluid>
      <Title>Reply</Title>
      <TextInput
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </Container>
  );
};

export default Reply;
