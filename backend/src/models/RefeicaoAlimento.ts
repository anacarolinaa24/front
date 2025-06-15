import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Refeicao } from "./Refeicao";
import { Alimento } from "./Alimento";

@Table({
  tableName: "refeicoes_alimentos",
  timestamps: true,
})
export class RefeicaoAlimento extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "idRefeicaoAlimento", // Nome correto da coluna ID
  })
  id!: number;

  @ForeignKey(() => Refeicao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "refeicaoId",
  })
  refeicaoId!: number;

  @ForeignKey(() => Alimento)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "alimentoId",
  })
  alimentoId!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  quantidade!: number;

  @BelongsTo(() => Refeicao)
  refeicao!: Refeicao;

  @BelongsTo(() => Alimento)
  alimento!: Alimento;
}
