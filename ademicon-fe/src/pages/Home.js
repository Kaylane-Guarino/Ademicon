import React, { useState, useEffect } from "react";
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Content from "../layout/Content";
import Modal from "../components/Modal";
import { getClient } from "../api";
import Toastify from "../utils/Toatfy";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dataClient, setDataClient] = useState([]);
  const [selectedOption, setSelectedOption] = useState("A Ademicon");

  const [clientUpdated, setClientUpdated] = useState(false);

  useEffect(() => {
    handleOptionClick("A Ademicon");
  }, []);

  useEffect(() => {
    if (clientUpdated) {
      setClientUpdated(false);
    }
  }, [clientUpdated]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const openModal = (id) => {
    getClient(id)
      .then((client) => setDataClient(client))
      .catch((err) => {
        Toastify({
          text: "Erro ao buscar dados do cliente",
          type: "error",
        });
      });
    setModalOpen(true);
    setEdit(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClientUpdated = () => {
    setClientUpdated(true);
  };

  return (
    <div className="w-full h-screen flex">
      {menuOpen && <div className="fixed md:hidden inset-0 bg-black opacity-75" />}
      <Menu isOpen={menuOpen} toggleMenu={toggleMenu} handleOptionClick={handleOptionClick} />
      <div className={`w-full md:w-3/4 h-full ${menuOpen ? "ml-1/2" : "md:ml-0"}`}>
        <Header setDataOpenModal={openModal} toggleMenu={toggleMenu} isMenuOpen={menuOpen} selectedOption={selectedOption} />
        <Content edit={handleEdit} id={openModal} selectedOption={selectedOption} onClientUpdated={handleClientUpdated} />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} edit={edit} dataClient={dataClient} onClientUpdated={handleClientUpdated} />
    </div>
  );
};

export default Home;
