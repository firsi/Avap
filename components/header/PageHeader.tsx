import { Divider, Typography } from 'antd';
import React, { ReactNode } from 'react'

type PageHeaderProps = {
    title: ReactNode;
}
const PageHeader = ({title}: PageHeaderProps) => {
  return (
    <Divider orientation="left" orientationMargin={0}>
    <Typography.Title level={5} style={{color: "#164587"}}>{title}</Typography.Title>
    </Divider>
  )
}

export default PageHeader