import express, { Router, Request, Response, NextFunction } from 'express';
import { getConnection, getManager } from 'typeorm';
import User from '../entity/one-to-one/user.entity';
import Profile from '../entity/one-to-one/profile.entity';
import {wrap} from '../middlewares/exception-handler.middle';

const router: Router = express.Router();




// router.get('/', async (req: Request, res: Response) => {
//     const users = await getConnection().getRepository(User).find();
//     return res.status(200).json(users);
// });


// router.get("/:id", async function(req: Request, res: Response) {
//     const results = await getConnection().getRepository(User).findOne(req.params.id);
//     return res.status(200).json(results);
// });

// router.post("/", async function(req: Request, res: Response) {
//     const user = await getConnection().getRepository(User).create(req.body);
//     const results = await getConnection().getRepository(User).save(user);
//     return res.status(200).json(results);
// });

// router.put("/:id", async function(req: Request, res: Response) {
//     const updatedUser: User = new User();
//     updatedUser.firstName = req.body.firstName;
//     updatedUser.lastName = req.body.lastName;
//     const results = await getConnection().getRepository(User).update(req.params.id, updatedUser);
//     return res.status(200).json(results);
// });

// router.delete("/:id", async function(req: Request, res: Response) {
//     const results = await getConnection().getRepository(User).delete(req.params.id);
//     return res.status(200).json(results);
// });


//create user with profile
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile: Profile = new Profile();
        profile.picture = req.body.picture;
        profile.details = req.body.details;

        const newUser: User = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.profile = profile;
        const results = await getConnection().getRepository(User).save(newUser);
        return res.status(200).json(results);
    }
    catch (ex) {
        return res.status(500).json({ message: ex });
    }

});

//get user with profile by id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        //user entity manager
        //const entityManager = await getConnection().manager;
        const results = await getManager().findOne(User, parseInt(req.params.id), { relations: ["profile"] });
        return res.status(200).json(results);
    }
    catch (ex) {
        return res.status(500).json({ message: ex });
    }
})

// create user only
router.post("/user", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser: User = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        const results = await getConnection().getRepository(User).save(newUser);
        return res.status(200).json(results);
    }
    catch (ex) {
        return res.status(500).json({ message: ex });
    }
})

// create profile to a user
router.post('/profile', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProfile: Profile = new Profile();
        newProfile.picture = req.body.picture;
        newProfile.details = req.body.details;
        await getManager().save(newProfile);
        const results = await getManager().update(User, req.body.userId, {profile: newProfile});

        return res.status(200).json(results);
    }
    catch (ex) {
        return res.status(500).json({ message: ex });
    }
})

// get all user with profile
router.get('/', wrap( async (req: Request, res: Response, next: NextFunction) => {
    const results: User[] =  await getManager().find(User, { relations: ["profile"] });
    return res.status(200).json(results);
}));


// delete a user with profile
router.delete('/:id', wrap(async (req: Request, res: Response, next: NextFunction) => {
    await getManager().transaction(async tem => {
        const userProfile: any = await tem.getRepository(User).createQueryBuilder("user")
                                .select("user.id")
                                .addSelect("profile.id")
                                .innerJoin("user.profile", "profile")
                                .where("user.id = :id", {id: req.params.id})
                                .getOne();
        
        await tem.getRepository(User).delete(userProfile.id);
        await tem.getRepository(Profile).delete(userProfile.profile.id);
        
        return res.status(200).json({deletedItems: userProfile});
    })
}));

export default router;