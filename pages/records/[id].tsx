import React from "react";
import DailyDataSummary from "../../widgets/records/DailyDataSummary";
import {Tabs} from "antd";
import DataInsight from "../../widgets/data-insight/DataInsight";
import useBatchList from "../../hooks/api/useBatchList";
import Expenses from "../../widgets/expenses/Expenses";


const Index = () => {
  const {batchList} = useBatchList();
  const items = [
    { label: 'Infos Journalieres', key: 'Dayly-data', children: <DailyDataSummary data={batchList} />},
    { label: 'Analyses', key: 'Analysis', children: <DataInsight data={batchList} /> },
    { label: 'Depenses', key: 'Expenses', children: <Expenses /> },
  ];
  return (
    <Tabs items={items}  />
  );
};

export default Index;


