import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ setDataOpenModal, toggleMenu, isMenuOpen, selectedOption }) => {
  return (
    <div className={`w-full h-16 flex justify-between md:justify-end ${selectedOption === "A Ademicon" ? "pl-5 text-xl font-bold items-end" : "px-5 items-center"}`}>
      {isMenuOpen ? null : (
        <GiHamburgerMenu className="w-6 h-6 text-orange-ademicon md:invisible" onClick={toggleMenu} />
      )}
      {selectedOption === "A Ademicon" ? (
        <p className="w-full text-2xl flex justify-center md:justify-start">A Ademicon</p>
      ) : (
        <>
          <button
            className="px-4 py-3 bg-orange-ademicon rounded text-white"
            onClick={() => setDataOpenModal(true)}
          >
            Adicionar cliente
          </button>
        </>
      )
      }
    </div>
  );
};

export default Header;
