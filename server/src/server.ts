import cors from "cors";
import express, { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Server is working!!!"
    })
})

const port = 3000

app.listen(port, () => {
    console.log(`Server is running at :: http://localhost:${port}`);
})