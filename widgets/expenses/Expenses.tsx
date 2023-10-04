import React from "react";
import { useRouter } from "next/router";

import moment from "moment";
import useExpenses from "../../hooks/api/useExpenses"
import 'moment/locale/fr';




import { Row, Col, Table } from "antd";
import Summary from "../../components/summary/Summary";
import ExpensesSummaryPie from "./ExpensesSummaryPie";
import { formatPieData, getChickPrice, getTotalSales } from "./utils";
import useFetchSales from "../../hooks/api/useFetchSales";
import numbro from "numbro";


const EXPENSE_TYPE = [
  { label: "Poussins", value: "chicks" },
  { label: "Depense d'amortissement", value: "amortization expenses" },
  { label: "Provende", value: "food" },
  { label: "Transport", value: "transportation" },
  { label: "Produits Veterinaire", value: "health" },
  { label: "Autres", value: "other" },
];



moment.locale('fr');
const CURRENCY_FORMAT = {
  // average: true,
  // mantissa: 2,
  // optionalMantissa: true,
  // currencyPosition: "postfix",
  currency: "fr-FR",
  spaceSeparated: true
}

const Expenses = () => {
  const { query: routerQuery } = useRouter();
  const {data} = useExpenses(routerQuery?.id as string);
  const {salesByBrood} = useFetchSales(routerQuery?.id as string);
  const totalSalesByBrood = getTotalSales(salesByBrood);

  const pieData = formatPieData(data, EXPENSE_TYPE);
  const totalExpenses = pieData.reduce(
    (prev, curr) => prev + (curr.total as number),
    0
  );

  return (
    <Row gutter={8} justify="center">
      <Col xs={24} md={12}>
        <Row >
          <Col xs={12}>
            <Summary label="Total" description={`${totalExpenses}`} />
          </Col>
          <Col xs={12}>
            <Summary
              label="Cout de Revient"
              description={`${getChickPrice(data, totalExpenses, pieData)}`}
            />
          </Col>
        </Row>
        <Row >
          <Col xs={12}>
            <Summary label="Total des ventes" description={`${totalSalesByBrood}`} />
          </Col>
         
        </Row>
        <Row>
          <Col>
            
            <ExpensesSummaryPie data={pieData} total={totalExpenses} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col>
          <Table  dataSource={data} columns={COLUMNS} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Expenses;

const COLUMNS: any = [
  {title: 'Date', 
  dataIndex: 'date', 
  key: 'date', 
  render: (value) => moment(value.seconds * 1000).format('DD MMM YY'),
  sorter: (a, b) => a.date - b.date,
  defaultSortOrder: 'ascend',
  // sortDirections: ['ascend'],
},
  {
    title: 'Article',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: 'Prix',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Quantité',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: 'Categorie',
    dataIndex: 'type',
    key: 'type',
    render: (value) => EXPENSE_TYPE.find((item) => item.value === value)?.label
  },
]
