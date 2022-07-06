/* import { useState, useEffect } from "react";
import { AxiosInstance } from "../../utils/BaseUrl";

export default function Center({
  movies,
  users,
  series,
  usersList,
  alertMode,
}) {
  const [mode, setMode] = useState(alertMode?.state);
  const [updated, setUpdated] = useState(null);
  const [state, setState] = useState(alertMode?.state === 0 ? false : true);

  useEffect(async () => {
    async function getUp() {
      const getUpdated = await AxiosInstance.get(`api/admin/alert-mode`).then(
        (e) => {
          setUpdated(e?.data.mode);
        }
      );
      return getUpdated;
    }

    async function update() {
      const alertMode = await AxiosInstance.put(`api/admin/alert-mode/toggle`, {
        state: mode,
      }).then((e) => {
        setMode(e?.data.actual.state);
      });

      return alertMode;
    }
    update();
    getUp();
  }, [, state]);

  return (
    <div className="flex flex-col items-center w-full h-screen font-sans bg-slate-50 ">
      <div className=" w-40 h-20 flex flex-col items-center justify-center my-10 ">
        <h1 className="mb-4 text-xl font-sans font-semibold whitespace-nowrap ">
          {state ? "Modo secreto Ativado" : "Modo secreto Desativado"}
        </h1>
        {state ? (
          <select
            className="w-[70%] rounded-md py-2 border bg-green-500 text-white"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              if (mode == 0) {
                setState(true);
              } else {
                setState(false);
              }
            }}
          >
            <option value={0}>Desativado</option>
            <option value={1}>Ativo</option>
          </select>
        ) : (
          <select
            className="w-[70%] rounded-md py-2 border bg-red-600 text-white"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              if (mode == 0) {
                setState(true);
              } else {
                setState(false);
              }
            }}
          >
            <option value={0}>Desativado</option>
            <option value={1}>Ativo</option>
          </select>
        )}
      </div>

      <div className="w-[70%] h-[35%] sm:h-[30%] flex items-center justify-evenly font-bold flex-col text-sm  sm:text-2xl sm:flex-row  ">
        <button className="w-[60%] h-[27%] bg-slate-400 rounded-md shadow-md text-center flex items-center justify-center hover:text-white hover:bg-slate-700 sm:w-[28%] sm:h-[70%] transition duration-500  ">
          <p className="mr-3 font-mono text-3xl italic ">{users}</p> Usuários
        </button>
        <button className="w-[60%] h-[27%] bg-slate-400 rounded-md shadow-md text-center flex items-center justify-center hover:text-white hover:bg-slate-700 sm:w-[28%] sm:h-[70%] transition duration-500 ">
          <p className="mr-3 font-mono text-3xl italic ">{movies}</p> Filmes
        </button>
        <button className="w-[60%] h-[27%] bg-slate-400 rounded-md shadow-md text-center flex items-center justify-center hover:text-white hover:bg-slate-700 sm:w-[28%] sm:h-[70%] transition duration-500 ">
          <p className="mr-3 font-mono text-3xl italic ">{series}</p> Series
        </button>
      </div>
      <div className="w-[70%] h-[0.1px] border-b border-slate-200" />

      {usersList?.length > 0
        ? usersList?.map((item) => {
            <div>{item.data}</div>;
          })
        : "Lista De Usuários Vazia"}
    </div>
  );
}
 */
