import React from "react";
import { MainBody } from "../components/Mainbody";
import PostMainMedia from "../components/PostMainMedia";
import { useRouter } from "next/router";
import { AxiosInstance } from "../utils/BaseUrl";
import PostMedia from "../components/PostMedia";
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

  const embeds = await AxiosInstance.get(`api/admin/embed-links`)
    .then((e) => e.data)
    .then((e) => {
      return e;
    });

  const genre = await AxiosInstance.get(`api/admin/genres/all`)
    .then((e) => e.data)
    .then((e) => {
      return e;
    });
  return {
    props: {
      Embeds: embeds,
      Genres: genre,
    },
  };
}

function Post_season({ embeds, Genres }) {
  const { query } = useRouter();
  return (
    <MainBody>
      <PostMedia />
    </MainBody>
  );
}

export default Post_season;
