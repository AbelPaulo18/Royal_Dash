import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import MediaCard from "../MediaCard";

function MediaCardContainer({ result, series, season }) {
  const { register, handleSubmit } = useForm();

  function searchMedia({ data }) {
    console.log(data);
  }

  const router = useRouter();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    /* router.push(
      series
        ? `show_media/?page=${page}&limit=20`
        : `show_media/?page=${page}&limit=20`
    ); */
  }, [page]);

  const handlePageChangePrevious = () => {
    if (page === 1) {
      setPage(1);
    } else if (page > 0) {
      setPage(page - 1);
    }
  };

  const handlePageChangeNext = () => {
    setPage(page + 1);
  };
  return (
    <section className="flex flex-col items-center w-full h-screen mt-8 px-8">
      <div className=" flex items-center justify-between w-full h-auto mb-2">
        <div className="flex items-center justify-evenly">
          <div className=" border-r mx-1 px-2">Todos ({result?.count})</div>
          <div className=" border-r mx-1 px-2">Publicados ()</div>
          <div className=" border-r mx-1 px-2">Pendentes ()</div>
        </div>

        <form
          onSubmit={handleSubmit(searchMedia)}
          className=" flex items-center w-[40%] justify-evenly h-10 "
        >
          <input
            {...register("search")}
            className=" w-[50%] h-full border rounded-md "
            name="search"
            type="text"
          />
          <button
            className=" min-w-[25%] h-full border-2 bg-slate-200 border-slate-900 rounded-md text-sm font-medium px-2"
            type={"submit"}
          >
            Pesquisar Posts
          </button>
        </form>
      </div>

      <div className=" flex items-center justify-between w-[100%] h-11  ">
        <div className=" flex items-center justify-between py-1 w-[40%] h-full  ">
          <select className=" border-2 rounded-md h-full w-[30%] ">
            <option value="">Todas as Datas</option>
          </select>
          <select className="border-2 rounded-md h-full w-[30%] ">
            <option value="">Todas as Datas</option>
          </select>

          <button className="w-[20%] h-full border-2 rounded-md border-slate-900 ">
            Filtrar
          </button>
        </div>
        <div className=" flex items-center justify-center w-[40%] h-full ">
          <div
            onClick={handlePageChangePrevious}
            className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </div>
          <input
            onChange={(e) => {
              let val = parseInt(e.target.value);

              if (val > 0) {
                setPage(val);
              } else {
                setPage(1);
              }
            }}
            value={page}
            type="number"
            className="w-14 text-center mr-3 border outline-none rounded-md p-1 "
            defaultValue={1}
            min={1}
          />
          <div>de {result?.count} </div>
          <div
            onClick={handlePageChangeNext}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ml-1"
          >
            Next
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <section className=" flex flex-col items-center w-full h-auto border mt-10">
        <div className=" flex items-center w-full h-14 border ">
          <div className="w-[12%] h-[60%] border-r "></div>
          <button className="w-[10%] h-[60%] border-r ">Título</button>
          <div className="w-[10%] h-[60%] border-r  flex items-center justify-center ">
            Autor
          </div>
          <div className="w-[10%] h-[60%] border-r  flex items-center justify-center ">
            Categoria
          </div>
          <div className="w-[15%] h-[60%] border-r  flex items-center justify-center ">
            Data
          </div>
          <div className="w-[10%] h-[60%] border-r  flex items-center justify-center ">
            ID imDb
          </div>
          <div className="w-[10%] h-[60%] border-r  flex items-center justify-center ">
            Visibilidade
          </div>
          <div className="w-[10%] h-[60%] border-r  flex items-center justify-center ">
            Status
          </div>
          <div className="w-[10%] h-[60%] ">Ação</div>
        </div>
        {result?.rows.map((item) => {
          return (
            <MediaCard
              key={item.id}
              result={item}
              series={series}
              season={season}
            />
          );
        })}
      </section>
    </section>
  );
}

export default MediaCardContainer;
