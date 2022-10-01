import { Card, Col, Form, InputNumber, Row, Typography } from "antd";
import React, {  useState } from "react";
import RecordListContainer from "../widgets/record-list/RecordList.styled";

const TOTAL_FOOD_PRE_STARTER = 0.125;
const TOTAL_FOOD_STARTER_PER_SUBJECT = 1;
const TOTAL_FOOD_GROWTH_PER_SUBJECT = 2;

const Calculator = () => {
     const [subjects, setSubjects] = useState<number>(0);
     const galdus =  TOTAL_FOOD_PRE_STARTER * subjects;
     const totalFoodStarter = TOTAL_FOOD_STARTER_PER_SUBJECT * subjects;
     const cornFoodStarter = (65 * totalFoodStarter)/100;
     const kbcFoodStarter = (35 * totalFoodStarter)/100;
     const totalGrowthFood = TOTAL_FOOD_GROWTH_PER_SUBJECT * subjects;
     const cornGrowthFood = (70 * totalGrowthFood)/100;
     const kbcGrowthFood = (30 * totalGrowthFood)/100;


  return (
    <RecordListContainer>
      <Row justify="center">
        <Col xs={24} sm={8}>
          <Typography.Title level={1}>Calculateur d'aliments</Typography.Title>
          <Card>
          <Form
            name="basic"
            layout="vertical"
          >
            <Form.Item
              label="Nombre de sujets"
              name="number"
              rules={[
                { required: true, message: "Entrez le nombre de sujet" },
              ]}
            >
              <InputNumber onChange={(value) => setSubjects(value as number)} />
            </Form.Item>
          </Form>
            <Typography.Title level={5}>0-7 jours</Typography.Title>
            <Typography.Text>Galdus: {subjects && galdus}kg</Typography.Text>
            <Typography.Title level={5}>8-21 jours</Typography.Title>
            <Typography.Text>KBC: {subjects && kbcFoodStarter}kg</Typography.Text><br />
            <Typography.Text>Mais: {subjects && cornFoodStarter}kg</Typography.Text><br />
            <Typography.Text>Total: {subjects && totalFoodStarter}kg</Typography.Text>
            <Typography.Title level={5}>21-35 jours</Typography.Title>
            <Typography.Text>KBC: {subjects && kbcGrowthFood}kg</Typography.Text><br />
            <Typography.Text>Mais: {subjects && cornGrowthFood}kg</Typography.Text><br />
            <Typography.Text>Total: {subjects && totalGrowthFood}kg</Typography.Text>
            <Typography.Title level={5}>Total</Typography.Title>
            <Typography.Text>Galdus: {subjects && galdus}kg</Typography.Text><br />
            <Typography.Text>KBC: {subjects && kbcGrowthFood + kbcFoodStarter}kg</Typography.Text><br />
            <Typography.Text>Mais: {subjects && cornGrowthFood + cornFoodStarter}kg</Typography.Text><br />
            <Typography.Text>Total: {subjects && totalGrowthFood + totalFoodStarter + galdus}kg</Typography.Text><br />
          </Card>
        </Col>
      </Row>
    </RecordListContainer>
  );
};

export default Calculator;
