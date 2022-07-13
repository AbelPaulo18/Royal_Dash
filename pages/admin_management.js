import React from "react";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";

import { AxiosInstance } from "../utils/BaseUrl";
import { MainBody } from "./../components/Mainbody/index";

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

  const admins = await AxiosInstance.get("admin/management/allAdmin")
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      return res;
    });

  return {
    props: {
      result: admins || null,
    },
  };
}

const Admin_management = ({ result }) => {
  const { handleSubmit, register } = useForm();

  const submit = async (data) => {
    const postData = {
      name: data.name,
      adminType: data.type,
      email: data.email,
      password: data.password,
    };
    try {
      await AxiosInstance.post(`admin/management/register`, postData).then(
        (res) => console.log(res)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  async function deleteAdmin({ id }) {
    await AxiosInstance.delete(``);
  }

  async function editAdmin({ id }) {
    console.log("Edit ");
  }

  return (
    <MainBody>
      <h1 className="text-3xl font-light mt-6 ">Administradores</h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center w-[80%] bg-white rounded-sm shadow-sm h-auto p-1 mt-5"
      >
        <h2 className="my-3 text-lg font-bold">Adiconar Admin</h2>
        <div className="w-[70%] my-2">
          <p>Nome</p>
          <input
            {...register("name", { required: true })}
            className="border rounded-md p-2 mt-1 w-[60%]"
            placeholder="nome do admin"
            type={"text"}
          />
        </div>
        <div className="w-[70%] my-2">
          <p>Email</p>
          <input
            {...register("email", { required: true })}
            className="border rounded-md p-2 mt-1 w-[60%]"
            placeholder="email"
            type={"email"}
          />
        </div>
        <div className="w-[70%] my-2">
          <p>Password</p>
          <input
            {...register("password", { required: true })}
            className="border rounded-md p-2 mt-1 w-[60%]"
            placeholder="password"
            type={"password"}
          />
        </div>
        <div className="flex items-center space-x-4 mx-2 w-[70%] my-2">
          <p>Previlégios</p>
          <select
            {...register("type", { required: true })}
            className="border rounded-md p-2 mt-1 w-[25%]"
          >
            <option value={"normal"}>Normal</option>
            <option value={"executivo"}>Executivo</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-md shadow-md  my-4 bg-slate-600   hover:bg-slate-900 text-white"
        >
          Cadastrar Admin
        </button>
      </form>

      <section className="flex flex-col items-center w-[80%] h-auto rounded-sm bg-white shadow-md mt-8 mb-8 p-2 ">
        <h1 className="text-lg font-bold mt-1 mb-3">
          Administradores cadastrados
        </h1>

        {result?.rows.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between bg-gray-100 w-[90%] mb-2 p-2 h-16"
            >
              <div className="flex w-[35%] ">{item.name}</div>
              <div className="flex w-[35%] font-bold">{item.email}</div>
              <button className="flex items-center justify-center text-center ml-3 mr-3 h-8 px-2 border rounded-md p-1 bg-red-700 text-white">
                Deletar
              </button>
              <button className="flex items-center justify-center text-center ml-3 mr-3 h-8 px-2 border rounded-md p-1 bg-slate-500 text-white">
                Edit
              </button>
            </div>
          );
        })}
      </section>
    </MainBody>
  );
};

export default Admin_management;
