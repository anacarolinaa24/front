import { Sequelize } from "sequelize-typescript";
import { Usuario } from "../models/Usuario";
import { Dieta } from "../models/Dieta";
import { Refeicao } from "../models/Refeicao";
import { Alimento } from "../models/Alimento";
import { RefeicaoAlimento } from "../models/RefeicaoAlimento";

const sequelize = new Sequelize({
  database: "dietapp",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // corrigindo o aviso de deprecação
  models: [Usuario, Dieta, Refeicao, Alimento, RefeicaoAlimento],
});

export default sequelize;
