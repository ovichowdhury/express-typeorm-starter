import express, { Router, Request, Response, NextFunction } from 'express';
import { wrap } from '../middlewares/exceptionHandler.middle';
import { Account } from '../entity/account.entity';
import { Applicant } from '../entity/applicant.entity';
import { getManager } from 'typeorm';

const router: Router = express.Router();

// create account with applicant
router.post('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const account: Account = new Account();
    account.name = req.body.name;
    account.type = req.body.type;
    const applicants: Applicant[] = [];
    for (let i = 0; i < req.body.applicants.length; i++) {
        const applicant: Applicant = new Applicant();
        applicant.name = req.body.applicants[i].name;
        applicant.nid = req.body.applicants[i].nid;
        applicant.verificationDate = req.body.applicants[i].verificationDate;
        applicants.push(applicant);
    }
    account.applicants = applicants;
    const results = await getManager().getRepository(Account).save(account)
    return res.status(201).json(results);
}));


// create account 
router.post('/account', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const account: Account = new Account();
    account.name = req.body.name;
    account.type = req.body.type;
    const results = await getManager().getRepository(Account).save(account);
    return res.status(201).json(results);
}));

// create applicant for account
router.post('/applicant', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const applicant: Applicant = new Applicant();
    applicant.name = req.body.name;
    applicant.nid = req.body.nid;
    applicant.verificationDate = req.body.verificationDate;
    const results = await getManager().getRepository(Applicant).save(applicant);

    /**Inefficient one */
    // const account: any = await getManager().getRepository(Account).findOne(parseInt(req.body.accountId), {relations: ["applicants"]});
    // account.applicants.push(applicant);
    // let results = await getManager().getRepository(Account).save(account);

    /**Efficient one */
    await getManager().createQueryBuilder()
        .relation(Account, "applicants")
        .of(parseInt(req.body.accountId))
        .add(applicant);
    return res.status(201).json(results);
}));

// update account
router.put('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Account).update(req.body.accountId, {name: req.body.name});
    return res.status(200).json(results);
}));

// update applicant
router.put('/applicant', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Applicant).update(req.body.applicantId, {name: req.body.name, nid: req.body.nid});
    return res.status(200).json(results);
}));


// get all accounts with applicants
router.get('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Account).find({ relations: ["applicants"] });
    return res.status(200).json(results);
}));

// get applicant account from applicant id
router.get('/:applicantId', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().findOne(Applicant, parseInt(req.params.applicantId), {relations: ["account"]});
    return res.status(200).json(results);
}));


export default router;