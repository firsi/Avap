import { Col, List, Row, Typography, Divider } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import admin from "../firebase/nodeApp";
import RecordListContainer from "../widgets/record-list/RecordList.styled";

const Records = ({ data }) => {
  const records: Record<string, any>[] = JSON.parse(data).sort(
    (a, b) => moment(b.date).unix() - moment(a.date).unix()
  );
  const router = useRouter();

  useEffect(() => {
    if (!data && router.isReady) {
      router.push("/records/create");
      return null;
    }
  }, [router.isReady]);

  return (
    <RecordListContainer>
      <Row justify="center">
        <Col xs={24} sm={8}>
          <Divider orientation="left" orientationMargin={0}>
          <Typography.Title level={5} style={{color: "#164587"}}>Mes Bandes</Typography.Title>
          </Divider>
         
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
  let records = [];

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
