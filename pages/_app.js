import UserProvider from '../context/userContext'
import Layout from "../widgets/layout/Layout"
import 'antd/dist/reset.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
