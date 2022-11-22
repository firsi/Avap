import UserProvider from "../context/userContext";
import Layout from "../widgets/layout/Layout";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#164587",
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </UserProvider>
  );
}
