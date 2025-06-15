import { Request, Response } from "express";
import { Dieta } from "../models/Dieta";
import { Refeicao } from "../models/Refeicao";
import { RefeicaoAlimento } from "../models/RefeicaoAlimento";
import { Alimento } from "../models/Alimento";
import sequelize from "../config/database";

export const DietaController = {
  // Criar nova dieta com refeições e alimentos
  create: async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const { nome, dataCriacao, refeicoes } = req.body;
      const userId = req.userId;

      const dieta = await Dieta.create(
        {
          nome,
          dataCriacao,
          usuarioId: userId,
        },
        { transaction }
      );

      const refeicoesPromises = refeicoes.map(async (refeicaoData: any) => {
        if (!refeicaoData.nome || !refeicaoData.horario) {
          throw new Error(
            "Nome e horário são obrigatórios para cada refeição."
          );
        }

        const refeicao = await Refeicao.create(
          {
            nome: refeicaoData.nome,
            horario: refeicaoData.horario,
            dietaId: dieta.id,
            usuarioId: userId,
          },
          { transaction }
        );

        if (refeicaoData.alimentos?.length > 0) {
          for (const alimentoData of refeicaoData.alimentos) {
            await RefeicaoAlimento.create(
              {
                refeicaoId: refeicao.id,
                alimentoId: alimentoData.id,
                quantidade: alimentoData.quantidade,
              },
              { transaction }
            );
          }
        }

        return refeicao;
      });

      await Promise.all(refeicoesPromises);
      await transaction.commit();

      const dietaCompleta = await Dieta.findByPk(dieta.id, {
        include: [
          {
            model: Refeicao,
            include: [
              {
                model: RefeicaoAlimento,
                include: [Alimento],
              },
            ],
          },
        ],
      });

      return res.status(201).json(dietaCompleta);
    } catch (error) {
      await transaction.rollback();
      console.error("Erro ao criar dieta:", error);
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor.",
      });
    }
  },

  // Buscar todas as dietas do usuário com refeições e alimentos
  getAll: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;

      const dietas = await Dieta.findAll({
        where: { usuarioId: userId },
        include: [
          {
            model: Refeicao,
            include: [
              {
                model: RefeicaoAlimento,
                include: [Alimento],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.json(dietas);
    } catch (error) {
      console.error("Erro ao buscar dietas:", error);
      return res.status(500).json({ message: "Erro ao buscar dietas" });
    }
  },
};
