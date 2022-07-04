import React from "react";
import EpisodeCard from "../components/EpisodeCard";
import { AxiosInstance } from "../utils/BaseUrl";
import { MainBody } from "./../components/Mainbody/index";

export async function getServerSideProps() {
  const request = await AxiosInstance.get(
    `series/management/all_episodes?page=1&limit=11`
  )
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      return res.results;
    });
  return {
    props: {
      response: request,
    },
  };
}

function Show_episodes({ response }) {
  console.log(response);
  return (
    <MainBody>
      <section className=" flex items-center flex-col overflow-y-auto h-full w-[90%] pb-10 pt-6 px-6 space-y-3 ">
        {response.rows?.map((item) => {
          return <EpisodeCard {...item} />;
        })}
      </section>
    </MainBody>
  );
}

export default Show_episodes;
