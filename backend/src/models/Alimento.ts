import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'alimentos',
  timestamps: true
})
export class Alimento extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  nome!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  calorias!: number;
}
