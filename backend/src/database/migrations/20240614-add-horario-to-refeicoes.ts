import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('refeicoes', 'horario', {
      type: DataTypes.TIME,
      allowNull: true
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('refeicoes', 'horario');
  }
};