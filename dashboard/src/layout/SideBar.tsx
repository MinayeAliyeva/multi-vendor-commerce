import { useEffect, useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation/index";
interface INav {
  id: number;
  title: string;
  icon: JSX.Element;
  role: string;
  path: string;
}
const SideBar = () => {
  const [allNav, setAllNav] = useState<INav[]>([]);
  const { pathname } = useLocation();
  console.log("pathname:", pathname);
  useEffect(() => {
    const navs = getNav("admin");
    setAllNav(navs);
  }, []);
  console.log("allNav:", allNav);
  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}
      >
        <div className="h-[50px] justify-center items-center ">
          <Link to="/" className="w-[130px] h-[30px]">
            <img
              className="w-[130px] h-full"
              src="http://localhost:3000/images/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={nav.path}
                  className={`  pathname === nav.path
                      ? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
                      : "text-[#030811] font-bold duration-200" px-[12px]`} 
                >
                  <span> {nav.icon}</span>
                  <span>{nav.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
