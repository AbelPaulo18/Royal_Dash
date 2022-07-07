import React from "react";
import axios from "axios";
import { AxiosInstance } from "../../utils/BaseUrl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function PostEpisode({ query, embeds, admins }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [imDbId, setImDbId] = React.useState(null);
  const [alerta, setAlerta] = React.useState(false);

  React.useEffect(() => {
    if (query?.id) {
      setValue("imdbId", query.seriesImdbid);
      setValue("title", query?.name);
      setValue("poster", query?.poster);
      setValue("seasons", query?.season);
      setValue("episodeNumber", query?.episodeNumber);
    }
  }, [, query]);

  const onSubmit = async (data) => {
    console.log(data);
    const PostData = {
      name: data.title,
      seriesImdbid: getValues("imDbId"),
      poster: data.poster,
      season: parseInt(data.seasons),
      autor: "A",
      date: data.date,
      published: 1,
      status: data.status,
    };

    /* await AxiosInstance.post(`series/management/setSeason`, PostData)
      .then((response) => {
        setAlerta(true);
        setTimeout(() => {
          setAlerta(false);
        }, 4000);
      })
      .catch((e) => {
        console.log(e.message);
        console.log(PostData);
      }); */
  };
  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col items-center  bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex items-center  overflow-y-auto w-[100%] h-screen"
      >
        <div className=" flex items-center w-[100%] h-screen pb-10 ">
          {alerta ? (
            <div
              className="absolute top-0 z-10 shadow-md right-[40%] flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <svg
                className="inline flex-shrink-0 mr-3 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRSule="evenodd"
                ></path>
              </svg>
              <div>
                <span className="font-semibold mr-1">Alerta de Sucesso!</span>
                Modifica as Informações e volte a submeter uma Temporada
              </div>
            </div>
          ) : (
            <div />
          )}

          <section className="flex flex-col items-center bg-stone-50 w-[75%] h-full overflow-y-auto ">
            <h1 className="text-3xl font-light mt-4 mb-9">Criar Episódio</h1>

            <div className="flex border-b w-[80%] h-24 ">
              <div className="flex items-center justify-center  w-[30%] h-full bg ">
                Título
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
              <div className="flex items-center border-b w-full h-20 text-xl font-bold  pl-20 ">
                Dados
              </div>
              <div className="flex border-b w-full h-24 ">
                <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                  Id imdb da Série
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("imdbId", { required: true })}
                    className="border rounded-l outline-none text-center h-10 w-[20%] shadow-sm "
                  />
                </div>
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
                  Número do Episódio
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("episodeNumber", { required: true })}
                    type="number"
                    className="border rounded-l outline-none text-center h-10 w-[20%] shadow-sm "
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

              <div className="flex py-4 border-b w-full h-20  ">
                <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                  Autor
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <select
                    {...register("admin", { required: true })}
                    name="admin"
                    className="border rounded-md outline-none text-center mr-2 h-10 w-[20%] shadow-sm text-slate-900 "
                  >
                    {admins?.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex py-4 border-b w-full h-auto  ">
                <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                  Informações do player
                </div>
                <div className="flex flex-col w-[70%] h-full justify-center items-center ">
                  <div className="flex  w-full h-full justify-center items-center mb-4">
                    <select
                      name="fala1"
                      {...register("fala1")}
                      className="border border-slate-900 rounded-md outline-none text-center mr-2 h-10 w-[25%] shadow-sm text-slate-900 "
                    >
                      <option value={null}>--------</option>
                      <option value="Dublado">Dublado</option>
                      <option value="Legendado">Legendado</option>
                    </select>
                    <select
                      name="playerLink1"
                      {...register("playerLink1")}
                      className="border border-slate-900 rounded-md outline-none text-center mr-2 h-10 w-[25%] shadow-sm text-slate-900 "
                    >
                      <option value={null}>--------</option>
                      {embeds?.map((item) => (
                        <option key={item.id} value={item.playlink}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <input
                      name="playerId1"
                      {...register("playerId1")}
                      className="border border-slate-900 rounded-md outline-none text-center mr-2 h-10 w-[40%] shadow-sm text-slate-900 "
                    />
                  </div>
                  <div className="flex  w-full h-full justify-center items-center ">
                    <select
                      name="fala2"
                      {...register("fala2")}
                      className="border border-slate-900 rounded-md outline-none text-center mr-2 h-10 w-[25%] shadow-sm text-slate-900 "
                    >
                      <option value={null}>--------</option>
                      <option value="Dublado">Dublado</option>
                      <option value="Legendado">Legendado</option>
                    </select>
                    <select
                      name="playerLink2"
                      {...register("playerLink2")}
                      className="border border-slate-900 rounded-md outline-none text-center mr-2 h-10 w-[25%] shadow-sm text-slate-900 "
                    >
                      <option value={null}>-------</option>
                      {embeds?.map((item) => (
                        <option key={item.id} value={`${item.playlink}`}>
                          {`${item.name}`}
                        </option>
                      ))}
                    </select>
                    <input
                      name="playerId2"
                      {...register("playerId2")}
                      className="border border-slate-900 rounded-md outline-none text-center mr-2 h-10 w-[40%] shadow-sm text-slate-900 "
                    />
                  </div>
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
                    handleSubmit(onSubmit);
                  }}
                  type="submit"
                  className="py-2 px-4 w-auto text-slate-900 border border-slate-900 bg-slate-100 rounded-md "
                >
                  Salvar Como Pendente
                </button>
                <button
                  onClick={() => {
                    handleSubmit(onSubmit);
                  }}
                  type="submit"
                  className="py-2 px-4 w-auto text-white border border-slate-900 bg-slate-900 rounded-md"
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

export default PostEpisode;
