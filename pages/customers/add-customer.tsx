import { Row, Col, Button, DatePicker, Form, Input, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import PageHeader from '../../components/header/PageHeader'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import router from 'next/router'


const CreateCustomer = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.debug(values);
    
    const db = getFirestore();
    await addDoc(collection(db, "customer"), values);
    router.push(`/customers`);
    message.success("Super, le registre a été créer avec succes");
  };

  const onFinishFailed = (error) => {
    console.log(error);
    setLoading(false);
    message.error("Une erreur s'est produite, Re-essayez encore");
  };

const phoneNumberFormatter = (value) =>  {
  const pn = parsePhoneNumber(value, { regionCode: 'ML' } );
  
  return pn.number.national
}

  return (
    <Row justify="center">
    <Col xs={24} sm={8}>
      <PageHeader title="Ajouter un client" />

      <Row>
        <Col xs={24}>
          <Form
            name="CustomerRecord"
            layout="vertical"
            initialValues={{  }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item
              label="Nom et Prenoms de ton client"
              name="name"
              rules={[
                { required: true, message: "Il semblerait que tu aies oublié de taper le nom de ton client" },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              label="Dans quelle societé travaille ton client ?"
              name="company"
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              label="Le numero de tel. de ton client"
              name="phone"
              rules={[
                { required: true, message: "Il semblerait que tu n'aies pas entrer le numero de tel. de ton client" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} formatter={phoneNumberFormatter} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" loading={loading} htmlType="submit">
                Créer le registre
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Col>
  </Row>
  )
}

export default CreateCustomer
