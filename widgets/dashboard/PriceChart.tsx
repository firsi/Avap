import { ResponsiveBar } from "@nivo/bar";
import { Card } from "antd";
import React from "react";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";


type PriceChartProps = {
  data: any;
}

const test = [
    {
      "id": "price",
      "color": "hsl(209, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 211
        },
      ]
    },
    ]

const PriceChart = ({data}:PriceChartProps) => {
  const formattedData = test.map(item => {
    return {...item, data: data.map((item: any) => ({x: item.timestamp, y: item["prix moyen"]}))}
  })

  return (
    <Card title="Prix du kilo de poulet" bodyStyle={{padding: 8}}>
      <div style={{ height: 300 }}>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 60, right: 8, bottom: 60, left: 40 }}
        xScale={{ type: 'time' }}
        yScale={{
            type: "linear",
            min: 1700,
            max: 'auto',
            stacked: true,
            // reverse: false
        }}
        yFormat=" >-.2f"
        xFormat={(e) => moment(e).format("DD MMM")}
        enableGridX={false}
        colors={{ scheme: "accent" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            format: (e) => moment(e).format("DD MMM"),
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            // translateX: 120,
            translateY: 50,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
    />
      </div>
    </Card>
  );
};

export default PriceChart;
