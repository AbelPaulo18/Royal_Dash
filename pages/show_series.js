import React from "react";
import { useRouter } from "next/router";
import { MainBody } from "../components/Mainbody";
import { AxiosInstance } from "../utils/BaseUrl";
import MediaCardContainer from "../components/MediaCardContainer";

export async function getServerSideProps() {
  const req = await AxiosInstance.get(`series/management/all?page=1&limit=4`)
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

const Show_series = ({ result }) => {
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

export default Show_series;
