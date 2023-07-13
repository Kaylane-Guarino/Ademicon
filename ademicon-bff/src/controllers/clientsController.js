const clientsModel = require('../models/clientsModel');

const getAll = async (req, res) => {
    const clients = await clientsModel.getAll();

    return res.status(200).json(clients);
}

const registerClient = async (req, res) => {
    const { name, value, numberInstallment } = req.body;

    try {
        // Verificar se o cliente já foi cadastrado
        const existingClient = await clientsModel.findClientByName(name);

        if (existingClient) {
            return res.status(400).json({ message: 'Cliente já cadastrado' });
        }

        // cadastrar novo cliente
        const newClient = {
            name,
            value,
            numberInstallment
        };

        await clientsModel.addClient(newClient);

        return res.status(201).json({ message: 'Cliente cadastrado com sucesso' });

    } catch (error) {
        console.error('Erro ao registrar o cliente:', error);
        return res.status(500).json({ message: 'Erro ao registrar o cliente' });
    }
}

async function updateClient(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await clientsModel.updateClient(id, updatedData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        return res.status(200).json({ message: 'Dados do cliente atualizados com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar os dados do cliente:', error);
        return res.status(500).json({ message: 'Erro ao atualizar os dados do cliente' });
    }
}

async function getClient(req, res) {
    const { id } = req.params;

    try {
        const client = await clientsModel.findClientById(id);
        if (!client) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(client);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
}

async function deleteClient(req, res) {
    const { id } = req.params;

    try {
        const client = await clientsModel.deleteClient(id);
        if (client === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar o cliente:', error);
        return res.status(500).json({ message: 'Erro ao deletar o cliente' });
    }
}

module.exports = {
    getAll,
    registerClient,
    updateClient,
    getClient,
    deleteClient
}