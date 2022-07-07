import { AiFillHome } from "react-icons/ai";
import { MdMovieFilter, MdAdd, MdOutlineLocalMovies } from "react-icons/md";
import { RiMovieFill, RiAdminFill } from "react-icons/ri";
import { TbMovie } from "react-icons/tb";
import { ImFilesEmpty } from "react-icons/im";
import { GoSignOut } from "react-icons/go";
import { BsLink45Deg } from "react-icons/bs";
import { GiDramaMasks } from "react-icons/gi";

export const SideBarMenuItems = [
  {
    name: "Home",
    route: "/",
    icon: AiFillHome,
  },
  {
    name: "Gerir Filmes",
    type: "movie",
    icon: MdMovieFilter,
    sub: true,
    route: "/show_movies",
    submenu: [
      {
        name: "Mostrar Filmes",
        route: "/show_movies",
        icon: RiMovieFill,
      },
      {
        name: "Postar Filmes",
        route: "/post_movie",
        icon: MdAdd,
      },
    ],
  },
  {
    name: "Gerir Séries",
    icon: MdOutlineLocalMovies,
    sub: true,
    type: "series",
    route: "/show_series",
    submenu: [
      {
        name: "Mostrar Séries",
        route: "/show_series",
        icon: TbMovie,
      },
      {
        name: "Postar Séries",
        route: "/post_series",
        icon: MdAdd,
      },
      {
        name: "Temporadas",
        route: "/show_seasons",
        icon: ImFilesEmpty,
      },
      {
        name: "Episódios",
        route: "/show_episodes",
        icon: ImFilesEmpty,
      },
    ],
  },
  {
    name: "Links dos Players",
    route: "/player_link",
    icon: BsLink45Deg,
  },
  {
    name: "Gêneros",
    route: "/post_genres",
    icon: GiDramaMasks,
  },
  {
    name: "Administradores",
    route: "/admin_management",
    icon: RiAdminFill,
  },
  {
    name: "logOut",
    route: "/",
    icon: GoSignOut,
  },
];
