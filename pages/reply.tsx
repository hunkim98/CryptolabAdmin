import { Group, TextInput, Title } from "@mantine/core";
import { NextPage } from "next";
import React, { useState } from "react";
import { BarChart } from "recharts";

const Reply: NextPage = () => {
  const [input, setInput] = useState<string>("");
  return (
    <Group>
      <Title>Reply</Title>
      <TextInput
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </Group>
  );
};

export default Reply;
