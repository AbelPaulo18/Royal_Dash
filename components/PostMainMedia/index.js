import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AxiosInstance } from "../../utils/BaseUrl";

function PostMainMedia({ query, mediaType, embeds, gen, admins }) {
  const { handleSubmit, control, register, setValue, getValues } = useForm();

  var apiKey = "k_2fou8kzi";

  const [imDbId, setImDbId] = React.useState(
    query.id ? query.imDbId : getValues("imdbId")
  );
  const [alerta, setAlerta] = useState(false);

  const type = mediaType == "movie" ? "Filme" : "Séries";
  const movie = mediaType == "movie" ? true : false;

  const reqEndpoints = [
    `https://api.themoviedb.org/3/find/${imDbId}?api_key=5a7e859a062b26ef282595be083f07fb&language=pt-BR&external_source=imdb_id`,
    `https://imdb-api.com/pt/API/Title/${apiKey}/${imDbId}/Images,Trailer,Ratings`,
    `https://imdb-api.com/pt/API/YouTubeTrailer/${apiKey}/${imDbId}`,
  ];

  React.useEffect(() => {
    getValues("fala1") !== null && getValues("fala2") !== null
      ? setValue("fala", [getValues("fala1"), getValues("fala2")])
      : null;
    getValues("fala1") == null && getValues("fala2") !== null
      ? setValue("fala", [getValues("fala2")])
      : null;
    getValues("fala1") !== null && getValues("fala2") == null
      ? setValue("fala", [getValues("fala1")])
      : null;

    getValues("playerId1") !== null && getValues("playerId2") !== null
      ? setValue("playerId", [getValues("playerId1"), getValues("playerId2")])
      : null;
    getValues("playerId1") == null && getValues("playerId2") !== null
      ? setValue("playerId", [getValues("playerId2")])
      : null;
    getValues("playerId1") !== null && getValues("playerId2") == null
      ? setValue("playerId", [getValues("playerId1")])
      : null;

    getValues("playerLink1") !== null && getValues("playerLink2") !== null
      ? setValue("playerLink", [
          getValues("playerLink1"),
          getValues("playerLink2"),
        ])
      : null;
    getValues("playerLink1") == null && getValues("playerLink2") !== null
      ? setValue("playerLink", [getValues("playerLink2")])
      : null;
    getValues("playerLink1") !== null && getValues("playerLink2") == null
      ? setValue("playerLink", [getValues("playerLink1")])
      : null;

    if (query?.id) {
      setValue("trailerId", query.trailerId);
      setValue("imdbId", query.Imdbid);
      setValue("title", query.title);
      setValue("poster", query.poster);
      setValue("back_drop", query.back_drop);
      setValue("ratings", query.ratings);
      setValue("votes", query.votes);
      setValue("plot", query.plot);
      setValue("season", query.seasons ? query.seasons : 0);
      setValue("year", query.year);
      setValue("genres", query.genres);
      movie ? setValue("playerLink", query.playerId) : null;
    }
  }, []);

  const onSubmit = async (data) => {
    const PostData = movie
      ? {
          title: data.title,
          Imdbid: data.imdbId,
          poster: data.poster,
          back_drop: data.back_drop,
          plot: data.plot,
          ratings: data.ratings,
          votes: data.votes,
          year: data.year,
          autor: data.admin,
          duration: data.duration,
          genre:
            data.genres === null ? data.genresList?.toString(",") : data.genres,
          trailerId: data.trailerId,
          status: parseInt(data.state),
          playerId: data.playerId?.toString(","),
          playerLink: data.playerLink?.toString(","),
          sound: data.fala?.toString(","),
          published: 1,
        }
      : {
          title: data.title,
          Imdbid: imDbId,
          type: data.type,
          poster: data.poster,
          back_drop: data.back_drop,
          plot: data.plot,
          ratings: data.ratings,
          votes: data.votes,
          year: data.year,
          autor: data.autor,
          seasons: parseInt(data.seasons),
          genre:
            data.genres === null ? data.genresList?.toString(",") : data.genres,
          trailerId: data.trailerId,
          status: parseInt(data.state),
          published: 1,
        };

    query?.id
      ? await AxiosInstance.put(
          movie
            ? `film/management/update/${imDbId}`
            : `series/management/update/series/${imDbId}`,
          PostData
        )
          .then(() => {
            console.log("Update");
            setAlerta(true);
            setTimeout(() => {
              setAlerta(false);
            }, 6000);
          })
          .catch((e) => {
            console.log(e.message);
          })
      : await AxiosInstance.post(
          movie ? `film/management/register` : `series/management/register`,
          PostData
        )
          .then(() => {
            console.log("Post");
            setAlerta(true);
            setTimeout(() => {
              setAlerta(false);
            }, 6000);
          })
          .catch((e) => {
            console.log("Error");
            console.log(e.message);
            console.log(PostData);
          });
  };

  const handleGenerateData = async (e) => {
    e.preventDefault();

    const req = await axios
      .all(reqEndpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread((...allData) => {
          setValue("trailerId", allData[2].data.videoId);
          setImDbId(allData[1].data.id);
          setValue("title", allData[1].data.title);
          movie
            ? setValue(
                "back_drop",
                allData[0].data.movie_results[0]?.backdrop_path
              )
            : setValue(
                "back_drop",
                allData[0].data.tv_results[0]?.backdrop_path
              );
          movie
            ? setValue("poster", allData[0].data.movie_results[0]?.poster_path)
            : setValue("poster", allData[0].data.tv_results[0]?.poster_path);
          movie ? setValue("duration", allData[1].data.runtimeStr) : null;

          movie
            ? setValue("plot", allData[0].data.movie_results[0]?.overview)
            : setValue("plot", allData[0].data.tv_results[0]?.overview);
          setValue("ratings", allData[1].data.imDbRating);
          setValue("votes", allData[1].data.imDbRatingVotes);
          setValue("year", allData[1].data.year);
          setValue("genresList", allData[1].data.genresList);
          setValue("genres", allData[1].data.genres);
        })
      );

    console.log("Query==>");
    console.log(query.trailerId);
  };

  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col items-center  bg-white">
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
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-semibold mr-1">Alerta de Sucesso!</span>
            Modifica as Informações e volte a submeter{" "}
            {movie ? "um Filme" : "uma série"}
          </div>
        </div>
      ) : (
        <div />
      )}
      <h1 className="text-3xl font-light mt-4 mb-6">
        {" "}
        {`${query?.id ? "Editar " + type : "Gerar novo " + type}`}{" "}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto flex items-center "
      >
        <section className="w-[75%] h-auto flex flex-col items-center bg-gray-50">
          <div className="flex w-[80%] h-20 ">
            <div className="flex items-center justify-center  w-[30%] h-full ">
              Título
            </div>
            <div className="flex w-[60%] h-full justify-center items-center ">
              <input
                {...register("title", { required: true })}
                className="border rounded-l outline-none text-center h-10 w-[80%] shadow-sm "
              />
            </div>
          </div>

          {/* Movie Description... */}
          <div className="flex flex-col items-center w-full h-auto ">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Descrição do Filme ou Série
            </label>
            <textarea
              {...register("plot", { required: true })}
              id="message"
              rows="4"
              className="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          <section className="flex flex-col items-center p-1 border w-[80%] h-auto mt-8 ">
            <div className=" flex items-center w-full h-10 border-b text-xl font-bold pl-8">
              Informações adicionais
            </div>

            <div className="flex border-b w-full h-32 ">
              <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                Gerar Dados
                <div className="text-xs text-stone-400 w-[70%] text-center ">
                  Para preencher todas as inputs com dados da imdb
                </div>
              </div>
              <div className="flex flex-col w-[60%] h-full justify-center items-center ">
                <div className="flex  w-[100%] h-full justify-center items-center ">
                  <input
                    name="imdbId"
                    {...register("imdbId", { required: true })}
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
                  Coloque o ID imdb{" "}
                </div>
              </div>
            </div>

            <div className="flex items-center border-b w-full h-20 text-xl font-bold  pl-20 ">
              Imagens e Trailer
            </div>
            <div className="flex border-b w-full h-24 ">
              <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                Poster
              </div>
              <div className="flex w-[60%] h-full justify-center items-center ">
                <input
                  {...register("poster", { required: true })}
                  name="poster"
                  type="text"
                  className="border rounded-l outline-none text-center h-10 w-[80%] shadow-sm "
                />
              </div>
            </div>

            <div className="flex border-b w-full h-24 ">
              <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                Imagem de Fundo
              </div>
              <div className="flex w-[60%] h-full justify-center items-center ">
                <input
                  {...register("back_drop", { required: true })}
                  name="back_drop"
                  type="text"
                  className="border rounded-l outline-none text-center h-10 w-[80%] shadow-sm "
                />
              </div>
            </div>
            <div className="flex border-b w-full h-24 ">
              <div className="flex items-center justify-center border-r w-[30%] h-full bg ">
                Trailer do Youtube
              </div>
              <div className="flex w-[60%] h-full justify-center items-center ">
                <input
                  {...register("trailerId", { required: true })}
                  name="trailerId"
                  type="text"
                  className="border rounded-l outline-none text-center h-10 w-[80%] shadow-sm "
                />
              </div>
            </div>
            <div className="flex border-b w-full h-24 ">
              <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                Gerar Dados
                <div className="text-xs text-stone-400 w-[70%] text-center ">
                  Média/Votos
                </div>
              </div>
              <div className="flex w-[60%] h-full justify-center items-center ">
                <input
                  {...register("ratings", { required: true })}
                  name="ratings"
                  type="text"
                  className="border rounded-md outline-none bg-slate-900 text-white text-center mr-2 h-10 w-20 shadow-sm "
                />
                {" -- "}
                <input
                  {...register("votes", { required: true })}
                  type="text"
                  className="border rounded-md outline-none bg-slate-900 text-white text-center ml-2 h-10 w-20 shadow-sm "
                />
              </div>
            </div>

            {movie ? (
              <div className="flex w-full h-20 border-b ">
                <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                  Duração
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("duration", { required: true })}
                    type="text"
                    className="border rounded-md outline-none bg-slate-900 text-white text-center mr-2 h-10 w-[45%] shadow-sm "
                  />
                </div>
              </div>
            ) : (
              <div className="flex border-b w-full h-24 ">
                <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                  Gerar Dados
                  <div className="text-xs text-stone-400 w-[70%] text-center ">
                    Temporadas
                  </div>
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <input
                    {...register("seasons", { required: true })}
                    type="text"
                    className="border rounded-md outline-none bg-slate-900 text-white text-center mr-2 h-10 w-20 shadow-sm "
                  />
                </div>
              </div>
            )}
            <div className="flex border-b w-full h-20 ">
              <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                Ano de Lançamento
              </div>
              <div className="flex w-[60%] h-full justify-center items-center ">
                <input
                  {...register("year", { required: true })}
                  name="year"
                  type="text"
                  className="border rounded-md outline-none bg-slate-900 text-white text-center mr-2 h-10 w-[45%] shadow-sm "
                />
              </div>
            </div>

            {movie ? (
              <div />
            ) : (
              <div className="flex py-4 border-b w-full h-20  ">
                <div className="flex flex-col items-center justify-center border-r w-[30%] h-full bg ">
                  Tipo
                </div>
                <div className="flex w-[60%] h-full justify-center items-center ">
                  <select
                    name="type"
                    {...register("type", { required: true })}
                    className="border rounded-md outline-none text-center mr-2 h-10 w-[20%] shadow-sm text-slate-900 "
                  >
                    <option value="TvSeries">Série</option>
                    <option value="Anime">Anime</option>
                  </select>
                </div>
              </div>
            )}
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

            {movie ? (
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
            ) : (
              <div />
            )}
          </section>
        </section>
        <section className="flex flex-col items-center  w-[25%] h-full pt-10">
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
                  defaultValue={0}
                  {...register("state")}
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
                className="text-sm whitespace-nowrap py-2 px-4 w-auto text-slate-900 border border-slate-900 bg-slate-100 rounded-md "
              >
                Salvar Pendente
              </button>

              <button
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
                className="text-sm whitespace-nowrap py-2 px-4 w-auto text-white border border-slate-900 bg-slate-900 rounded-md"
              >
                Publicar
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default PostMainMedia;
