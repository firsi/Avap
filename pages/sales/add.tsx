import {
  Row,
  Col,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import React, { useState } from "react";
import PageHeader from "../../components/header/PageHeader";
import { parsePhoneNumber } from "awesome-phonenumber";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import router, { useRouter } from "next/router";
import useFetchCustomers from "../../hooks/api/useFetchCustomers";
import dayjs from "dayjs";
import useFetchBreeds from "../../hooks/api/useFetchBreeds";

const { Option } = Select;

const COBB_500_ID = "TdSm4CeW9gYuTuuzXjll";

const AddSell = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {query} = useRouter();
  const { customers } = useFetchCustomers();
  const {breeds} = useFetchBreeds();

  const onFinish = async (values) => {
    setLoading(true);
    const results = {...values, date: dayjs(values.date).toDate(), broodId: query.recordId}
    delete results.totalPrice;
    

    const db = getFirestore();
    await addDoc(collection(db, "sales"), results);
    router.push(`/records/${query.recordId}`);
    message.success("Super, le vente a été enregistrée avec succès");
  };

  const onFinishFailed = (error) => {
    console.log(error);
    setLoading(false);
    message.error("Une erreur s'est produite, Re-essayez encore");
  };



  const handleValuesChange = (changedValues: any) => { 
    const priceKeys = ["price", "quantity"];
    if(priceKeys.includes(Object.keys(changedValues)[0])){
        const totalPrice = form.getFieldValue("price") * form.getFieldValue("quantity");
        form.setFieldValue("totalPrice", totalPrice);
    }
   }

  return (
    <Row justify="center">
      <Col xs={24} sm={8}>
        <PageHeader title="Cool! Une Nouvelle vente" />

        <Row>
          <Col xs={24}>
            <Form
              name="Sell"
              form={form}
              layout="vertical"
              initialValues={{date: dayjs(), breed: COBB_500_ID, price: 0, quantity:0 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={handleValuesChange}
            >
                  <Form.Item
              label="Quand as tu vendu?"
              name="date"
              rules={[
                {
                  required: true,
                  message:
                    "As tu oublie de choisir la date de vente?",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
              <Form.Item
                label="Qui t'achetes de la marchandise (ton client)"
                name="customer"
                rules={[
                  {
                    required: true,
                    message:
                      "Il semblerait que tu aies oublié de choisir le client",
                  },
                ]}
              >
                <Select allowClear>
                  {customers?.map((customer) => (
                    <Option value={customer.id}>{customer.name} ({customer.company})</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Quelle race de poulet ?"
                name="breed"
                rules={[
                  {
                    required: true,
                    message:
                      "Il semblerait que tu aies oublié de choisir la race de tes sujets",
                  },
                ]}
              >
                <Select allowClear>
                  {breeds?.map((breed) => (
                    <Option value={breed.id}>{breed.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
              label="Quelle quantité as tu vendu?(en kg)"
              name="quantity"
              rules={[
                {
                  required: true,
                  message:
                    "As tu oublié de nous dire la quantité ecoulée?",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Prix/kg"
              name="price"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              rules={[
                {
                  required: true,
                  message:
                    "Quelle est le prix de vente unitaire",
                },
              ]}
            >
              <InputNumber style={{width: "100%"}} />
            </Form.Item>

            <Form.Item
              label="Montant total (FCFA)"
              name="totalPrice"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
            >
              <InputNumber style={{width: "100%"}} disabled />
            </Form.Item>
            <Form.Item
              label="Combien as tu reçu de ton client?"
              name="amountPaid"
              rules={[
                {
                  required: true,
                  message:
                    "As tu oublié de nous dire la somme que tu as recu de tes clients",
                },
              ]}
            >
              <InputNumber  />
            </Form.Item>

              <Form.Item>
                <Button type="primary" loading={loading} htmlType="submit">
                  Enregistrez
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AddSell;
