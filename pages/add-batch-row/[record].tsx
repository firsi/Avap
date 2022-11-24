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
// import moment, { Moment } from "moment";
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
import dayjs from "dayjs";
import admin from "../../firebase/nodeApp";
import AddRecordContainer from "../../widgets/add-record/addRecord.style";

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
        water: null
      });
      batchRef.current = null;
      return;
    }

    querySnapshot.forEach((doc) => {
      let newBatch = doc.data();
      form.setFieldsValue({ ...newBatch, date: dayjs(newBatch?.date) });
      batchRef.current = { ...newBatch, id: doc.id };
    });
  };

  const getNumberOfDays = (recordStart) => {
    const start = dayjs.unix(recordStart._seconds).startOf("day");
    const currentDate = form.getFieldValue("date") || dayjs();
    return currentDate?.startOf("day").diff(start, "day") + 1;
  };

  const getInitialDay = (recordStart) => { 
    const start = dayjs.unix(recordStart._seconds).startOf("day");
    dayjs().startOf("day").diff(start, "day");
  }

  const isWeekBeginning = (date) => {
    const numberOfDays = getNumberOfDays(date);
    return numberOfDays === 1 ? true : numberOfDays % 7 === 0};

  const disabledDate = (current, recordDate) => {
    console.log(recordDate);
    return (
      current &&
      (current < dayjs.unix(recordDate._seconds).startOf("day") ||
        current > dayjs().endOf("day"))
    );
  };

  const onFinish = async (values) => {
    const recordId = router.query?.record as string;
    const result = {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DD"),
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
    <AddRecordContainer>
      <Row justify="center">
      <Col xs={24} md={8}>
        <Typography.Title level={4}>Ajouter vos données</Typography.Title>
        {record?.date && <Form
          name="dailyForm"
          layout="vertical"
          initialValues={{
            ...batchRef.current,
            date: dayjs(data?.batch?.date),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label={`Date(Jour ${age || getNumberOfDays(record?.date)})`}
            name="date"
            rules={[{ required: true, message: "Choisissez une date" }]}
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
            label="Consommation d'eau(litre)"
            name="water"
            rules={[
              {
                required: true,
                message: "Entrez la quantite d'eau consommé aujourd'hui",
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
              initialValue={batchRef.current?.Weigth || ""}
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
    </AddRecordContainer>
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
    .where("date", "==", dayjs().format("YYYY-MM-DD"))
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
