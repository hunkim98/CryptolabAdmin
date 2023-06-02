import {
  CategryText,
  returnCategoryFromIndex,
} from "@/utils/categoryVectorizer";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface BarElement {
  date: string;
}

export type BarChartArrayElement = {
  [key in CategryText]?: number;
} & {
  date: string;
};

export default class ComplaintBarChart extends PureComponent<{
  data: Array<BarChartArrayElement>;
}> {
  constructor(props: { data: Array<BarChartArrayElement> }) {
    super(props);
  }
  static demoUrl = "https://codesandbox.io/s/stacked-bar-chart-s47i2";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            filterNull={true}
            labelStyle={{
              color: "white",
              backgroundColor: "#363636",
              padding: 0,
              margin: 0,
            }}
            wrapperStyle={{
              backgroundColor: "#363636",
              color: "white",
              border: "none",
              padding: 0,
              margin: 0,
              // border: "1px solid white",
            }}
            itemStyle={{
              backgroundColor: "#363636",
              border: "none",

              // border: "1px solid white",
            }}
          />
          <Legend />
          <Bar
            dataKey={returnCategoryFromIndex(2)}
            stackId="a"
            fill="#ffd6a5"
          />
          <Bar
            dataKey={returnCategoryFromIndex(3)}
            stackId="a"
            fill="#fdffb6"
          />
          <Bar
            dataKey={returnCategoryFromIndex(4)}
            stackId="a"
            fill="#caffbf"
          />
          <Bar
            dataKey={returnCategoryFromIndex(5)}
            stackId="a"
            fill="#9bf6ff"
          />
          <Bar
            dataKey={returnCategoryFromIndex(6)}
            stackId="a"
            fill="#a0c4ff"
          />
          <Bar
            dataKey={returnCategoryFromIndex(7)}
            stackId="a"
            fill="#bdb2ff"
          />
          <Bar
            dataKey={returnCategoryFromIndex(8)}
            stackId="a"
            fill="#ffc6ff"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
