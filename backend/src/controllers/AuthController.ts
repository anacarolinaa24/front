import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import jwt from "jsonwebtoken";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      console.log("Recebido login:", req.body);
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      console.log("Usuário encontrado:", usuario ? "Sim" : "Não");

      if (!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Comparação simples de senha (sem bcrypt por enquanto)
      if (usuario.senha !== senha) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ id: usuario.id }, "seu_segredo_jwt", {
        expiresIn: "1d",
      });

      return res.json({ token });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async registro(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      const usuarioExistente = await Usuario.findOne({ where: { email } });

      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já está em uso" });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada,
      });

      const token = jwt.sign({ id: novoUsuario.id }, "seu_segredo_jwt", {
        expiresIn: "1d",
      });

      return res.status(201).json({ token });
    } catch (error) {
      console.error("Erro no registro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};
