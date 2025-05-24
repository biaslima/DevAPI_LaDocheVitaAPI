const usuarioService = require("../services/usuarioService");

// Listar todos os usuários (apenas admin)
exports.listar = async (req, res) => {
  try {
    const usuarios = await usuarioService.listar();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar usuários", error: error.message });
  }
};

// Listar apenas clientes (role = 'cliente')
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await usuarioService.listarPorRole("cliente");
    return res.status(200).json(clientes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar clientes", error: error.message });
  }
};

// Buscar usuário por ID
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.buscarPorId(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar usuário", error: error.message });
  }
};

// Criar novo usuário/cliente
exports.criar = async (req, res) => {
  const dados = req.body;
  try {
    const novo = await usuarioService.criar(dados);
    return res.status(201).json(novo);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
};

// Atualizar usuário
exports.atualizar = async (req, res) => {
  const dados = req.body;
  const { id } = req.params;

  try {
    const atualizado = await usuarioService.atualizar(id, dados);

    if (!atualizado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(atualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

// Deletar usuário
exports.deletar = async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = await usuarioService.deletar(id);

    if (!deletado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(204).json({ message: "Usuário deletado" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao deletar usuário", error: error.message });
  }
};
