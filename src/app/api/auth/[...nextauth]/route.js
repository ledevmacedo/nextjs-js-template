import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import bcrypt from "bcryptjs";
import { User as UserModel } from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Tentativa de login com:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Credenciais vazias");
          throw new Error("Email e senha são obrigatórios");
        }

        await connectDB();

        const user = await UserModel.findOne({ email: credentials.email });
        console.log("👤 Usuário encontrado:", user ? "Sim" : "Não");

        if (!user || !user.password) {
          console.log("❌ Usuário não encontrado ou sem senha");
          throw new Error("Credenciais inválidas");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("🔑 Senha válida:", isValid);

        if (!isValid) {
          console.log("❌ Senha incorreta");
          throw new Error("Credenciais inválidas");
        }

        console.log("✅ Login bem-sucedido para:", user.email);
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  events: {
    async signIn({ user, account }) {
      console.log(`User ${user?.email} signed in with ${account?.provider}`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
