import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { deleteClient, getAllClients } from "../api";
import Toastify from "../utils/Toatfy";

function ListClient({ edit, id, onClientUpdated }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();

    const interval = setInterval(fetchClients, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (onClientUpdated) {
      fetchClients();
    }
  }, [onClientUpdated]);

  const fetchClients = async () => {
    try {
      const data = await getAllClients();
      setClients(data);
    } catch (error) {
      Toastify({
        text: "Não foi possível realizar a busca dos clientes.",
        type: "error",
      });
    }
  };

  const handleDeleteClient = (id) => {
    deleteClient(id)
      .then((response) => {
        if (response !== 200) {
          Toastify({
            text: "Não foi possível deletar o cliente.",
            type: "error",
          });
        } else {
          setClients((prevClients) => prevClients.filter((client) => client._id !== id));
          Toastify({
            text: "Cliente deletado com sucesso!",
            type: "success",
          });
        }
      })
      .catch((error) => {
        Toastify({
          text: "Não foi possível realizar o cadastro do cliente.",
          type: "error",
        });
      });
  };

  const handleOpenModalEdit = (clientId) => {
    if (id) {
      id(clientId);
    }
    if (edit) {
      edit(true);
    }
  };

  const formatCurrency = (value) => {
    const formattedValue = parseFloat(value) / 100;

    return isNaN(formattedValue)
      ? "0,00"
      : formattedValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  return (
    <table className="w-full h-full">
      {clients?.length === 0 ? (
        <tbody className="w-full h-full flex justify-center items-center">
          <tr>
            <td colSpan="4">Não tem nenhum cliente cadastrado...</td>
          </tr>
        </tbody>
      ) : (
        clients?.map((client) => (
          <tbody className="w-full h-24 shadow-md rounded flex items-center p-2" key={client._id}>
            <tr className="w-full flex justify-between">
              <td className="w-1/4">{client.name}</td>
              <td className="w-1/3 flex justify-center">{formatCurrency(client.value)}</td>
              <td className="w-1/5 flex justify-center">
                {client.numberInstallment === 0 ? "A vista" : `${client.numberInstallment}x`}
              </td>
              <td className="w-1/6 flex justify-end items-center">
                <BsFillPencilFill className="cursor-pointer" onClick={() => handleOpenModalEdit(client._id)} />
                <BsFillTrashFill className="cursor-pointer ml-3" onClick={() => handleDeleteClient(client._id)} />
              </td>
            </tr>
          </tbody>
        ))
      )}
    </table>
  );
}

export default ListClient;
