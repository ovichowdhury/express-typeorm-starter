"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("../entity/user.entity"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield typeorm_1.getConnection().getRepository(user_entity_1.default).find();
    return res.status(200).json(users);
}));
router.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getConnection().getRepository(user_entity_1.default).findOne(req.params.id);
        return res.status(200).json(results);
    });
});
router.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getConnection().getRepository(user_entity_1.default).create(req.body);
        const results = yield typeorm_1.getConnection().getRepository(user_entity_1.default).save(user);
        return res.status(200).json(results);
    });
});
router.put("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = new user_entity_1.default();
        updatedUser.firstName = req.body.firstName;
        updatedUser.lastName = req.body.lastName;
        const results = yield typeorm_1.getConnection().getRepository(user_entity_1.default).update(req.params.id, updatedUser);
        return res.status(200).json(results);
    });
});
router.delete("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getConnection().getRepository(user_entity_1.default).delete(req.params.id);
        return res.status(200).json(results);
    });
});
exports.default = router;
//# sourceMappingURL=user.route.js.map