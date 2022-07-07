import Head from "next/head";
import { MainBody } from "../components/Mainbody";
import { AxiosInstance } from "../utils/BaseUrl";
import { parseCookies } from "nookies";
import Center from "../components/Center";

export async function getServerSideProps(ctx) {
  const { ["royalDashboard-Admin-Token"]: Token } = parseCookies(ctx);

  if (!Token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let numFilms, numUsers, listUsers, alertState;
  await AxiosInstance.get(`film/management/all_raw`).then((e) => {
    numFilms = e.data.results.count;
  });

  await AxiosInstance.get(`api/admin/alert-mode`).then((e) => {
    alertState = e.data.mode;
  });

  await AxiosInstance.get(`api/user/allUsers`).then((e) => {
    numUsers = e.data.count;
    listUsers = e.data.rows;
  });
  return {
    props: {
      numFilms,
      numUsers,
      listUsers,
      alertState,
    },
  };
}

export default function Home({ numFilms, numUsers, listUsers, alertState }) {
  return (
    <div className="flex">
      <Head>
        <title>Royal Dashboard</title>
        <meta name="description" content="Royal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainBody>
        <Center
          movies={numFilms}
          users={0}
          usersList={listUsers}
          alertMode={alertState}
        />
      </MainBody>
    </div>
  );
}
