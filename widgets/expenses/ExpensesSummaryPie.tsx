import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import uniqolor from "uniqolor";
import numbro from "numbro";

type ExpensesSummaryPieProps = {
  data: any[];
  total: number;
};

const ExpensesSummaryPie = ({ data, total }) => {
  return (
    <div style={{ width: 500, height: 300 }}>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={400}>
            <Pie
              data={data}
              // cx="50%"
              // cy="50%"
              // labelLine={false}
              // outerRadius={80}
              dataKey="total"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={uniqolor(entry.label).color}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend
              align="left"
              formatter={(value: any, entry: any) =>
                `${entry?.payload?.label} (${numbro(
                  entry?.payload?.value / total
                ).format({
                  output: "percent",
                  mantissa: 2,
                })})`
              }
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpensesSummaryPie;

const CustomTooltip = ({ payload }) => {
  return (
    <div>
      <div style={{ background: "#fff", padding: 8 }}>
        <b>{payload?.[0]?.payload?.label}</b>
        <span>
          <p className="desc">
            <small>{payload?.[0]?.payload?.total}</small>
          </p>
        </span>
      </div>
    </div>
  );
};
