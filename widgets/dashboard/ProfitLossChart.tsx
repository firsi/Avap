import { ResponsiveBar } from "@nivo/bar";
import { Card } from "antd";
import React from "react";
import useAllExpenses from "../../hooks/api/useAllExpenses";
import moment from "moment";
import useAllRecords from "../../hooks/api/useAllRecords";
import useAllSales from "../../hooks/api/useAllSales";
import numbro from "numbro";


type ProfitLossChartProps = {
  data: any;
}

const ProfitLossChart = ({data}:ProfitLossChartProps) => {
  

  return (
    <Card title="Profit vs Perte" bodyStyle={{padding: 8}}>
      <div style={{ height: 300 }}>
        <ResponsiveBar
          data={data}
          keys={["profit", "perte", ]}
          indexBy="date"
          margin={{ top: 60, right: 8, bottom: 60, left: 40 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          colors={[ '#61cdbb', '#e25c3b']}
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
          markers= {[
            {
                axis: 'y',
                value: 0,
                lineStyle: { strokeOpacity: 0 },
                textStyle: { fill: '#2ebca6' },
                legend: 'profit',
                legendPosition: 'top-left',
                legendOrientation: 'vertical',
                // legendOffsetY: 120,
            } as const,
            {
                axis: 'y',
                value: 0,
                lineStyle: { stroke: '#f47560', strokeWidth: 1 },
                textStyle: { fill: '#e25c3b' },
                legend: 'perte',
                legendPosition: 'bottom-left',
                legendOrientation: 'vertical',
                // legendOffsetY: 120,
            } as const,
          ]}
        />
      </div>
    </Card>
  );
};

export default ProfitLossChart;
