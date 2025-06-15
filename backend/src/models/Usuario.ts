import {
  Model,
  Table,
  Column,
  DataType,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Dieta } from "./Dieta";

@Table({
  tableName: "usuarios",
  timestamps: true,
})
export class Usuario extends Model {
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
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cpf!: string;

  @HasMany(() => Dieta)
  dietas!: Dieta[];

  @BeforeCreate
  static async hashSenha(instance: Usuario) {
    if (instance.senha) {
      instance.senha = await bcrypt.hash(instance.senha, 10);
    }
  }
}
