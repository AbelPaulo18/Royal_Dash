import React from "react";
import EpisodeCard from "../components/EpisodeCard";
import { AxiosInstance } from "../utils/BaseUrl";
import { MainBody } from "./../components/Mainbody/index";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import AlertToast from "../components/AlertToast";
import { Api_endPoints } from "../utils/endpoints";

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
  const [data, setData] = React.useState([]); // Searched data response handler
  const [searchListener, setSearchListener] = React.useState(false); // onSearch listener
  const [alert, setAlert] = React.useState(false); // onSearch listener
  const [msg, setMsg] = React.useState(""); // onSearch listener

  const { handleSubmit, register, getValues } = useForm();

  async function SearchMedia() {
    setSearchListener(true);
    let imdbId = getValues("mediaId");
    let season = getValues("season");

    if (imdbId === "" && season === "") {
      setMsg("Campos vazios!!");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      await AxiosInstance.get(
        `${Api_endPoints.seriesRel}${imdbId}&${season}`
      ).then((res) => {
        if (res.data.message) {
          setMsg(res.data.message);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        }

        if (res.data.seasonsEpisodes)
          setData(res?.data.seasonsEpisodes.Episodes);
      });
    }
  }

  return (
    <MainBody>
      <section className=" flex items-center flex-col overflow-y-auto h-full w-[90%] pb-10 pt-6 px-6 space-y-3 ">
        {alert ? (
          <AlertToast
            PrimaryText={msg}
            SecondaryText={"Por favor volte a informar o Id e a temporada!"}
          />
        ) : (
          <div />
        )}
        <div className="w-[90%] h-auto  ">
          <h1 className="text-2xl font-semibold">Filtrar por temporada</h1>
          <div className="flex items-center justify-center my-4 w-[80%] h-auto ">
            <div className=" w-[40%]">
              <p className="text-lg font-light">Id imdb da série</p>
              <input
                {...register("mediaId", { required: true })}
                type={"text"}
                className="border rounded-md py-2 px-4"
              />
            </div>
            <div className=" w-[40%]">
              <p className="text-lg font-light">Temporada</p>
              <input
                {...register("season", { required: true })}
                type={"number"}
                className="border rounded-md py-2 px-4"
              />
            </div>

            <button
              onClick={() => {
                SearchMedia();
              }}
              className=" self-end px-4 py-2 rounded-md border hover:bg-slate-800 bg-slate-400 text-white"
            >
              search
            </button>
          </div>
        </div>

        {!searchListener
          ? response.rows?.map((item) => {
              return <EpisodeCard key={item.id} item={item} {...item} />;
            })
          : data?.map((item) => {
              return <EpisodeCard key={item.id} item={item} {...item} />;
            })}
      </section>
    </MainBody>
  );
}

export default Show_episodes;
