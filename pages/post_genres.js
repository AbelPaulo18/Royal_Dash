import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../utils/BaseUrl";
import { MainBody } from "./../components/Mainbody/index";
import { parseCookies } from "nookies";

function Genres() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [id, setId] = useState(null);

  //
  const [updateName, setUpdateName] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [update, setUpdate] = useState(false);

  const [genres, setGenres] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetched() {
      const data = await AxiosInstance.get(`api/admin/genres/all`).then((e) => {
        console.log(e.data.genres.rows);
        setGenres(e.data.genres.rows);
      });
    }
    fetched();
  }, [, reload]);

  const handleCreate = async () => {
    const postEmbed = {
      name,
      value,
    };

    console.log(postEmbed);
    await AxiosInstance.post(`api/admin/genres/add`, postEmbed).then((e) => {
      setReload(!reload);
      console.log(e.data);
    });
  };

  const handleUpdate = async () => {
    const postEmbed = {
      name: updateName,
      value: updateValue,
    };

    await AxiosInstance.put(`api/admin/genres/update/${id}`, postEmbed).then(
      (e) => {
        console.log("UPDATEDDDD");
        setReload(!reload);
        setUpdate(false);
      }
    );
  };

  return (
    <MainBody>
      {update ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-[#00000074] backdrop-blur-sm ">
          <div className=" flex flex-col w-1/2 h-auto border rounded-md shadow-md p-1 pl-4 pb-4 mt-10 bg-gray-800 ">
            <label htmlFor="name" className="text-gray-400 font-light mt-4 ">
              Gênero
            </label>
            <input
              required
              value={updateName}
              onChange={(e) => {
                setUpdateName(e.target.value);
              }}
              name="name"
              type="text"
              className=" border rounded h-8 w-[80%]"
            />

            <label htmlFor="value" className="text-gray-400 font-light mt-4 ">
              Gênero em Inglês *
            </label>
            <input
              required
              value={updateValue}
              onChange={(e) => {
                setUpdateValue(e.target.value);
              }}
              name="value"
              type="text"
              className=" border rounded h-8 w-[80%]"
            />

            <div className="flex items-center justify-center w-full h-auto space-x-2 mt-4">
              <button
                onClick={() => {
                  setUpdate(false);
                }}
                className="flex justify-center items-center w-20 py-1 px-2 border bg-white text-slate-800 rounded-md  "
              >
                Fechar
              </button>
              <button
                onClick={handleUpdate}
                className="flex justify-center items-center w-24 py-1 px-2 border bg-slate-800 text-white rounded-md  "
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className=" flex flex-col w-1/2 h-auto border rounded-md shadow-md p-1 pl-4 pb-4 mt-10 ">
        <label htmlFor="name" className="text-gray-400 font-light mt-4 ">
          Gênero
        </label>
        <input
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
          type="text"
          className=" border rounded h-8 w-[80%]"
        />

        <label htmlFor="value" className="text-gray-400 font-light mt-4 ">
          Gênero em Inglês *
        </label>
        <input
          required
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name="value"
          type="text"
          className=" border rounded h-8 w-[80%]"
        />

        <div className="flex items-center justify-center w-full h-auto mt-2">
          <button
            onClick={handleCreate}
            className=" w-20 py-1 px-2 border bg-slate-800 text-white rounded-md  "
          >
            Criar
          </button>
        </div>
      </div>

      <div className="flex flex-col w-[60%] bg-stone-50 rounded shadow-md mt-10 p-4 h-auto  ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Gênero(pt-BR)
                </th>
                <th scope="col" className="px-6 py-3">
                  Gênero(en)
                </th>
                <th scope="col" className="px-6 py-3">
                  Editar
                </th>
                <th scope="col" className="px-6 py-3">
                  Deletar
                </th>
              </tr>
            </thead>
            <tbody>
              {genres.length >= 0 ? (
                genres.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4"> {item.value} </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setUpdate(true);
                            setId(item.id);
                            setUpdateName(item.name);
                            setUpdateValue(item.value);
                          }}
                          className="text-green-300"
                        >
                          Editar
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setUpdate(false);
                            setId(item.id);
                            setUpdateName(item.name);
                            setUpdateValue(item.value);
                          }}
                          className="text-red-600"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>Empty</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainBody>
  );
}

export default Genres;

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

  return {
    props: {},
  };
}
