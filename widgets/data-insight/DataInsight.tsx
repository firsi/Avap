import React, { useEffect, useState } from "react";
import {Typography} from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Label,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { Col, Row, Card } from "antd";
import numbro from "numbro";

type DataInsightProps = {
  data: any[];
};
const DataInsight = ({ data = [] }: DataInsightProps) => {
  const chartData = data.map((item) => ({
    ...item,
    food: parseInt(item.food, 10),
  }));
  console.log(chartData);
  return (
    <Row gutter={[16,16]}>
      <Col xs={24} md={12}>
        <Card>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" tick={{ fontSize: 11 }} />
              <YAxis
                width={40}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) =>
                  numbro(value).format({ average: true, mantissa: 1 })
                }
              />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="food" name="aliments(kg)" fill="#82ca9d" />
              {/* <Line type="monotone" dataKey="food" stroke="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
          <div style={{textAlign: "center"}}><Typography.Text>Consommation d'aliments</Typography.Text></div>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartData.filter(item => item.mortality !=="0")}
              margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" tick={{ fontSize: 11 }} />
              <YAxis
                width={40}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) =>
                  numbro(value).format({ average: true, mantissa: 1 })
                }
              />
              <Tooltip />
              {/* <Legend /> */}
              {/* <Bar dataKey="food" fill="#8884d8" /> */}
              <Line type="monotone" dataKey="mortality" name="Mortalite" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{textAlign: "center"}}><Typography.Text>Mortalité</Typography.Text></div>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartData.filter(item => item.Weigth).map(item => ({...item, weigth: parseInt(item.Weigth, 10)}))}
              margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" tick={{ fontSize: 11 }} />
              <YAxis
                width={40}
                tick={{ fontSize: 11 }}
              />
              <Tooltip />
              {/* <Legend /> */}
              {/* <Bar dataKey="food" fill="#8884d8" /> */}
              <Line type="monotone" dataKey="weigth" name="Mortalite" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{textAlign: "center"}}><Typography.Text>Poids Moyen(g)</Typography.Text></div>
        </Card>
      </Col>
    </Row>
  );
};

export default DataInsight;

const DATA = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
