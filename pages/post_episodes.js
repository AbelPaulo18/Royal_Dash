import React from "react";
import { MainBody } from "../components/Mainbody";
import PostEpisode from "./../components/PostEpisode/index";
import { AxiosInstance } from "./../utils/BaseUrl";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

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

  const admins = await AxiosInstance.get("admin/management/allAdmin")
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      return res;
    });

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
      Embeds: embeds || null,
      Genres: genre || null,
      Admins: admins || null,
    },
  };
}

function Post_episodes({ Embeds, Genres, Admins }) {
  const { query } = useRouter();
  return (
    <MainBody>
      <PostEpisode
        query={query}
        embeds={Embeds?.links.rows}
        admins={Admins?.rows}
      />
    </MainBody>
  );
}

export default Post_episodes;
