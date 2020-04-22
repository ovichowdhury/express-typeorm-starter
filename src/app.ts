import "reflect-metadata";
import * as http from 'http';
import cluster from 'cluster';
import os from 'os';
import express, { Application, Request, Response, NextFunction } from 'express';
import { json, raw, text, urlencoded } from 'body-parser';
import * as path from 'path';
import cors from 'cors';
import { createConnection } from "typeorm";
import userRouter from './routes/user.route';
import accountRouter from './routes/account.route';
import roleRouter from './routes/role.route';

createConnection().then(connention => {
    const app: Application = express();

    // enabling cors
    const options = {
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-auth-token",
        exposedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
    }
    app.use(cors(options));

    const jsonParser: any = json({
        inflate: true,
        limit: '10mb',
        type: 'application/json',
        verify: (req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer, encoding: string) => {
            return true;
        },
    })

    // using json parser and urlencoder
    app.use(jsonParser);
    app.use(urlencoded({ extended: true }));


    // public folder conf
    app.use(express.static(path.join(__dirname, 'public')));

    // routes
    app.use('/users', userRouter);
    app.use('/accounts', accountRouter);
    app.use('/role', roleRouter);

    // global exceptin handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status(500).json({
            message: "Internal Server Error",
            reason: err.message
        });
    })


    // port number
    const port: number = Number(process.env.PORT) || 3000;

    // starting the server
    app.listen(port, () => console.log("Server Started at port " + port));


    

    // if (cluster.isMaster) {
    //     // Count the machine's CPUs
    //     const cpuCount = os.cpus().length;

    //     // Create a worker for each CPU
    //     for (let i = 0; i < cpuCount; i += 1) {
    //         cluster.fork();
    //     }
    // }
    // else {
    //     app.listen(port, (err, res) => {
    //         console.log(cluster.worker.id, " is listening on port: ", port);
    //     })
    // }

    // // Listen for dying workers
    // cluster.on('exit', function (worker) {

    //     // Replace the dead worker,
    //     // we're not sentimental
    //     console.log('Worker %d died :(', worker.id);
    //     cluster.fork();

    // });

}).catch(ex => {
    console.error("Database Connection Error: ",ex);
    process.exit(1);
});




