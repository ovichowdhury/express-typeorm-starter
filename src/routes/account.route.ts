import express, { Router, Request, Response, NextFunction } from 'express';
import { wrap } from '../middlewares/exceptionHandler.middle';
import { Account } from '../entity/account.entity';
import { Applicant } from '../entity/applicant.entity';
import { getManager } from 'typeorm';

const router: Router = express.Router();

router.post('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const account: Account = new Account();
    account.name = req.body.name;
    account.type = req.body.type;
    const applicants: Applicant[] = [];
    for(let i=0; i<req.body.applicants.length; i++) {
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


export default router;