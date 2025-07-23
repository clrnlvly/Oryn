import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { Feather } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div
            className="tooltip tooltip-bottom cursor-pointer"
            data-tip="“oryn — from ‘auryn’, meaning breeze or clarity; a space where thoughts quietly bloom.”"
          >
            <h1 className="text-3xl font-bold text-primary tracking-tight flex items-center">
              <Feather className="w-6 h-6 mr-2" />
              <span className="font-serif italic">oryn</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>new note</span>
            </Link>

            <ThemeSwitcher />

            {token && (
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;