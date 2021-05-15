import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListen = () => 
    console.log(`✅ Server Online on http://localhost:${PORT}`);

app.listen(PORT, handleListen);