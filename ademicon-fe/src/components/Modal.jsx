import { Box, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ChangeNumberFormat from "../utils/NumberFormat";
import { createClient, editClient } from "../api";
import Toastify from "../utils/Toatfy";

const Modal = ({ isOpen, onClose, edit, dataClient, onClientUpdated }) => {
  const [data, setData] = useState({
    name: "",
    value: 0,
    numberInstallment: 0,
  });

  const [dataEdit, setDataEdit] = useState(dataClient);

  useEffect(() => {
    setDataEdit(dataClient);
  }, [dataClient]);

  const handleData = (event) => {
    const updatedData = edit ? { ...dataEdit, value: Number(event) } : { ...data, value: Number(event) };
    edit ? setDataEdit(updatedData) : setData(updatedData);
  };

  const handleSave = async () => {
    const { name, value } = data;
    if (!name) {
      Toastify({ text: "Todos os campos são obrigatórios.", type: "error" });
      return;
    }
    if (value < 500000) {
      Toastify({ text: "O valor do consórcio deve ser igual ou maior que R$5.000,00", type: "error" });
      return;
    }
    try {
      const response = await createClient(data);
      if (response !== 201) {
        Toastify({ text: "Cliente já cadastrado.", type: "error" });
        return;
      }
      onClose(false);
      setData({ name: "", value: 0, numberInstallment: 0 });
      Toastify({ text: "Cadastro realizado com sucesso!", type: "success" });
      if (onClientUpdated) {
        onClientUpdated();
      }
    } catch (error) {
      Toastify({ text: "Não foi possível realizar o cadastro do cliente.", type: "error" });
    }
  };

  const handleEdit = async (id) => {
    const { name, numberInstallment, value } = dataEdit;
    if (!name || !numberInstallment || !value) {
      Toastify({ text: "Todos os campos são obrigatórios.", type: "error" });
      return;
    }
    if (value < 500000) {
      Toastify({ text: "O valor do consórcio deve ser igual ou maior que R$5.000,00", type: "error" });
      return;
    }
    try {
      const response = await editClient(id, dataEdit);
      if (response !== 200) {
        Toastify({ text: "Não foi possível editar os dados do cliente.", type: "error" });
        return;
      }
      onClose(false);
      Toastify({ text: "Cliente atualizado com sucesso!", type: "success" });
      if (onClientUpdated) {
        onClientUpdated();
      }
    } catch (error) {
      Toastify({ text: "Não foi possível editar os dados do cliente.", type: "error" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="w-full sm:w-1/2 lg:w-2/2 p-6 rounded shadow z-10 bg-white">
        <div className="flex">
          <h2 className="ml-4 w-11/12 text-xl flex justify-center font-bold mb-4">
            {edit ? "Editar cliente" : "Adicionar cliente"}
          </h2>
          <div className="w-6 flex justify-end">
            <AiOutlineCloseCircle
              className="text-black hover:text-orange-ademicon cursor-pointer"
              onClick={() => onClose(false)}
            />
          </div>
        </div>
        <div className="">
          <TextField
            id="margin-none"
            label={edit ? "" : "Nome"}
            variant="outlined"
            className="w-full"
            size="small"
            value={edit ? dataEdit.name : data.name}
            onChange={(e) => (edit ? setDataEdit({ ...dataEdit, name: e.target.value }) : setData({ ...data, name: e.target.value }))}
          />
          <Box sx={{ height: 30, backgroundColor: (theme) => (theme.palette.mode === "light" ? "rgba(255, 255, 255)" : "rgb(255, 255, 255)") }} />
          <ChangeNumberFormat handleData={handleData} edit={edit} editValue={dataEdit.value} />
          <Box sx={{ height: 30, backgroundColor: (theme) => (theme.palette.mode === "light" ? "rgba(255, 255, 255)" : "rgb(255, 255, 255)") }} />
          <TextField
            id="margin-none"
            label={edit ? "" : "Número de parcelas"}
            type="number"
            variant="outlined"
            className="w-full"
            size="small"
            value={edit ? dataEdit.numberInstallment : data.numberInstallment}
            onChange={(e) => (edit ? setDataEdit({ ...dataEdit, numberInstallment: Number(e.target.value) }) : setData({ ...data, numberInstallment: Number(e.target.value) }))}
            inputProps={{
              min: 0,
            }}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="mt-4 bg-orange-ademicon text-white font-bold py-2 px-4 rounded"
            onClick={() => (edit ? handleEdit(dataClient._id) : handleSave())}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
