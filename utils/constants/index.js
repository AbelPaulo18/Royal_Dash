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
    name: "Movie Manager",
    type: "movie",
    icon: MdMovieFilter,
    sub: true,
    route: "/show_movies",
    submenu: [
      {
        name: "Show Movies",
        route: "/show_movies",
        icon: RiMovieFill,
      },
      {
        name: "Post Movies",
        route: "/post_movie",
        icon: MdAdd,
      },
    ],
  },
  {
    name: "Series Manager",
    icon: MdOutlineLocalMovies,
    sub: true,
    type: "series",
    route: "/show_series",
    submenu: [
      {
        name: "Show Series",
        route: "/show_series",
        icon: TbMovie,
      },
      {
        name: "Post Series",
        route: "/post_series",
        icon: MdAdd,
      },
      {
        name: "Season",
        route: "/show_seasons",
        icon: ImFilesEmpty,
      },
      {
        name: "Episodes",
        route: "/show_episodes",
        icon: ImFilesEmpty,
      },
    ],
  },
  {
    name: "Player Links",
    route: "/player_link",
    icon: BsLink45Deg,
  },
  {
    name: "Genres",
    route: "/post_genres",
    icon: GiDramaMasks,
  },
  {
    name: "Admin",
    route: "/",
    icon: RiAdminFill,
  },
  {
    name: "logOut",
    route: "/",
    icon: GoSignOut,
  },
];
