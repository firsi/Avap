import { Col, List, Row, Typography, Divider, Button, Popconfirm } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {DeleteOutlined} from "@ant-design/icons"
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import PageHeader from "../../components/header/PageHeader";
import admin from "../../firebase/nodeApp";
import RecordListContainer from "../../widgets/record-list/RecordList.styled";


const Records = ({ data }: any) => {
  const parsedRecords: Record<string, any>[] = JSON.parse(data).sort(
    (a, b) => moment(b.date).unix() - moment(a.date).unix()
  );
    const [records, setRecords] = useState<any[]>(parsedRecords);
  
  const router = useRouter();

  useEffect(() => {
    if (!data && router.isReady) {
      router.push("/records/create");
      return;
    }
  }, [router.isReady]);

  const confirm = async (id: any) => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, "record", id));
      setRecords(state => state.filter(item => item.id !== id));
    }
    catch(error){
      console.log(error)
    }
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
  };

  return (
    <RecordListContainer>
      <Row justify="center">
        <Col xs={24} sm={8}>
         <PageHeader title="Mes Bandes" />
         
          {records && (
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={records}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link
                      href={`/add-batch-row/${item?.id}`}
                      key="list-loadmore-edit"
                    >
                      Ajouter des données
                    </Link>,
                    <Link href={`/records/${item?.id}`} key="display-records">
                      Consulter
                    </Link>,
                     <Popconfirm
                     title="Voulez-vous vraiment supprimer cette bande"
                     onConfirm={() => confirm(item?.id)}
                     onCancel={cancel}
                     okText="Oui"
                     cancelText="Annuler"
                   >
                     <Button type="text" danger icon={<DeleteOutlined />} />
                   </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    title={moment(item?.date).format("DD MMM YYYY")}
                    description={`quantité: ${item?.quantity}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </RecordListContainer>
  );
};

export default Records;

export const getServerSideProps = async ({ params }) => {
  const db = admin.firestore();
  const recordRef = db.collection("record");
  const snapshot = await recordRef.get();
  let records: any[] = [];

  if (snapshot.empty) {
    return { props: { data: null } };
  }

  snapshot.forEach((doc) => {
    const record = doc.data();
    records.push({
      ...record,
      id: doc.id,
      date: new Date(record.date.seconds * 1000),
    });
  });

  return { props: { data: JSON.stringify(records) } };
};
