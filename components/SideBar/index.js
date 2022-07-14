import React, { useContext } from "react";
import { destroyCookie, parseCookies } from "nookies";
import Link from "next/link";

import { BsArrowLeftShort } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";

import { SideBarMenuItems } from "../../utils/constants";
import { useRouter } from "next/router";
import { AxiosInstance } from "../../utils/BaseUrl";
import { Api_endPoints } from "./../../utils/endpoints/index";
import { AuthContext } from "../../context/Auth";

export const SideBar = () => {
  const { ["royalDashboard-Admin-Data"]: Token } = parseCookies(); //Getting Admin Data from Local Cookies

  const { replace } = useRouter();

  const [user, setUser] = React.useState({});
  const [openSideBar, setOpenSideBar] = React.useState(true);
  const [movieSubmenuOpen, setMovieSubmenuOpen] = React.useState(false);
  const [seriesSubmenuOpen, setSeriesSubmenuOpen] = React.useState(false);

  const { setAdmin } = useContext(AuthContext);

  async function load_admin_data() {
    try {
      await AxiosInstance.get(`${Api_endPoints.getAdminById}${Token}`).then(
        (res) => {
          setUser(res.data);
          setAdmin(res.data);
        }
      );
    } catch (error) {
      console.warn(error.message);
    }
  }

  React.useEffect(() => {
    load_admin_data();
  }, []);

  const logOut = () => {
    console.log("DElete Cookies");
    destroyCookie(null, "royalDashboard-Admin-Data");
    destroyCookie(null, "royalDashboard-Admin-Token");
    replace({ pathname: "/login" });
  };

  return (
    <div
      className={`h-screen bg-slate-900 scrollbar-hide p-5 pt-8 ${
        openSideBar ? "w-72" : "w-20"
      } relative duration-300`}
    >
      <BsArrowLeftShort
        className={`text-slate-900 text-2xl absolute -right-3 top-9 border-2 border-slate-900 rounded-full bg-white cursor-pointer ${
          openSideBar && "rotate-180"
        } duration-300`}
        onClick={() => setOpenSideBar(!openSideBar)}
      />

      <div className="inline-flex text-center cursor-pointer ">
        <MdSpaceDashboard className="text-white text-4xl mr-4" />
        <h1
          className={`text-white origin-left font-light text-xl ${
            !openSideBar && "scale-0"
          } duration-300`}
        >
          Royal Dashboard
        </h1>
      </div>

      <div className="flex flex-col align-center justify-center w-full h-auto mb-6 ">
        <div
          className={`${openSideBar ? "w-20" : "w-10"} ${
            openSideBar ? "h-20" : "h-10"
          } rounded-full bg-[#fff3] mt-4 self-center duration-200 `}
        >
          <div></div>
        </div>
        <h1
          className={`text-center mt-1 italic font-extralight text-white text-sm ${
            !openSideBar && "hidden"
          } duration-300 `}
        >
          {user?.name}
        </h1>
        <h1
          className={`text-center mt-1 italic font-extralight text-white text-sm ${
            !openSideBar && "hidden"
          } duration-300 `}
        >
          {user?.email}
        </h1>
      </div>

      {SideBarMenuItems.map((item, index) => {
        let status =
          item.type === "movie" ? movieSubmenuOpen : seriesSubmenuOpen;

        return (
          <span key={index}>
            {item.name === "logOut" ? (
              <button
                onClick={logOut}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#fff1] rounded-md ${
                  item.sub ? "mt-6" : "mt-2"
                }`}
              >
                <span className="text-2xl float-left">
                  {item.icon ? <item.icon /> : <MdSpaceDashboard />}
                </span>

                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !openSideBar && "hidden"
                  }`}
                >
                  {item.name}
                </span>
                {item.submenu && openSideBar && (
                  <BiChevronDown
                    className={`${status && "rotate-180"}`}
                    onClick={() => {
                      item.type === "movie"
                        ? setMovieSubmenuOpen(!movieSubmenuOpen)
                        : setSeriesSubmenuOpen(!seriesSubmenuOpen);
                    }}
                  />
                )}
              </button>
            ) : (
              <Link passHref href={item.route}>
                <li
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#fff1] rounded-md ${
                    item.sub ? "mt-6" : "mt-2"
                  }`}
                >
                  <span className="text-2xl float-left">
                    {item.icon ? <item.icon /> : <MdSpaceDashboard />}
                  </span>

                  <span
                    className={`text-base font-medium flex-1 duration-200 ${
                      !openSideBar && "hidden"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.submenu && openSideBar && (
                    <BiChevronDown
                      className={`${status && "rotate-180"}`}
                      onClick={() => {
                        item.type === "movie"
                          ? setMovieSubmenuOpen(!movieSubmenuOpen)
                          : setSeriesSubmenuOpen(!seriesSubmenuOpen);
                      }}
                    />
                  )}
                </li>
              </Link>
            )}
            {item.sub && status && openSideBar && (
              <ul>
                {item.submenu?.map((subItem, index) => (
                  <Link key={index} passHref href={subItem.route}>
                    <span
                      key={index}
                      className="flex items-center justify-start pl-6 mb-2 cursor-pointer group"
                    >
                      <subItem.icon className="text-gray-500 group-hover:text-gray-200 " />
                      <li className="ml-2 font-semibold text-gray-500 group-hover:text-gray-200 ">
                        {subItem.name}
                      </li>
                    </span>
                  </Link>
                ))}
              </ul>
            )}
          </span>
        );
      })}
    </div>
  );
};
