import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import auth0 from "../utils/auth0";
import Layout from "../components/layout";

export default function Home() {
  const user = undefined;
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          s<title>Next Workout</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {user ? (
              `Welcome, ${user.nickname}`
            ) : (
              <a href="/api/login">Login</a>
            )}
          </h1>

          <p className={styles.description}>
            <a href="/api/logout">Logout</a>
          </p>
        </main>

        <Link href="/exercise">
          <a className="btn">Add Exercise</a>
        </Link>

        <Link href="/workout">
          <a className="btn">Add Workout</a>
        </Link>

        <style jsx>{`
          .btn {
            display: inline-block;
             padding: 0.35em 1.2em;
             border: 0.1em solid #000000;
             margin: 0 2em;
             border-radius: 0.12em;
             box-sizing: border-box;
             text-decoration: none;
            font-size: 30px;
             font-family: "Roboto", sans-serif;
             font-weight: 300;
             color: #000000;
             text-align: center;
             transition: all 0.2s;
          }

          .btn:hover {
            color: #ffffff;
             background-color: #000000;
          }
        `}</style>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = async ({ req, res }) => {
//   const session = await auth0.getSession(req);
//   if (session) {
//     return { props: { user: session.user } };
//   } else {
//     return { props: { user: null } };
//   }
// };
