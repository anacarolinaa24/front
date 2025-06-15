import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Usuario } from './Usuario';
import { Refeicao } from './Refeicao';

@Table({
  tableName: 'dietas',
  timestamps: true
})
export class Dieta extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nome!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dataCriacao!: Date;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @HasMany(() => Refeicao)
  refeicoes!: Refeicao[];
}
