import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Typography,
} from "antd";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import moment from "moment";
import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "../../context/userContext";

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();

  const profile = { username: "nextjs_user", message: "Awesome!!" };

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user);
    }
    // You also have your firebase app initialized
  }, [loadingUser, user]);

  const createUser = async () => {
    const db = getFirestore();
    await setDoc(doc(db, "profile", profile.username), profile);

    alert("User created!!");
  };

  const onFinish = async (values) => {
    const result = {
      quantity: parseInt(values.quantity),
      date: moment(values.date).toDate(),
    };
    const db = getFirestore();
    await addDoc(collection(db, "record"), result);
    message.success("Super, le registre a été créer avec succes");
  };

  const onFinishFailed = (error) => {
    console.log(error);
    message.error("Une erreur s'est produite, Re-essayez encore");
  };

  return (
    <div className="container">
      <Head>
        <title>Avap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Layout> */}
      <Row>
        <Col xs={24}>
          <Typography.Title level={1}>
            Créer un nouveau registre
          </Typography.Title>
          <Form
            name="poultryRecord"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Date et Heure d'arrivée"
              name="date"
              rules={[
                {
                  required: true,
                  message:
                    "Choisissez la date et l'heure d'arrivée des poussins",
                },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              label="Quantité"
              name="quantity"
              rules={[
                { required: true, message: "Entrez la quantite des poussins" },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Créer le registre
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {/* </Layout> */}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        } 

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

         footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          font-size: 1.5em;
          margin: 1em 0;
        }

        a {
          color: blue;
          font-size: 1.5em;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
