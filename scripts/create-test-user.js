import dotenv from "dotenv";
import { connectDB } from "../src/lib/mongodb.js";
import { User } from "../src/models/User.js";
import bcrypt from "bcryptjs";

// Carregar variáveis de ambiente
dotenv.config();

async function createTestUser() {
  try {
    console.log("Conectando ao MongoDB...");
    await connectDB();
    console.log("Conectado!");
    
    // Verificar se já existe um usuário
    const existingUser = await User.findOne({ email: "test@example.com" });
    
    if (existingUser) {
      console.log("\n✅ Usuário de teste já existe:");
      console.log("Email:", existingUser.email);
      console.log("Nome:", existingUser.name);
      console.log("\nUse estas credenciais para fazer login:");
      console.log("Email: test@example.com");
      console.log("Senha: password123");
      return;
    }
    
    // Criar senha hash
    console.log("\nCriando usuário de teste...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    // Criar usuário de teste
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "user"
    });
    
    console.log("\n✅ Usuário de teste criado com sucesso!");
    console.log("\nUse estas credenciais para fazer login:");
    console.log("Email: test@example.com");
    console.log("Senha: password123");
    console.log("\nID do usuário:", user._id);
    
  } catch (error) {
    console.error("\n❌ Erro ao criar usuário:", error.message);
  } finally {
    process.exit(0);
  }
}

createTestUser();
