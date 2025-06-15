import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({
  tableName: 'dietas_historico',
  timestamps: true
})
export class DietaHistorico extends Model {
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

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  refeicoes!: Array<{
    nome: string;
    horario: string;
    alimentos: Array<{
      id: number;
      nome: string;
      quantidade: number;
      calorias: number;
    }>;
  }>;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;
}