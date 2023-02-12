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
  InputNumber,
} from "antd";
// import moment, { Moment } from "moment";
import React, { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  Timestamp
} from "firebase/firestore";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import admin from "../../firebase/nodeApp";
import AddRecordContainer from "../../widgets/add-record/addRecord.style";

const EXPENSE_TYPE = [
  { label: "Poussins", value: "chicks" },
  { label: "Depense d'amortissement", value: "amortization expenses" },
  { label: "Provende", value: "food" },
  { label: "Transport", value: "transportation" },
  { label: "Produits Veterinaire", value: "health" },
];

const FOOD_TYPE = [
  { label: "Mais", value: "mais" },
  { label: "Concentre(KBC)", value: "kbc" },
  { label: "Galdus", value: "galdus" },
];

const CHICK_TYPE = [{ label: "COBB 500", value: "cobb500" }];

const AddBatchRow = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  let batchRef = useRef(data?.batch);
  // const record = JSON.parse(data?.record);
  const [isFoodType, setIsFoodType] = useState<boolean>();
  const [isChickType, setIsChickType] = useState<boolean>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onFieldsChange = (changedFields) => {
    if (changedFields[0].name[0] === "type") {
      setIsFoodType(form.getFieldValue("type") === "food");
      setIsChickType(form.getFieldValue("type") === "chicks");
    }
    if (
      changedFields[0].name[0] === "price" ||
      changedFields[0].name[0] === "quantity"
    ) {
      const total =
        form.getFieldValue("price") * form.getFieldValue("quantity");
      form.setFieldValue("total", total);
    }
  };

  const onFinish = async (values) => {
    const recordId = router.query?.record as string;
    const result = {
      ...values,
      recordId,
      date: Timestamp.fromDate(dayjs(values.date).toDate()),
    };
    const db = getFirestore();
    setLoading(true);

    try {
      await addDoc(collection(db, "expenses"), result);
      message.success("les donnees ont ete enregistres");
      form.resetFields();
      setLoading(false);
    } catch (error) {
      message.error("Une erreur s'est produite, veuillez reessayer");
      console.error(error);
      setLoading(false);
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

  console.log(form.getFieldValue("type"));

  return (
    <AddRecordContainer>
      <Row justify="center">
        <Col xs={24} md={8}>
          <Typography.Title level={4}>Ajoute une depense</Typography.Title>
          <Form
            name="expensesForm"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onFieldsChange={onFieldsChange}
            form={form}
          >
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Choisissez une date" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name="type" initialValue={EXPENSE_TYPE[1]}>
              <Select  options={EXPENSE_TYPE} />
            </Form.Item>
            {isFoodType && (
              <Form.Item label="Article" name="item" initialValue={FOOD_TYPE[0]}>
                <Select  options={FOOD_TYPE} />
              </Form.Item>
            )}
            {isChickType && (
              <Form.Item label="Article" name="item"  initialValue={CHICK_TYPE[0]}>
                <Select options={CHICK_TYPE} />
              </Form.Item>
            )}
            {!isFoodType && !isChickType && (
              <Form.Item label="Article" name="item">
                <Input type="text" />
              </Form.Item>
            )}
            <Form.Item
              label="Prix Unitaire"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Quel est le prix de l'article?",
                },
              ]}
              initialValue={0}
              style={{ display: 'inline-block', width: 'calc(50%)' }}
            >
              <InputNumber style={{width: 'calc(100% - 8px)'}} />
            </Form.Item>

            <Form.Item
              label="Quantite"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Combien d'articles achetés?",
                },
              ]}
              initialValue={0}
              style={{ display: 'inline-block', width: '50%' }}
            >
              <InputNumber style={{width: "100%"}}  />
            </Form.Item>

            <Form.Item label="Total" name="total" initialValue={0} disabled>
              <InputNumber style={{width: "100%"}}  disabled />
            </Form.Item>
            <Row gutter={8} justify="end">
              <Col>
                <Form.Item>
                  <Button loading={loading} onClick={onSubmitAnotherRecord}>
                    Ajouter un autre
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button loading={loading} type="primary" onClick={onSubmit}>
                    Terminé
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </AddRecordContainer>
  );
};

export default AddBatchRow;
