"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const path = __importStar(require("path"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const user_route_1 = __importDefault(require("./routes/user.route"));
typeorm_1.createConnection().then(connention => {
    const app = express_1.default();
    // enabling cors
    const options = {
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-auth-token",
        exposedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
    };
    app.use(cors_1.default(options));
    const jsonParser = body_parser_1.json({
        inflate: true,
        limit: '10mb',
        type: 'application/json',
        verify: (req, res, buf, encoding) => {
            return true;
        },
    });
    // using json parser and urlencoder
    app.use(jsonParser);
    app.use(body_parser_1.urlencoded({ extended: true }));
    // public folder conf
    app.use(express_1.default.static(path.join(__dirname, 'public')));
    // routes
    app.use('/users', user_route_1.default);
    // starting the server
    // app.listen(3000, () => console.log("Server Started at port 3000"));
    // port number
    const port = Number(process.env.PORT) || 3000;
    if (cluster_1.default.isMaster) {
        // Count the machine's CPUs
        const cpuCount = os_1.default.cpus().length;
        // Create a worker for each CPU
        for (let i = 0; i < cpuCount; i += 1) {
            cluster_1.default.fork();
        }
    }
    else {
        app.listen(port, (err, res) => {
            console.log(cluster_1.default.worker.id, " is listening on port: ", port);
        });
    }
    // Listen for dying workers
    cluster_1.default.on('exit', function (worker) {
        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster_1.default.fork();
    });
}).catch(ex => {
    console.error("Database Connection Error: ", ex);
    process.exit(1);
});
//# sourceMappingURL=app.js.map