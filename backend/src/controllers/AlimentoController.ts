import { Request, Response } from "express";
import { Alimento } from "../models/Alimento";
import { ValidationError } from "sequelize";

export const AlimentoController = {
  async index(req: Request, res: Response) {
    try {
      const alimentos = await Alimento.findAll();
      return res.json(alimentos);
    } catch (error) {
      console.error("Erro ao listar alimentos:", error);
      return res.status(500).json({ message: "Erro ao listar alimentos" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      // Log para debug
      console.log("Requisição recebida:", {
        body: req.body,
        headers: req.headers,
      });

      const { nome, calorias } = req.body;

      // Validações
      if (!nome || typeof nome !== "string") {
        return res.status(400).json({
          message: "Nome inválido",
          details: "O nome do alimento é obrigatório e deve ser uma string",
        });
      }

      if (!calorias || isNaN(Number(calorias))) {
        return res.status(400).json({
          message: "Calorias inválidas",
          details: "O valor de calorias deve ser um número válido",
        });
      }

      // Tenta criar o alimento
      const alimento = await Alimento.create({
        nome: nome.trim(),
        calorias: Number(calorias),
      });

      // Log de sucesso
      console.log("Alimento criado:", alimento.toJSON());

      return res.status(201).json(alimento);
    } catch (error) {
      console.error("Erro ao criar alimento:", error);

      // Tratamento de erros específicos
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: "Erro de validação",
          details: error.errors.map((e) => e.message),
        });
      }

      // Erro genérico
      return res.status(500).json({
        message: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alimento = await Alimento.findByPk(id);

      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.json(alimento);
    } catch (error) {
      console.error("Erro ao buscar alimento:", error);
      return res.status(500).json({ message: "Erro ao buscar alimento" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, calorias } = req.body;

      const alimento = await Alimento.findByPk(id);

      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      await alimento.update({ nome, calorias });
      return res.json(alimento);
    } catch (error) {
      console.error("Erro ao atualizar alimento:", error);
      return res.status(500).json({ message: "Erro ao atualizar alimento" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alimento = await Alimento.findByPk(id);

      if (!alimento) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      await alimento.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar alimento:", error);
      return res.status(500).json({ message: "Erro ao deletar alimento" });
    }
  },
};
