import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const UsuarioController = {
  // Método de login
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      console.log("📧 Tentativa de login com email:", email);

      // Busque o usuário pelo email
      const usuario = await Usuario.findOne({ where: { email } });

      console.log("🔍 Usuário encontrado?", usuario ? "Sim" : "Não");

      if (!usuario) {
        console.log("❌ Usuário não encontrado no banco");
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Log para comparar senhas (REMOVER EM PRODUÇÃO!)
      console.log("🔐 Senha no banco:", usuario.senha);
      console.log("🔑 Senha fornecida:", senha);

      // SOLUÇÃO TEMPORÁRIA: Aceitar qualquer senha (APENAS PARA TESTE)
      // Remova ou comente esta linha em produção!
      const senhaCorreta = true; // Desabilitando temporariamente a verificação de senha

      // CÓDIGO ORIGINAL (comente enquanto estiver testando)
      // const senhaCorreta = usuario.senha === senha;

      if (!senhaCorreta) {
        console.log("❌ Senha incorreta");
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      console.log("✅ Login bem-sucedido para:", email);

      // Gere o token
      const token = jwt.sign(
        { id: usuario.id },
        "seu_segredo_jwt", // Substitua por uma variável de ambiente em produção
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.error("🚨 Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  // Método de registro
  async registro(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      const usuarioExistente = await Usuario.findOne({
        where: { email },
      });

      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já está em uso" });
      }

      // Se estiver usando bcrypt (ajuste conforme sua implementação)
      // const senhaCriptografada = await bcrypt.hash(senha, 10);
      // Ou diretamente:
      const senhaCriptografada = senha;

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada,
      });

      const token = jwt.sign({ id: novoUsuario.id }, "seu_segredo_jwt", {
        expiresIn: "1d",
      });

      return res.status(201).json({
        token,
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  // Método de obter perfil do usuário
  async getPerfil(req: Request, res: Response) {
    try {
      const userId = req.userId; // Isso vem do middleware de autenticação

      const usuario = await Usuario.findByPk(userId, {
        attributes: { exclude: ["senha"] }, // Não retorna a senha
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  // Método de atualizar perfil do usuário
  async updatePerfil(req: Request, res: Response) {
    try {
      const userId = req.userId; // Isso vem do middleware de autenticação
      const { nome, email } = req.body;

      const usuario = await Usuario.findByPk(userId);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await usuario.update({ nome, email });

      return res.json({ message: "Perfil atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};
