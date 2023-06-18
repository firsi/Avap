import React, { ReactNode, useState } from "react";
import { Layout as AntLayout, Button, Drawer, Typography, Menu } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
const { Header, Content } = AntLayout;

type LayoutProps = {
  children: ReactNode;
};

const MENU_ITEMS = [
  {
    key: "record",
    label: "Gérer mes bandes",
    children: [
      { key: "show-record", label: "Mes bandes", value: "/" },
      {
        key: "create-record",
        label: "Creer une nouvelle bande",
        value: "/records/create",
      },
    ],
  },
  {
    key: "calculator",
    label: "Calculateur d'aliments",
    value: "/calculator",
  },
  {
    key: "customers",
    label: "Gérer mes clients",
    children: [
      { key: "show-customers", label: "Mes clients", value: "/customers" },
      { key: "create-customers", label: "Ajouter un client", value: "/customers/add-customer" },
    ],
  },
];

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleMenuClick = ({ key }) => {
    // switch (key) {
    //   case "show-record":
    //     router.push("/");
    //     break;

    //   case "create-record":
    //     router.push("/records/create");
    //     break;

    //   case "calculator":
    //     router.push("/calculator");
    //     break;
    //     case "customers":
    //       router.push("/customers");
    //       break;

    //   default:
    //     break;
    // }
    const menuItem = MENU_ITEMS.map((item) =>
      item.children ? item.children : item
    )
      .flat()
      .find((item) => item.key === key);
    router.push(menuItem.value);
    setOpen(false);
  };
  return (
    <AntLayout>
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
          background: "#164587",
        }}
      >
        <Link href="/" passHref>
          <Typography.Link
            style={{
              color: "#fff",
              marginBottom: 0,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Avap
          </Typography.Link>
        </Link>
        <Button type="text" onClick={showDrawer} style={{ marginBottom: 0 }}>
          <Image width={15} height={15} src="/menu-icon.svg" />
        </Button>
        <Drawer placement="right" onClose={onClose} open={open}>
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
};
