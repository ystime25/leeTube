import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev")

const home = (req, res) => {
    res.send("Hello");
}; 

const login = (req, res) => {
    res.send("Login")
}

app.use(logger);
app.get("/", home);
app.get("/login", login);

const handleListen = () => console.log(`✅ Server Online on http://localhost:${PORT}`);

app.listen(PORT, handleListen);