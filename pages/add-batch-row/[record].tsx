import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import moment, { Moment } from "moment";
import React, { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import admin from "../../firebase/nodeApp";
import RecordListContainer from "../../widgets/record-list/RecordList.styled";

const HEALTH_TREATMENT = [
  {label: "Anti-stress", value: "Anti-stress"},
  {label: "Vaccin Newcastle", value: "Vaccin Newcastle"},
  {label: "Vitamines", value: "Vitamines"},
  {label:  "Hepatoprotecteur", value:  "Hepatoprotecteur"},
  {label: "Vaccin Gumboro", value: "Vaccin Gumboro"},
  {label: "Anti-coccidien", value: "Anti-coccidien"},
  {label:  "Anti-parasitaire", value:  "Anti-parasitaire"},
  {label:  "Aucun", value:  "Aucun"},

];

const AddBatchRow = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  let batchRef = useRef(data?.batch);
  const record = JSON.parse(data?.record);
  const [age, setAge] = useState<number>();

  const handleDateChange = async (value) => {
    // let batch;
    const db = getFirestore();
    const q = query(
      collection(db, `record/${router.query?.record}/batch`),
      where("date", "==", value.format("YYYY-MM-DD"))
    );
    const querySnapshot = await getDocs(q);
    setAge(getNumberOfDays(record?.date));

    if (querySnapshot.empty) {
      form.setFieldsValue({
        date: value,
        mortality: null,
        food: null,
        health: null,
      });
      batchRef.current = null;
      return;
    }

    querySnapshot.forEach((doc) => {
      let newBatch = doc.data();
      form.setFieldsValue({ ...newBatch, date: moment(newBatch?.date) });
      batchRef.current = { ...newBatch, id: doc.id };
    });
  };

  const getNumberOfDays = (recordStart) => {
    const start = moment.unix(recordStart._seconds).startOf("day");
    return form.getFieldValue("date")?.startOf("day").diff(start, "day");
  };

  const getInitialDay = (recordStart) => { 
    const start = moment.unix(recordStart._seconds).startOf("day");
    moment().startOf("day").diff(start, "day");
  }

  const isWeekBeginning = (date) => getNumberOfDays(date) % 7 === 0;

  const disabledDate = (current, recordDate) => {
    return (
      current &&
      (current < moment.unix(recordDate._seconds).startOf("day") ||
        current > moment().endOf("day"))
    );
  };

  const onFinish = async (values) => {
    const recordId = router.query?.record as string;
    const result = {
      ...values,
      date: moment(values.date).format("YYYY-MM-DD"),
    };
    const db = getFirestore();

    try {
      if (!batchRef.current) {
        await addDoc(collection(db, "record", recordId, "batch"), result);
      } else {
        const batchDocRef = doc(
          db,
          "record",
          recordId,
          "batch",
          batchRef.current.id
        );
        await updateDoc(batchDocRef, result);
      }
      message.success("les donnees ont ete enregistres");
    } catch (error) {
      message.error("Une erreur s'est produite, veuillez reessayer");
      console.error(error);
    }
  };

  const onFinishFailed = (error) => {
    console.error(error);
    message.error("Une erreur s'est produite, veuillez reessayer");
  };

  const onSubmit = async () => {
    try {
      await form.validateFields();
      await onFinish(form.getFieldsValue());
      router.push(`/records/${router.query?.record}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitAnotherRecord = async () => {
    try {
      await form.validateFields();
      await onFinish(form.getFieldsValue());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} md={8}>
        <Typography.Title level={1}>Ajouter les données</Typography.Title>
        <Typography.Text type="secondary">
          Date d'arrivée:{" "}
          {moment.unix(record?.date._seconds).format("DD-MM-YYYY")}
        </Typography.Text>

        {record?.date && <Form
          name="dailyForm"
          layout="vertical"
          initialValues={{
            ...batchRef.current,
            date: moment(data?.batch?.date),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label={`Date(Jour ${age || getNumberOfDays(record?.date)})`}
            name="date"
            rules={[{ required: true, message: "Choisissez une date" }]}
            // initialValue={moment()}
          >
            <DatePicker
              onChange={handleDateChange}
              disabledDate={(current) => disabledDate(current, record?.date)}
            />
          </Form.Item>
          <Form.Item label="Mortalité" name="mortality">
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Alimentation(kg)"
            name="food"
            rules={[
              {
                required: true,
                message: "Entrez le nombre de kilos consommé aujourd'hui",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Traitement"
            name="health"
            initialValue={batchRef.current?.health || ""}
          >
            <Select options={HEALTH_TREATMENT} />
          </Form.Item>
          {isWeekBeginning(record?.date) && (
            <Form.Item
              label="Poids"
              name="Weigth"
              initialValue={batchRef.current?.health || ""}
            >
              <Input />
            </Form.Item>
          )}
          <Row gutter={8} justify="end">
            <Col>
              <Form.Item>
                <Button type="primary" onClick={onSubmitAnotherRecord}>
                  Ajouter un autre
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" onClick={onSubmit}>
                  Terminé
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>}
      </Col>
    </Row>
  );
};

export default AddBatchRow;

export const getServerSideProps = async ({ query }) => {
  const db = admin.firestore();
  const recordRef = await db.collection("record").doc(query?.record).get();
  const record = recordRef.data();
  let batch;

  const batchRef = db.collection(`record/${query?.record}/batch`);
  const snapshot = await batchRef
    .where("date", "==", moment().format("YYYY-MM-DD"))
    .get();

  if (snapshot.empty) {
    console.log("No matching documents.");
    return { props: { data: { record: JSON.stringify(record), batch: null } } };
  }

  snapshot.forEach((doc) => {
    batch = { id: doc.id, ...doc.data() };
  });

  return { props: { data: { record: JSON.stringify(record), batch } } };
};
