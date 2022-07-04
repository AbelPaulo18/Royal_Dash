import Image from "next/image";
import Link from "next/link";
import { AxiosInstance } from "../../utils/BaseUrl";

function MediaCard({ result, series, season }) {
  const gen = result?.genre?.split(",");
  const date = result?.updatedAt?.split("T");

  return (
    <div className="flex items-center w-full py-1 border-b  hover:bg-blue-100 h-60 group">
      <div className="w-[12%] h-full flex justify-center items-center ">
        <Image
          height={180}
          width={125}
          src={`https://image.tmdb.org/t/p/original${result?.poster}`}
          alt="Imagem"
        />
      </div>
      <div className="w-[10%] h-full  flex flex-col items-start pt-4  px-2">
        <Link
          href={{
            pathname: series ? "/post_series" : "/post_movie",
            query: result,
          }}
          passHref
        >
          <p className="text-xl text-blue-900 cursor-pointer ">
            {result?.title || result?.name}
          </p>
        </Link>
        <div className="flex flex-col items-start opacity-0  group-hover:opacity-100">
          <Link
            href={{
              pathname: series ? "/post_series" : "/post_movie",
              query: result,
            }}
            passHref
          >
            Editar
          </Link>
        </div>
      </div>
      <div className="w-[10%] h-full  flex items-center pt-2">
        {season
          ? () => {
              return (
                <div className="text-green-500">
                  <button> Gerar episodios </button>
                </div>
              );
            }
          : console.log(season)}
      </div>
      <div className="w-[10%] h-full flex flex-col items-center justify-start pt-2 text-lg ">
        {gen?.map((item, index) => (
          <Link href={"##"} passHref key={index}>
            <p className="mr-1 text-blue-500 cursor-pointer "> {item} </p>
          </Link>
        ))}
      </div>
      <div className="w-[15%] h-full  flex flex-col items-center pt-2 ">
        <p>
          {" "}
          {(result?.createdAt === result?.updatedAt) & (result?.published === 1)
            ? "Publicado"
            : "Editado"}{" "}
        </p>
        <div className="flex"> {date[0]} </div>
      </div>
      <div className="w-[10%] h-full  flex justify-center pt-2 ">
        <div className="flex justify-center items-center shadow-md bg-slate-200 w-[80%] text-center h-8">
          {result?.Imdbid}
        </div>
      </div>
      <div className="w-[10%] h-full  flex justify-center pt-2">
        {/* <select
					value={result?.status}
					className="w-[60%] h-8 rounded-md px-1 border bg-slate-200 "
				>
					<option value="1">Visível</option>
					<option value="0">Inativo</option>
				</select> */}
        <div className="text-center shadow-md w-[60%] h-8 rounded-md px-1 border bg-slate-200 ">
          {result?.status === 1 ? "Visivel" : "Inativo"}
        </div>
      </div>
      <div className="w-[10%] h-full  flex justify-center pt-2">
        {result?.published === 1 ? (
          <button className="w-[70%] h-8 shadow-md bg-slate-400 rounded-[3px] text-sm font-bold text-white ">
            Publicado
          </button>
        ) : (
          <button className="w-[70%] h-8 shadow-md bg-red-700 rounded-[3px] text-sm font-bold text-white ">
            Pendente
          </button>
        )}
      </div>
      <div className="w-[10%] h-full flex items-start">
        <button
          type="button"
          onClick={async () => {
            await AxiosInstance.delete(
              `film/management/delete/${result?.id}`
            ).then((e) => console.log("DELETED"));
          }}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default MediaCard;
