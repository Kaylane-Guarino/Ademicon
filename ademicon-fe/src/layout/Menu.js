import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import Logo from "../assets/ademicon.svg";
import { useNavigate } from "react-router-dom";

const Menu = ({ isOpen, toggleMenu, handleOptionClick }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("A Ademicon");

  const handleMenuClick = (option) => {
    setSelectedOption(option);
    handleOptionClick(option);
    toggleMenu();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getOptionClasses = (option) => {
    return `w-full mt-10 flex justify-center items-center py-5 rounded-xl cursor-pointer font-semibold transition duration-200 ${
      selectedOption === option ? "bg-white text-black" : "text-white hover:bg-white hover:text-black"
    }`;
  };

  return (
    <div
      className={`w-4/5 fixed inset-y-0 left-0 lg:relative lg:w-110 h-full bg-orange-ademicon px-5 z-10 ${
        isOpen ? "" : "invisible lg:visible"
      }`}
    >
      <div className="flex justify-end lg:hidden bg-white">
        <GrClose className="w-5 h-5 text-black cursor-pointer" onClick={toggleMenu} />
      </div>
      <div className="h-5/7">
        <div className="w-full py-10 flex justify-center items-center p-5 rounded-b-lg bg-white">
          <img src={Logo} className="w-44" alt="logo" />
        </div>
        <div className={getOptionClasses("A Ademicon")} onClick={() => handleMenuClick("A Ademicon")}>
          A Ademicon
        </div>
        <div className={getOptionClasses("Lista de clientes")} onClick={() => handleMenuClick("Lista de clientes")}>
          Lista de clientes
        </div>
      </div>
      <div className="lg:h-1/1 flex items-end lg:items-center">
        <p className="h-12 flex items-center cursor-pointer font-bold text-white" onClick={logout}>
          <BiLogOut className="w-6 h-6 mr-2" />
          Logout
        </p>
      </div>
    </div>
  );
};

export default Menu;
