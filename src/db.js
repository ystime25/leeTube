import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/leetube", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});
//Remember to run 'sudo service mongodb start' before running mongo command
const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB Connection Confirmed ");
const handleError = (error) => console.log("❌ DB Error Detected", error);

db.on("error", handleError);
db.once("open", handleOpen);
