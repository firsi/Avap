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
    title: "Poids Moyen",
    dataIndex: "Weigth",
    key: "Weigth",
  }
];

const Index = () => {
  const router = useRouter();
  const [batchList, setBatchList] = useState<Record<string, any>[]>([]);
  console.log(batchList)

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
    return data?.map(item => parseFloat(item.food))?.reduce(
      (prev: number, current: number) =>
        prev + current, 0
    );
  };

  const getTotalMortality = (data: any[]) => { 
    return data?.map(item => parseFloat(item.mortality))?.reduce(
      (prev: number, current: number) =>
        prev + current, 0
    );
   }


  return (
    <Row justify="center">
      <Col xs={24} md={12}>
        <Typography.Title level={1} style={{marginBottom: 0}}>Registre Journalier</Typography.Title>
        <Typography.Text type="secondary" style={{fontSize: 12}}>
          <strong>Nouriturre total consommée: </strong> {getTotalFood(batchList)}kg
        </Typography.Text><br />
        <Typography.Text type="secondary" style={{fontSize: 12, marginBottom: 20, display: "block"}}>
          <strong>Mortalite:</strong> {getTotalMortality(batchList)}
        </Typography.Text>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: () => handleRowClick(record), // click row
            };
          }}
          dataSource={batchList}
          columns={columns}
          scroll={{ x: "max-content" }}
        />
      </Col>
    </Row>
  );
};

export default Index;
