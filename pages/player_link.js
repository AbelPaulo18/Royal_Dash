import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainBody } from "./../components/Mainbody/index";
import { AxiosInstance } from "../utils/BaseUrl";
import { parseCookies } from "nookies";

function PlayerLinks() {
  //
  const [embedName, setEmbedName] = useState("");
  const [link, setLink] = useState("");
  const [download, setDownload] = useState("");

  //
  const [updateEmbedName, setUpdateEmbedName] = useState("");
  const [updateLinks, setUpdateLink] = useState("");
  const [updateDownload, setUpdateDownload] = useState("");

  //
  const [embeds, setEmbeds] = useState([]);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState(null);
  const [update, setUpdate] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    async function fetched() {
      const data = await AxiosInstance.get(`api/admin/embed-links`).then(
        (e) => {
          setEmbeds(e.data.links.rows);
        }
      );
    }
    fetched();
  }, [, reload]);

  useEffect(() => {
    if (update) {
      console.log("UPDAT0");
    }

    if (Delete) {
      console.log("DELETE");
      deleteLink();
    }
  }, [update, Delete]);

  async function deleteLink() {
    const req = await AxiosInstance.delete(
      `api/admin/embed-links/delete/${id}`
    ).then((res) => {
      setReload(!reload);
    });
    return req;
  }

  async function updateLink() {
    const req = await AxiosInstance.delete(
      `api/admin/embed-links/update/${id}`
    ).then((res) => {
      setReload(!reload);
    });
    return req;
  }

  const handleCreate = async () => {
    const postEmbed = {
      name: embedName,
      playlink: link,
      downloadlink: download,
    };

    await AxiosInstance.post(`api/admin/embed-links/add`, postEmbed).then(
      (e) => {
        setReload(!reload);
      }
    );
  };

  const handleUpdate = async () => {
    const postEmbed = {
      name: updateEmbedName,
      playlink: updateLinks,
      downloadlink: updateDownload,
    };

    await AxiosInstance.put(
      `api/admin/embed-links/update/${id}`,
      postEmbed
    ).then((e) => {
      setReload(!reload);
      setUpdate(false);
    });
  };

  return (
    <MainBody>
      {update ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-[#00000074] backdrop-blur-sm ">
          <div className=" flex flex-col w-1/2 h-auto  rounded-md shadow-md p-1 pl-4 pb-4 mt-10 bg-gray-500 ">
            <label
              htmlFor="embedName"
              className="text-gray-400 font-light mt-4 "
            >
              Nome do Embed
            </label>
            <input
              required
              value={updateEmbedName}
              onChange={(e) => {
                setUpdateEmbedName(e.target.value);
              }}
              name="embedName"
              type="text"
              className=" text-gray-900 border rounded h-8 w-[80%]"
            />

            <label htmlFor="link" className="text-gray-400 font-light mt-4 ">
              Link do player
            </label>
            <input
              required
              value={updateLinks}
              onChange={(e) => {
                setUpdateLink(e.target.value);
              }}
              name="link"
              type="text"
              className=" text-gray-900 border rounded h-8 w-[80%]"
            />

            <label
              htmlFor="download"
              className="text-gray-400 font-light mt-4 "
            >
              Link para download
            </label>
            <input
              required
              value={updateDownload}
              onChange={(e) => {
                setUpdateDownload(e.target.value);
                console.log(updateDownload);
              }}
              name="download"
              type="text"
              className=" text-gray-900 border rounded h-8 w-[80%]"
            />

            <div className="flex items-center justify-center space-x-4 w-full h-auto mt-10">
              <button
                onClick={() => {
                  setUpdate(false);
                }}
                className=" w-28 py-1 text-center flex justify-center px-4 font-bold border bg-slate-600 text-white rounded-md  "
              >
                Fechar
              </button>
              <button
                onClick={handleUpdate}
                className=" w-28 py-1 text-center flex justify-center px-4 font-bold border bg-white text-slate-800 rounded-md  "
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
        <label htmlFor="embedName" className="text-gray-400 font-light mt-4 ">
          Nome do Embed
        </label>
        <input
          required
          onChange={(e) => {
            setEmbedName(e.target.value);
            console.log(embedName);
          }}
          name="embedName"
          type="text"
          className=" border rounded h-8 w-[80%]"
        />

        <label htmlFor="link" className="text-gray-400 font-light mt-4 ">
          Link do player
        </label>
        <input
          required
          onChange={(e) => {
            setLink(e.target.value);
            console.log(link);
          }}
          name="link"
          type="text"
          className=" border rounded h-8 w-[80%]"
        />

        <label htmlFor="download" className="text-gray-400 font-light mt-4 ">
          Link para download
        </label>
        <input
          required
          onChange={(e) => {
            setDownload(e.target.value);
            console.log(download);
          }}
          name="download"
          type="text"
          className=" border rounded h-8 w-[80%]"
        />

        <div className="flex items-center justify-center w-full h-auto mt-2">
          <button
            onClick={handleCreate}
            className=" w-28 py-1 text-center flex justify-center px-4 font-bold border bg-slate-800 text-white rounded-md  "
          >
            Cadastrar
          </button>
        </div>
      </div>

      <div className="flex flex-col w-[60%] bg-stone-50 rounded shadow-md mt-10 p-4 h-auto  ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Player
                </th>
                <th scope="col" className="px-6 py-3">
                  Download
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
              {embeds.length >= 0 ? (
                embeds.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b dark:  dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4"> {item.playlink} </td>
                      <td className="px-6 py-4"> {item.downloadlink} </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setId(item.id);
                            setUpdateEmbedName(item.name);
                            setUpdateLink(item.playlink);
                            setUpdateDownload(item.downloadlink);
                            setUpdate(true);
                            setDelete(false);
                          }}
                          className="text-green-300"
                        >
                          Editar
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setId(item.id);
                            setDelete(true);
                            setUpdate(false);
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

export default PlayerLinks;

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
