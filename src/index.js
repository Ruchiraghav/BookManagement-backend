
import dotenv from "dotenv";
import connectdb from "./db/db.js";
import app from "./app.js"; 

dotenv.config({
    path: './.env'
});

console.log('Backend starting...');
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'YES' : 'NO', process.env.JWT_SECRET ? `(Value: ${process.env.JWT_SECRET.substring(0, 5)}...)` : ' (Value is undefined/null)');

connectdb()
    .then(() => {
      
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });

     
        app.on("error", (error) => {
            console.error("SERVER ERROR:", error);
            throw error;
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed !!!", err);
        process.exit(1); 
    });