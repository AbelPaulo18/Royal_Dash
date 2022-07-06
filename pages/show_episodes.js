import React from "react";
import EpisodeCard from "../components/EpisodeCard";
import { AxiosInstance } from "../utils/BaseUrl";
import { MainBody } from "./../components/Mainbody/index";
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
        <div className="w-[90%] h-auto  ">
          Filtrar por temporada
          <div className="flex my-4 w-[80%] h-auto ">
            <div className=" w-[40%]">
              <p className="" >Id imdb da série</p>
              <input type={"text"} className="border rounded-md" />
            </div>
            <div className=" w-[40%]">
              <p>Temporada</p>
              <input type={"number"} className="border rounded-md" />
            </div>

            <button className="px-4 py-1 rounded-md border bg-slate-400" >
              search
            </button>
          </div>
        </div>

        {response.rows?.map((item) => {
          return <EpisodeCard {...item} />;
        })}
      </section>
    </MainBody>
  );
}

export default Show_episodes;
