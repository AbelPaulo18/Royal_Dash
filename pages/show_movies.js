import React from "react";
import { useRouter } from "next/router";
import { MainBody } from "../components/Mainbody";
import { AxiosInstance } from "../utils/BaseUrl";
import MediaCardContainer from "../components/MediaCardContainer";
import { parseCookies } from "nookies";

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

  const req = await AxiosInstance.get(`film/management/all?page=1&limit=20`)
    .then((e) => {
      return e.data.results;
    })
    .then((e) => e);
  return {
    props: {
      result: req || null,
    },
  };
}

const Show_movies = ({ result }) => {
  const { route } = useRouter();
  console.log(result);
  return (
    <div>
      <MainBody>
        <h1>Media</h1>
        <MediaCardContainer result={result} />
      </MainBody>
    </div>
  );
};

export default Show_movies;
