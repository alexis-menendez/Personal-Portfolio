// File: server/src/server.ts

// Core
import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";

// GraphQL
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";

// Database
import { connectDB } from "./config/connections.js";

// Routes
import contactRoutes    from './routes/portfolio/contactRoutes.js';
import taskadelicRoutes from './routes/taskadelic/index.js';
import hntdRoutes       from './routes/hntd/index.js';

// Databases
import { tdSequelize }   from './models/taskadelic/index.js';
import { hntdSequelize } from './models/hntd/index.js';



dotenv.config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT-based context
const context = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { user: null };

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
    const normalizedUser = { ...decoded, _id: decoded.id };
    return { user: normalizedUser };
  } catch {
    return { user: null };
  }
};

async function startServer() {
  await connectDB();

  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:4000",
          "http://localhost:4001",
          "http://localhost:4173",
          "http://localhost:10000",
          "https://inner-orbit.onrender.com",
          "https://alex-menendez.onrender.com"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  // Sync PostgreSQL tables
  await tdSequelize.sync({ alter: false });
  await hntdSequelize.sync({ alter: false });

  // Middleware
  app.use(express.json());
  app.use('/api/contact', contactRoutes);
  app.use('/taskadelic', taskadelicRoutes);
  app.use('/hntd', hntdRoutes);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      console.error("GraphQL Error:", formattedError);
      return formattedError;
    },
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context,
    })
  );

  if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});
