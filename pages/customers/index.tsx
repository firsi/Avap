import { Col, Row, Table, Tag } from "antd";
import React from "react";
import PageHeader from "../../components/header/PageHeader";
import useCustomers from "../../hooks/api/useFetchCustomers";
import { parsePhoneNumber } from "awesome-phonenumber";

// paye, impaye, partiellement paye
// montant due, montant recue

const tags = {
    paid: <Tag bordered={false} color="green">Payé</Tag>,
    overdue: <Tag bordered={false} color="red">Impayée</Tag>,
    owing: <Tag bordered={false} color="orange">Partiellement payé</Tag>
}

const index = () => {
    const {customers} = useCustomers();

  return (
    <Row justify="center">
      <Col xs={24} sm={8}>
        <PageHeader title="Mes Clients" />

        <Table columns={COLUMNS} dataSource={customers}/>
      </Col>
    </Row>
  );
};

const COLUMNS = [
    {title: 'Nom', 
    dataIndex: 'name', 
    key: 'name', 
  },
  {title: 'Tel.', 
    dataIndex: 'phone', 
    key: 'phone',
    render: (value) => parsePhoneNumber(`${value}`, {regionCode: "ML"})?.number?.national 
  },
  {title: 'Compagnie', 
  dataIndex: 'company', 
  key: 'company', 
},
{title: 'Recentes Factures', 
dataIndex: 'invoice', 
key: 'invoice', 
render: (value) => tags.owing
},
]



export default index;
