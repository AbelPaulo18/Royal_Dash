import React from "react";
import { MainBody } from "../components/Mainbody";
import { AxiosInstance } from "../utils/BaseUrl";
import PostMainMedia from "./../components/PostMainMedia/index";
import { useRouter } from "next/router";
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

  /* await axios.get(`${baseUrl}api/admin/genres/all`).then((e) => {
		//genres = e.data.mode;
		console.log("============");
		console.log(e.data);
	}); */

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

function Post_series({ Embeds, Genres, Admins }) {
  const { query } = useRouter();
  return (
    <MainBody>
      <PostMainMedia
        query={query}
        mediaType="series"
        embeds={Embeds?.links.rows}
        gen={Genres?.rows}
        admins={Admins?.rows}
      />
    </MainBody>
  );
}

export default Post_series;
