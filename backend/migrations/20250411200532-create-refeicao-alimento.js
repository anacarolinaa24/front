"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tenta remover chave primária composta antiga (se existir)
    try {
      await queryInterface.removeConstraint("refeicoes_alimentos", "PRIMARY");
    } catch (error) {
      console.log(
        "🔎 Nenhuma chave primária composta encontrada. Prosseguindo..."
      );
    }

    // Adiciona idRefeicaoAlimento como chave primária autoincrementável
    await queryInterface.addColumn(
      "refeicoes_alimentos",
      "idRefeicaoAlimento",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        first: true,
      }
    );

    // Adiciona coluna quantidade
    await queryInterface.addColumn("refeicoes_alimentos", "quantidade", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    // Adiciona campos timestamps
    await queryInterface.addColumn("refeicoes_alimentos", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    await queryInterface.addColumn("refeicoes_alimentos", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });
  },

  async down(queryInterface, Sequelize) {
    const columnsToRemove = [
      "idRefeicaoAlimento",
      "quantidade",
      "createdAt",
      "updatedAt",
    ];

    for (const column of columnsToRemove) {
      try {
        await queryInterface.removeColumn("refeicoes_alimentos", column);
      } catch (error) {
        console.log(`⚠️ Coluna '${column}' já inexistente. Ignorando...`);
      }
    }

    // Restaura chave primária composta original
    try {
      await queryInterface.addConstraint("refeicoes_alimentos", {
        fields: ["refeicaoId", "alimentoId"],
        type: "primary key",
        name: "PRIMARY",
      });
    } catch (error) {
      console.log("⚠️ Não foi possível recriar a chave primária composta.");
    }
  },
};
