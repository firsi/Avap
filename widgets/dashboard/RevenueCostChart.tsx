import { ResponsiveBar } from "@nivo/bar";
import { Card } from "antd";
import React from "react";
import useAllExpenses from "../../hooks/api/useAllExpenses";
import moment from "moment";
import useAllRecords from "../../hooks/api/useAllRecords";
import useAllSales from "../../hooks/api/useAllSales";
import numbro from "numbro";

const data = [
  {
    name: "Jan",
    revenue: 4000,
    cost: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    cost: 1398,
  },
  {
    name: "Mar",
    revenue: 2000,
    cost: 9800,
  },
  {
    name: "Apr",
    revenue: 2780,
    cost: 3908,
  },
  {
    name: "May",
    revenue: 1890,
    cost: 4800,
  },
  {
    name: "Jun",
    revenue: 2390,
    cost: 3800,
  },
  {
    name: "Jul",
    revenue: 3490,
    cost: 4300,
  },
  {
    name: "Aug",
    revenue: 3490,
    cost: 4300,
  },
  {
    name: "Sep",
    revenue: 3490,
    cost: 4300,
  },
  {
    name: "Oct",
    revenue: 3490,
    cost: 4300,
  },
  {
    name: "Nov",
    revenue: 3490,
    cost: 4300,
  },
  {
    name: "Dec",
    revenue: 3490,
    cost: 4300,
  },
];


type RevenueCostChartProps = {
  data: any;
}

const RevenueCostChart = ({data}:RevenueCostChartProps) => {
  

  return (
    <Card title="Revenue/Depense" bodyStyle={{padding: 8}}>
      <div style={{ height: 300 }}>
        <ResponsiveBar
          data={data}
          keys={["revenue", "depenses", ]}
          indexBy="date"
          groupMode="grouped"
          margin={{ top: 40, right: 8, bottom: 60, left: 40 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          colors={{ scheme: "nivo" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 32,
            format: (e) => moment(e).format("DD MMM"),
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: (value) => numbro(value).format({average: true, totalLength: 2}),
          }}
          valueFormat={(value) =>
            `${Number(value).toLocaleString("fr-FR", {
              minimumFractionDigits: 0,
            })} Fcfa`
          }
          
          // labelSkipWidth={12}
          // labelSkipHeight={12}
          // labelTextColor={{
          //     from: 'color',
          //     modifiers: [
          //         [
          //             'darker',
          //             1.6
          //         ]
          //     ]
          // }}
          enableLabel={false}
          legends={[
            {
              dataFrom: "keys",
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
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      </div>
    </Card>
  );
};

export default RevenueCostChart;
