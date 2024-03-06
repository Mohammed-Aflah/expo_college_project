import express, { Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoute";
import UserModal from "./Model/UserModal";


dotenv.config();
declare global {
  namespace NodeJS {
    interface Global {
      onlineUsers: Map<any, any>; // Adjust the types accordingly
      chatSocket?: Socket;
    }
  }
}
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:process.env.CLIENT_URL,
    // origin:["https://realtime-chat-frontend-ywzp.vercel.app","https://a-chat.onrender.com"]
  })
);
app.use("/", router);
 app.listen(process.env.SERVER_PORT, async() => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

