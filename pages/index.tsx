import React from 'react';
import dynamic from 'next/dynamic';
import useAllExpenses from '../hooks/api/useAllExpenses';
import useAllRecords from '../hooks/api/useAllRecords';
import useAllSales from '../hooks/api/useAllSales';
import { employeeCost, getExpenses, groupBy } from '../lib/utils';
import { Card, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import MeanWeightChart from '../widgets/dashboard/MeanWeightChart';


const RevenueCostChart = dynamic(
  () => import('../widgets/dashboard/RevenueCostChart'),
  { ssr: false }
);

const ProfitLossChart = dynamic(
  () => import('../widgets/dashboard/ProfitLossChart'),
  { ssr: false }
);
const PriceChart = dynamic(
  () => import('../widgets/dashboard/PriceChart'),
  { ssr: false }
);


const Index = () => {
  const { data: expenses } = useAllExpenses();
  const { data: records } = useAllRecords();
  const { data: sales } = useAllSales();
  const expensesByRecordId = groupBy(expenses, "recordId", "total");
  const salesByRecordId = groupBy(sales, "broodId", "amountPaid");
  const data = getExpenses(expensesByRecordId, salesByRecordId, records).sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const yearlySalesRevenue = data.filter(item => moment(item.timestamp).isSame(moment(), 'year')).reduce((acc, item) => acc + item.revenue, 0)
  const yearlySalesCost = data.filter(item => moment(item.timestamp).isSame(moment(), 'year')).reduce((acc, item) => acc + item.depenses, 0)
  const yearlyEmployeeCost = employeeCost();

  return (
    <>
    <Row gutter={16} style={{marginBottom: 16}}>
      <Col xs={12} md={8}>
        <Card>
          <Statistic
            title="Chiffre d'affaire annuel"
            value={yearlySalesRevenue}
            valueStyle={{ color: '#3f8600' }}
            suffix="Fcfa"
          />
        </Card>
      </Col>
      <Col xs={12} md={8}>
        <Card>
          <Statistic
            title="Charges Annuel"
            value={yearlySalesCost + yearlyEmployeeCost}
            valueStyle={{ color: '#e25c3b' }}
            suffix="Fcfa"
          />
        </Card>
      </Col>
      <Col xs={12} md={8}>
        <Card>
          <Statistic
            title="Masse Salariale Annuel"
            value={yearlyEmployeeCost}
            valueStyle={{ color: '#e25c3b' }}
            suffix="Fcfa"
          />
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: 16}} gutter={16}>
    <Col xs={24} md={12}><RevenueCostChart data={data}/></Col>
    <Col xs={24} md={12}><ProfitLossChart data={data} /></Col>
    </Row>
    <Row gutter={16}>
    <Col xs={24} md={12}><PriceChart data={data}/></Col>
    {/* <Col xs={24} md={12}><MeanWeightChart data={data}/></Col> */}
    </Row>
      
      
    </>
  )
};

export default Index;

