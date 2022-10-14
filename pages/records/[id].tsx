import { Col, Row, Table, Typography } from "antd";
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

const Index = () => {
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
        age: moment(item.date, "YYYY-MM-DD")
          .startOf("day")
          .diff(moment.unix(record?.date?.seconds).startOf("day"), "days"),
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
    if (data.length <= 1) return {kilos: "", percentage: ''};
    const currentWeigth = parseInt(data[data.length - 1]?.Weigth);
    const previousWeigth = parseInt(data[data.length - 2]?.Weigth);
    const diff = currentWeigth - previousWeigth;
    const percentage = ((diff * 100) / previousWeigth).toFixed(2);

    return {kilos: diff, percentage};
  };
  console.log(weigths);

  return (
    <Row justify="center">
      <Col xs={24} md={12}>
      <Row justify="space-between">
          <Col>
            <Typography.Title level={1} style={{ marginBottom: 0 }}>
              Registre Journalier
            </Typography.Title>
          </Col>
      </Row>
        <Row justify="space-between">
          <Col xs={24} md={12}>
            <Typography.Text type="secondary" style={{ fontSize: 12}}>
              <strong>Nouriturre total consommée: </strong>{" "}
              {getTotalFood(batchList)}kg
            </Typography.Text>
          </Col>
          <Col xs={24} flex="none">
            <Typography.Text
              type="secondary"
              style={{ fontSize: 12, display: "block" }}
            >
              <strong>Poids Moyen(g):</strong> {getCurrentMeanWeigth(weigths)}g
            </Typography.Text>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col xs={{span: 24, order: 2}} md={{span: 12, order: 1}}>
            <Typography.Text
              type="secondary"
              style={{ fontSize: 12, marginBottom: 20, display: "block" }}
            >
              <strong>Mortalite:</strong> {getTotalMortality(batchList)}
            </Typography.Text>
          </Col>
          <Col xs={{span: 24, order: 1}} flex="none">
            <Typography.Text
              type="secondary"
              style={{ fontSize: 12, fontWeight: 600, display: "block" }}
            >
              +{getWeigthIncrease(weigths)?.kilos}g({getWeigthIncrease(weigths)?.percentage}%)
            </Typography.Text>
          </Col>
        </Row>

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
  );
};

export default Index;
