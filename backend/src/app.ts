import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import "./config/database"; // Importando a configuração do banco
import routes from "./routes/routes";

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL do frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Monte as outras rotas
app.use("/api", routes);

// Rota de teste para verificar se o servidor está funcionando
app.get("/teste", (req, res) => {
  res.json({ message: "Servidor funcionando!" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

export default app;
