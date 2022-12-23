import { Col, Row, Table, Space, Typography, Card, FloatButton } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined
} from '@ant-design/icons';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import numbro from "numbro";
import Summary from "../../components/summary/Summary";
import dayjs from "dayjs";
import {DailyDataSummary as DailyDataSummaryWrapper, Detail} from "./DailyDataSummary.styled";
import SkullCrossbones from "../../icons/skull-crossbones.svg";
import WeightScale from "../../icons/weight-scale.svg";
import Syringe from "../../icons/syringe.svg";

type DailyDataSummaryProps = {
  data: any[];
};

const getTotalMortality = (data: any[], total?: number) => {
  let mortalityInPercent = "_";
  const mortality = data
    ?.map((item) => parseFloat(item.mortality))
    ?.reduce((prev: number, current: number) => prev + current, 0);

    if(total){
      const mortalityInPercent = (mortality * 100)/total;
      return {mortality, mortalityInPercent: numbro(mortalityInPercent).format({average: true, mantissa: 1})};
    }

    return {mortality, mortalityInPercent}
    
};

const DailyDataSummary = ({ data = [] }: DailyDataSummaryProps) => { 
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>();
  const [currentAge, setCurrentAge] = useState<number>(data.length - 1);
  const slicedData = data.slice(0, currentAge);
  const {mortality, mortalityInPercent} = getTotalMortality(slicedData, quantity);

  useEffect(() => {
    if(!router.query?.id) return;
    const db = getFirestore() as any;
    const docRef = doc(db, "record", router.query.id as string);
    getDoc(docRef).then((docSnap) => {
      docSnap.exists() && setQuantity(docSnap.data().quantity);
    });
  }, [router.query.id]);

  const weigths = slicedData
    ?.filter((item) => item.Weigth)
    .sort((a, b) => (moment(a.date).isBefore(b.date) ? -1 : 1));

  const handleRowClick = (index: number) => {
    setCurrentAge(index);
  };

  const addNewRecord = () => {
    router.push(`/add-batch-row/${router.query?.id}`);
  };

  const getTotalFood = (data: any[]) => {
    return data
      ?.map((item) => parseFloat(item.food))
      ?.reduce((prev: number, current: number) => prev + current, 0);
  };

  

  const getCurrentMeanWeigth = (data: any[] = []) => {
    if (data?.length === 0) return "";
    return data[data.length - 1].Weigth;
  };

  const getWeigthIncrease = (data: any[]) => {
    if (data.length <= 1) return { kilos: "", percentage: "" };
    const currentWeigth = parseInt(data[data.length - 1]?.Weigth);
    const previousWeigth = parseInt(data[data.length - 2]?.Weigth);
    const diff = currentWeigth - previousWeigth;
    const percentage = ((diff * 100) / previousWeigth).toFixed(2);

    return { kilos: diff, percentage };
  };

  return (
    <DailyDataSummaryWrapper>
      <Row justify="center" style={{ marginBottom: 16 }}>
        <Col xs={24} md={14}>
          <Row gutter={[8, 8]}>
            <Col xs={12}>
              <Summary
                label="Aliments consommées(kg)"
                description={`${getTotalFood(slicedData)}kg `}
              />
            </Col>
            <Col xs={12}>
              <Summary
                label="Poids Moyen(g)"
                description={`${getCurrentMeanWeigth(weigths)}g `}
              />
            </Col>
            <Col xs={12}>
              <Summary
                label="Mortalité"
                description={`${mortality}(${mortalityInPercent}%)`}
              />
            </Col>
            <Col xs={12}>
              <Summary
                label="Prise de poids Moyen"
                description={`+${getWeigthIncrease(weigths)?.kilos}g(${
                  getWeigthIncrease(weigths)?.percentage
                }%) `}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={14}>
          <Table
           rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
              // console.log(selectedRowKeys);
              handleRowClick(parseInt(selectedRows[0].age, 10))
            },
          }}
            onRow={(record, index) => {
              return {
                // onClick: () => handleRowClick(record, index), // click row
              };
            }}
            expandable={{
              expandedRowRender: (record) => <>
                <Detail label="Date" value={dayjs(record.date).format("DD MMM YYYY")} />
                <Detail label="Traitements" value={record.health} />
                <Detail label="Mortalite" value={record.mortality} />
                {record.Weigth && <Detail label="Poids" value={`${record.Weigth}g`} />}
              </>,
              indentSize: 25,
              // rowExpandable: (record) => record.name !== 'Not Expandable',
              expandRowByClick: true,
              fixed: false
            }}
            dataSource={data}
            columns={columns}
            scroll={{ x: "max-content", y: 340 }}
            pagination={false}
          />
        </Col>
      </Row>
      <FloatButton icon={<PlusOutlined />} type="primary" onClick={addNewRecord} />
    </DailyDataSummaryWrapper>
  );
};

export default DailyDataSummary;

interface DataType {
  key: React.Key;
  age: string;
  date: number;
  food: string;
  health: string;
  mortality: string;
  Weigth: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  // {
  //   title: "Date",
  //   dataIndex: "date",
  //   key: "date",
  //   defaultSortOrder: "descend",
  //   sortDirections: ["ascend", "descend", "ascend"],
  //   sorter: (a, b) =>
  //     moment(b.date, "YYYY-MM-DD").unix() - moment(a.date, "YYYY-MM-DD").unix(),
  // },
  {
    title: "Prov.(kg)",
    dataIndex: "food",
    key: "food",
  },
  {
    title: "Eau(l)",
    dataIndex: "water",
    key: "water",
  },
  {
    title: "",
    dataIndex: "water",
    key: "icons",
    render: (text, record) => <Space size={4}>

    {record.mortality !=="0" && <SkullCrossbones />}
    {record.Weigth && <WeightScale />}
    {record.health.toLowerCase() !== "aucun" && <Syringe />}
    </Space> 
  },
  // {
  //   title: "Traitements",
  //   dataIndex: "health",
  //   key: "health",
  // },
  // {
  //   title: "Mortalité",
  //   dataIndex: "mortality",
  //   key: "mortality",
  // },
  // {
  //   title: "Poids(g)",
  //   dataIndex: "Weigth",
  //   key: "Weigth",
  // },
];
