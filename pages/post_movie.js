import React from "react";
import { MainBody } from "../components/Mainbody";
import PostMainMedia from "../components/PostMainMedia";
import { useRouter } from "next/router";
import { AxiosInstance } from "../utils/BaseUrl";

export async function getServerSideProps() {
  /* await axios.get(`${baseUrl}api/admin/genres/all`).then((e) => {
		//genres = e.data.mode;
		console.log("============");
		console.log(e.data);
	}); */

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

function Post_movie({ embeds, Genres }) {
  console.log(embeds);
  const { query } = useRouter();
  return (
    <MainBody>
      <PostMainMedia
        query={query}
        mediaType="movie"
        embeds={embeds}
        gen={Genres}
      />
    </MainBody>
  );
}

export default Post_movie;
