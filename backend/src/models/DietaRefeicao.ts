import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Dieta } from "./Dieta";
import { Refeicao } from "./Refeicao";

@Table({
  tableName: "dieta_refeicoes",
  timestamps: true,
})
export class DietaRefeicao extends Model {
  @ForeignKey(() => Dieta)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dietaId!: number;

  @ForeignKey(() => Refeicao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  refeicaoId!: number;
}
