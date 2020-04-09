import express, {Router, Request, Response} from 'express';
import {getConnection, Repository} from 'typeorm';
import User from '../entity/user.entity';

const router: Router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    const users = await getConnection().getRepository(User).find();
    return res.status(200).json(users);
});


router.get("/:id", async function(req: Request, res: Response) {
    const results = await getConnection().getRepository(User).findOne(req.params.id);
    return res.status(200).json(results);
});

router.post("/", async function(req: Request, res: Response) {
    const user = await getConnection().getRepository(User).create(req.body);
    const results = await getConnection().getRepository(User).save(user);
    return res.status(200).json(results);
});

router.put("/:id", async function(req: Request, res: Response) {
    const updatedUser: User = new User();
    updatedUser.firstName = req.body.firstName;
    updatedUser.lastName = req.body.lastName;
    const results = await getConnection().getRepository(User).update(req.params.id, updatedUser);
    return res.status(200).json(results);
});

router.delete("/:id", async function(req: Request, res: Response) {
    const results = await getConnection().getRepository(User).delete(req.params.id);
    return res.status(200).json(results);
});


export default router;