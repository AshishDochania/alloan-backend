import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import main from "./main";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3001", // Allow only frontend origin
  methods: ["GET", "POST"], // Allow only required HTTP methods
  allowedHeaders: ["Content-Type"], // Allow only necessary headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the alloan.ai");
});

app.use("/api", main);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});