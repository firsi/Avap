import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
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
import { Row, Col } from "antd";
import Summary from "../../components/summary/Summary";

const EXPENSE_TYPE = [
  { label: "Poussins", value: "chicks" },
  { label: "Depense d'amortissement", value: "amortization expenses" },
  { label: "Provende", value: "food" },
  { label: "Transport", value: "transportation" },
  { label: "Produits Veterinaire", value: "health" },
];

const formatPieData = (data = []) => {
  let byType = {};
  data.map((record) => {
    if (!byType?.[record.type]) {
      byType[record.type] = 0;
    }

    byType[record.type] = byType[record.type] + record.total;
  });
  return Object.entries(byType).map(([key, value]) => ({
    label: EXPENSE_TYPE.find((item) => item.value === key).label,
    total: value,
  }));
};

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

const getChickPrice = (data, total, pieData) => {
  const amortization =
    pieData.find((item) => item.label === "Depense d'amortissement")?.total ||
    0;
  const totalWithoutExpenses = total - amortization;
  const chicks = data?.find((item) => item.type === "chicks").quantity;
  return numbro(totalWithoutExpenses / chicks).format({ mantissa: 0 });
};

const Expenses = () => {
  const { query: routerQuery } = useRouter();
  const [data, setData] = useState<Record<string, any>[]>();
  const pieData = formatPieData(data);
  const total = pieData.reduce(
    (prev, curr) => prev + (curr.total as number),
    0
  );

  useEffect(() => {
    if (!routerQuery?.id) return;
    const db = getFirestore() as any;
    const q = query(
      collection(db, "expenses"),
      where("recordId", "==", routerQuery.id)
    );

    let data = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setData(data);
    });
  }, [routerQuery.id]);

  return (
    <Row justify="center">
      <Col xs={24} md={8}>
        <Row gutter={8}>
          <Col xs={12}>
            <Summary label="Total" description={`${total}`} />
          </Col>
          <Col xs={12}>
            <Summary
              label="Cout de Revient"
              description={`${getChickPrice(data, total, pieData)}`}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ width: 300, height: 300 }}>
             {pieData.length > 0 &&  <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    // cx="50%"
                    // cy="50%"
                    // labelLine={false}
                    // outerRadius={80}
                    dataKey="total"
                  >
                    {pieData?.map((entry, index) => (
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
              </ResponsiveContainer>}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Expenses;
