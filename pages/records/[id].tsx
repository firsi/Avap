import React, { useRef } from "react";
import DailyDataSummary from "../../widgets/records/DailyDataSummary";
import {Tabs} from "antd";
import DataInsight from "../../widgets/data-insight/DataInsight";
import useBatchList from "../../hooks/api/useBatchList";


const Index = () => {
  const {batchList} = useBatchList();
  const items = [
    { label: 'Infos Journalieres', key: 'Dayly-data', children: <DailyDataSummary />},
    { label: 'Analyses', key: 'Analysis', children: <DataInsight data={batchList} /> },
  ];
  return (
    <Tabs items={items}  />
  );
};

export default Index;


