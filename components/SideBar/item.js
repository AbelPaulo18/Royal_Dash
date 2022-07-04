import Link from "next/link";

export function SideBarItem({ Icon, text, link }) {
  return (
    <button className="flex group items-center space-x-2 my-1 transition duration-300 border-gray-900 hover:text-white ">
      <Icon className="w-6 h-6 hover:animate-bounce sm:w-8 sm:h-8 " />
      <Link href={link} className="text-sm sm:text-lg">
        {text}
      </Link>
    </button>
  );
}
