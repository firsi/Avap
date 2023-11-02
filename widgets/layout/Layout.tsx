import React, { ReactNode, useState } from "react";
import { Layout as AntLayout, Button, Drawer, Typography, Menu, Grid, Spin } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { initializeApp, getApps } from 'firebase/app'

const { Header, Content } = AntLayout;

type LayoutProps = {
  children: ReactNode;
};

const MENU_ITEMS = [
  {
    key: "dashaboard",
    label: "Tableau de bord",
    value: "/",
  },
  {
    key: "record",
    label: "Gérer mes bandes",
    children: [
      { key: "show-record", label: "Mes bandes", value: "/records" },
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
const { useBreakpoint } = Grid;

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const screens = useBreakpoint()
  const router = useRouter();

  console.debug(screens);

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
    <><AntLayout>
    <AntLayout.Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
       <Link href="/" passHref>
          <Typography.Link
            style={{
              color: "#fff",
              // marginBottom: 0,
              display: 'inline-block',
              fontSize: 24,
              fontWeight: 700,
              padding: "16px 24px"

            }}
          >
            Avap
          </Typography.Link>
        </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={MENU_ITEMS}
        onClick={handleMenuClick}
      />
    </AntLayout.Sider>
    <AntLayout>
    <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
          // background: "#164587",
          background: "#fff",
        }}
      >
        <Link href="/" passHref>
          <Typography.Link
            style={{
              color: "#164587",
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
        {/* <Drawer placement="right" onClose={onClose} open={open}>
          <Menu onClick={handleMenuClick} mode="inline" items={MENU_ITEMS} />
        </Drawer> */}
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <Content style={contentStyle}>
          {getApps().length <= 0 ? <Spin /> : children}
          </Content>
      </Content>
      {/* <AntLayout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</AntLayout.Footer> */}
    </AntLayout>
    {/* <AntLayout>
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
    </AntLayout> */}
  </AntLayout></>
    
  );
};

export default Layout;

const contentStyle = {
  minHeight: "100vh",
  padding: "0 0.5rem",
};
