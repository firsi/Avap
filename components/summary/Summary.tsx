import { Card, Typography } from "antd";
import SummaryCard from "./Summary.style";
import React from "react";
type SummaryProps = {
  label: string;
  description: string;
};
const Summary = ({ label, description }: SummaryProps) => {
  return (
    <SummaryCard size="small">
      <Typography.Text type="secondary" className="label">
        {label}
      </Typography.Text>
      <br />
      <Typography.Text className="description">
        <strong>{description} </strong>
      </Typography.Text>
      <br />
    </SummaryCard>
  );
};

export default Summary;
