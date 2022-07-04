import { SideBar } from "../SideBar";

export const MainBody = ({ children }) => {
  return (
    <div className="flex h-screen w-screen ">
      <SideBar />
      <div className="flex flex-grow flex-col items-center overflow-y-auto bg-gray-300">
        {children}
      </div>
    </div>
  );
};
