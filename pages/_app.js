import UserProvider from '../context/userContext'
import Layout from "../widgets/layout/Layout"
import "antd/dist/antd.css"

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
      <Component {...pageProps} />

      </Layout>
    </UserProvider>
  )
}
