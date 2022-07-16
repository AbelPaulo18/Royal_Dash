import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { parseCookies } from "nookies";

import { MainBody } from "../components/Mainbody";
import { AxiosInstance } from "../utils/BaseUrl";
import MediaCardContainer from "../components/MediaCardContainer";

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

  const req = await AxiosInstance.get(
    `series/management/pag-seasons?page=1&limit=2`
  )
    .then((e) => {
      return e.data;
    })
    .then((e) => e.results);
  return {
    props: {
      result: req || null,
    },
  };
}

const Show_seasons = ({ result }) => {
  const { route } = useRouter();
  console.log(result);
  return (
    <div>
      <MainBody>
        <Link href={"/post_season"} passHref className="self-start">
          <div className="text-xl font-semibold cursor-pointer absolute left-80 top-10border bg-slate-800 text-white py-1 px-4 text-center rounded-md shadow-md flex justify-center items-center ">
            Adicionar Temporada
          </div>
        </Link>
        <h1>@Apl</h1>
        <MediaCardContainer result={result} series={false} season={true} />
      </MainBody>
    </div>
  );
};

export default Show_seasons;
