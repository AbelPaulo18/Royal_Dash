import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { AxiosInstance } from "../../utils/BaseUrl";
import { Api_endPoints } from "../../utils/endpoints";
import AlertToast from "./../AlertToast/index";

function PostMedia() {
  const { query } = useRouter();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [imDbId, setImDbId] = React.useState(null);
  const [alerta, setAlerta] = React.useState(false);
  const [primaryMsg, setPrimaryMsg] = React.useState("");
  const [secondaryMsg, setSecondaryMsg] = React.useState("");
  const [generateEpisodes, setGenerateEpisodes] = React.useState(false);
  var apiKey = "k_op30951d";

  const reqEndpoints = [
    `https://api.themoviedb.org/3/find/${imDbId}?api_key=5a7e859a062b26ef282595be083f07fb&language=pt-BR&external_source=imdb_id`,
    `https://imdb-api.com/pt/API/Title/${apiKey}/${imDbId}/Images,Trailer,Ratings`,
  ];

  const handleGenerateData = async (e) => {
    e.preventDefault();
    const req = await axios
      .all(reqEndpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread((...allData) => {
          setValue("poster", allData[0]?.data.tv_results[0]?.backdrop_path);
          setValue("date", allData[0]?.data.tv_results[0]?.first_air_date);
          setValue("title", allData[0]?.data.tv_results[0]?.name);

          console.log(allData);
        })
      );
  };

  React.useEffect(() => {
    if (query?.id) {
      setValue("imdbId", query.seriesImdbid);
      setValue("title", query?.name);
      setValue("poster", query?.poster);
      setValue("seasons", query?.season);
    }
  }, [, query]);

  const onSubmitData = async (data) => {
    /* const PostData = {
      name: data.title,
      seriesImdbid: data.imdbId,
      poster: data.poster,
      season: parseInt(data.seasons),
      autor: "A",
      date: data.date,
      published: 1,
      status: data.status,
    };
     */
    const PostData = {
      name: getValues("title"),
      seriesId: imDbId,
      poster: getValues("poster"),
      season: parseInt(getValues("seasons")),
      autor: "A",
      date: getValues("date"),
      published: 1,
      status: parseInt(getValues("status")),
    };

    try {
      await AxiosInstance.post(`series/management/setSeason`, PostData)
        .then(async (response) => {
          if (!generateEpisodes)
            await AxiosInstance.post(
              `${Api_endPoints.generateSeasonEpisodes}${PostData.seriesId}&${PostData.season}`
            ).then((res) =>
              setSecondaryMsg(
                `${res.data.total} Episódios gerados, Volte a Submeter uma nova Temporada`
              )
            );
        })
        .then((response) => {
          setPrimaryMsg("Alerta de Sucesso!!");
          setAlerta(true);
          setTimeout(() => {
            setAlerta(false);
          }, 4000);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col items-center  bg-white">
      <form
        onSubmit={handleSubmit(onSubmitData)}
        className=" flex items-center  overflow-y-auto w-[100%] h-screen"
      >
        <div className=" flex items-center w-[100%] h-screen pb-10 ">
          {alerta ? (
            <AlertToast PrimaryText={primaryMsg} SecondaryText={secondaryMsg} />
          ) : (
            <div />
          )}

          <section className="flex flex-col items-center bg-stone-50 w-[75%] h-full overflow-y-auto ">
            <h1 className="text-3xl font-light mt-4 mb-9">
              Criar nova Temporada
            </h1>

            <div className="flex border-b w-[80%] h-24 ">
              <div className="flex items-center justify-center  w-[30%] h-full bg ">
                Título da Temporada
              </div>
              <div className="flex w-[60%] h-full justify-center items-center ">
                <input
                  {...register("title", { required: true })}
                  type="text"
                  className="border rounded-l outline-none text-center h-10 w-[80%] shadow-sm "
                />
              </div>
            </div>

            <div className="flex flex-col w-[95%] bg-white mt-10 h-auto border mb-8 ">
              <div className=" flex items-center w-full h-14 border-b text-xl font-bold pl-20   ">
                Informações do post
              </div>

              <div className="flex border-b w-full h-32 ">
                <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                  Gerar Dados
                  <div className="text-xs text-stone-400 w-[70%] text-center ">
                    Dados da Temporada
                  </div>
                </div>
                <div className="flex flex-col w-[60%] h-full justify-center items-center ">
                  <div className="flex  w-[100%] h-full justify-center items-center ">
                    <input
                      type="text"
                      name="Imdbid"
                      onChange={(e) => {
                        setImDbId(e.target.value);
                      }}
                      className="border rounded-l outline-none text-center h-10 w-[70%] shadow-sm "
                    />
                    <button
                      onClick={handleGenerateData}
                      className="bg-slate-800 text-white rounded-r w-auto px-8 h-10 shadow-sm "
                    >
                      Gerar
                    </button>
                  </div>
                  <div className="text-xs text-stone-400 w-[70%] text-center">
                    Coloque o ID imdb da Série{" "}
                  </div>
                </div>
              </div>
              <div className="flex items-center border-b w-full h-20 text-xl font-bold  pl-20 ">
                Dados
              </div>

              <div className="flex border-b w-full h-24 ">
                <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                  Imagem de Fundo
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("poster", { required: true })}
                    type="text"
                    className="border rounded-l outline-none text-center h-10 w-[80%] shadow-sm "
                  />
                </div>
              </div>
              <div className="flex border-b w-full h-24 ">
                <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                  Temporada
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("seasons", { required: true })}
                    type="number"
                    className="border rounded-l outline-none text-center h-10 w-[20%] shadow-sm "
                  />
                </div>
              </div>
              <div className="flex border-b w-full h-24 ">
                <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                  Data de Lançamento
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("date", { required: true })}
                    type="date"
                    className="border rounded-l outline-none text-center h-10 w-[35%] shadow-sm "
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center  w-[25%] h-full pt-10 ">
            <div className="flex flex-col items-center bg-stone-50 w-[90%] h-auto border pb-2 shadow-md">
              <div className=" w-full h-auto py-2 border-b text-center text-xl text-blue-400 ">
                Publicar
              </div>
              <div
                className="flex flex-col items-start justify-evenly px-2 h-20 000
             w-full "
              >
                <div className="flex px-2 items-center space-x-4 h-auto w-auto ">
                  <p>Status</p>
                  <select
                    className="flex px-2 h-6 w-24 border "
                    name="status"
                    {...register("status", { required: true })}
                    defaultValue={0}
                  >
                    <option value={0}> Inativado </option>
                    <option value={1}> Visível </option>
                  </select>
                </div>
              </div>
              <div className="w-full flex items-center justify-between px-4">
                <button
                  onClick={() => {
                    onSubmitData;
                  }}
                  className="py-2 px-4 w-auto text-slate-900 border border-slate-900 bg-slate-100 rounded-md "
                >
                  Salvar Como Pendente
                </button>
                <button
                  onClick={() => {
                    handleSubmit(onSubmitData);
                  }}
                  type="submit"
                  className="py-2 px-4 w-auto text-white border z-20 border-slate-900 bg-slate-900 rounded-md"
                >
                  Publicar
                </button>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}

export default PostMedia;
