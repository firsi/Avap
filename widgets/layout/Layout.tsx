import React, { ReactNode, useState } from "react";
import { Layout as AntLayout, Button, Drawer, Typography, Menu } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
const { Header, Content } = AntLayout;

type LayoutProps = {
  children: ReactNode;
};

const MENU_ITEMS = [
  {
    key: "record",
    label: "Registre",
    children: [
      { key: "show-record", label: "Consulter les Registres" },
      { key: "create-record", label: "Creer un nouveau registre" },
    ],
  },
  {
    key: "calculator",
    label: "Calculateur d'aliments",
  },
];

const Layout = ({ children }: LayoutProps) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "show-record":
        router.push("/");
        break;

      case "create-record":
        router.push("/records/create");
        break;

        case "calculator":
          router.push("/calculator");
          break;

      default:
        break;
    }
    setVisible(false);
  };
  return (
    <AntLayout>
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px"
        }}
      >
        <Typography.Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
          Avap
        </Typography.Title>
        <Button
          type="text"
          onClick={showDrawer}
          style={{ marginBottom: 0 }}
        >
          <Image width={15} height={15} src="/menu-icon.svg" />
        </Button>
        <Drawer placement="right" onClose={onClose} visible={visible}>
          <Menu onClick={handleMenuClick} mode="inline" items={MENU_ITEMS} />
        </Drawer>
      </Header>
      <Content style={contentStyle}>{children}</Content>
      <style jsx>{`
        .header {
          padding: 0;
        }
      `}</style>
    </AntLayout>
  );
};

export default Layout;

const contentStyle = {
    minHeight: "100vh",
    padding: "0 0.5rem",
    
  }

  