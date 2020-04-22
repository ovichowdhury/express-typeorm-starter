import express, { Router, Request, Response, NextFunction } from 'express';
import { wrap } from '../middlewares/exception-handler.middle';
import { Role } from '../entity/many-to-many/role.entity';
import { getManager } from 'typeorm';
import { Person } from '../entity/many-to-many/person.entity';


const router: Router = express.Router();

// create only role
router.post('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const priv: string[] = [];
    req.body.rolePrivileges.forEach((e: string) => {
        priv.push(e);
    });

    const role: Role = new Role();
    role.name = req.body.name;
    role.rolePrivileges = priv;
    const results = await getManager().getRepository(Role).save(role);
    return res.status(201).json(results);

}));

// create person with roles
router.post('/person', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const roles: Role[] = [];
    for(let i=0; i<req.body.roles.length; i++) {
        const role: any = await getManager().getRepository(Role).findOne({name: req.body.roles[i]});
        roles.push(role);
    }
    const person: Person = new Person();
    person.name = req.body.name;
    person.email = req.body.email;
    person.roles = roles;
    const results = await getManager().getRepository(Person).save(person);
    return res.status(200).json(results);
}));

// get all person with role details
router.get('/person', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Person).find({relations: ["roles"]});
    return res.status(200).json(results);
}))

// get roles with all person
router.get('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Role).find({relations: ["persons"]});
    return res.status(200).json(results);
}))

// remove a role from person
router.delete('/person-role/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const person: any = await getManager().getRepository(Person).findOne(parseInt(req.body.personId), {
        relations: ["roles"]
    });
    person.roles = person.roles.filter( (role: Role) => {
        if(role.id !== req.body.roleId)
            return role;
    });

    const results = await getManager().getRepository(Person).save(person);
    return res.status(200).json(results);

}))


export default router;