import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Dieta } from "./Dieta";
import { RefeicaoAlimento } from "./RefeicaoAlimento";

@Table({
  tableName: "refeicoes",
  timestamps: true,
})
export class Refeicao extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  horario!: string;

  @ForeignKey(() => Dieta)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // permitindo null inicialmente para migração
  })
  dietaId!: number;

  @BelongsTo(() => Dieta)
  dieta!: Dieta;

  @HasMany(() => RefeicaoAlimento)
  refeicaoAlimentos!: RefeicaoAlimento[];
}
