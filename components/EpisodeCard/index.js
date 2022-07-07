import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../assets/Images/default-placeholder.png";

export default function EpisodeCard({ item }) {
  let W = 100;
  let H = 108;

  return (
    <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-start justify-center relative sm:h-28  w-full border rounded-md shadow sm:pl-2 pl-0 sm:space-y-0 space-y-4 ">
      {item.publicado === 1 ? (
        <div className=" absolute left-0 w-[6px] h-full bg-green-600 rounded-l-md " />
      ) : (
        <div className=" absolute left-0 w-[6px] h-full bg-red-700 rounded-l-md " />
      )}
      <div className=" sm:mr-6 ml-2 ">
        <Image
          src={item.image === null || " " ? defaultImage : item.image}
          width={W}
          height={H}
        />
      </div>

      <div className=" sm:h-[70%] h-auto w-full sm:w-auto flex flex-col items-center justify-between sm:mr-6 ">
        <p className=" text-slate-900 font-semibold text-lg ">Nome</p>
        <p> {item.name} </p>
      </div>

      <div className=" sm:h-[70%] h-auto w-full sm:w-auto flex flex-col items-center justify-between sm:mr-6 ">
        <p className=" text-slate-900 font-semibold text-lg ">Temporada</p>
        <p> {item.season} </p>
      </div>

      <div className=" sm:h-[70%] h-auto w-full sm:w-auto flex flex-col items-center justify-between sm:mr-6 ">
        <p className=" text-slate-900 font-semibold text-lg ">Serie</p>
        <p className=" "> {item.series} </p>
      </div>

      <div className=" sm:h-[70%] self-center h-auto w-full sm:w-auto flex flex-col items-center justify-between sm:mr-6 ">
        <Link
          href={{
            pathname: "/post_episodes",
            query: item,
          }}
          passHref
        >
          <a
            type="button"
            className="text-slate-600 hover:text-white border border-slate-900 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-900"
          >
            Editar
          </a>
        </Link>
      </div>

      <div className=" sm:h-[70%] self-center h-auto w-full sm:w-auto flex flex-col items-center justify-between sm:mr-6 ">
        <button
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
