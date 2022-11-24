import { Col, Row, Table, Typography, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
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
import Summary from "../../components/summary/Summary";
import DailyDataSummaryWrapper from "./DailyDataSummary.styled"

interface DataType {
  key: React.Key;
  age: string;
  date: number;
  food: string;
  health: string;
  mortality: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    defaultSortOrder: "descend",
    sortDirections: ["ascend", "descend", "ascend"],
    sorter: (a, b) =>
      moment(b.date, "YYYY-MM-DD").unix() - moment(a.date, "YYYY-MM-DD").unix(),
  },
  {
    title: "Alimentation(kg)",
    dataIndex: "food",
    key: "food",
  },
  {
    title: "Eau(litre)",
    dataIndex: "water",
    key: "water",
  },
  {
    title: "Traitements",
    dataIndex: "health",
    key: "health",
  },
  {
    title: "Mortalité",
    dataIndex: "mortality",
    key: "mortality",
  },
  {
    title: "Poids Moyen(g)",
    dataIndex: "Weigth",
    key: "Weigth",
  },
];

const DailyDataSummary = () => {
  const router = useRouter();
  const [batchList, setBatchList] = useState<Record<string, any>[]>([]);
  const weigths = batchList
    .filter((item) => item.Weigth)
    .sort((a, b) => (moment(a.date).isBefore(b.date) ? -1 : 1));

  useEffect(() => {
    const fetchBatchList = async () => {
      if (!router.isReady) return;
      const data = [];
      const db = getFirestore();
      const record = await fetchRecord();
      const q = query(collection(db, `record/${router.query?.id}/batch`));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const batchData = data.map((item) => ({
        ...item,
        age:
          moment(item.date, "YYYY-MM-DD")
            .startOf("day")
            .diff(moment.unix(record?.date?.seconds).startOf("day"), "days") +
          1,
      }));
      setBatchList(batchData);
    };

    const fetchRecord = async () => {
      if (!router.isReady) return;
      const db = getFirestore();
      const q = doc(db, "record", `${router.query.id}`);
      const docSnapshot = await getDoc(q);

      return docSnapshot.data();
    };

    fetchBatchList();
  }, [router.isReady]);

  const handleRowClick = (record: any) => {
    router.push(`/add-batch-row/${router.query?.id}`);
  };

  const getTotalFood = (data: any[]) => {
    return data
      ?.map((item) => parseFloat(item.food))
      ?.reduce((prev: number, current: number) => prev + current, 0);
  };

  const getTotalMortality = (data: any[]) => {
    return data
      ?.map((item) => parseFloat(item.mortality))
      ?.reduce((prev: number, current: number) => prev + current, 0);
  };

  const getCurrentMeanWeigth = (data: any[]) => {
    if (data.length === 0) return "";
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
    <Row justify="center" style={{marginBottom: 16}}>
      <Col xs={24} md={14}>
        <Row gutter={[8, 8]}>
          <Col  xs={12}>
            <Summary
              label="Aliments(kg) consommee"
              description={`${getTotalFood(batchList)}kg `}
            />
          </Col>
          <Col  xs={12}>
            <Summary
              label="Poids Moyen(g)"
              description={`${getCurrentMeanWeigth(weigths)}g `}
            />
          </Col>
          <Col xs={12}>
            <Summary
              label="Mortalite"
              description={`${getTotalMortality(batchList)} `}
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
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record), // click row
            };
          }}
          dataSource={batchList}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </Col>
    </Row>
        </DailyDataSummaryWrapper>
    
  );
};

export default DailyDataSummary;
