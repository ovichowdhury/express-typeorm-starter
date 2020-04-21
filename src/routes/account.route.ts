import express, { Router, Request, Response, NextFunction } from 'express';
import { wrap } from '../middlewares/exception-handler.middle';
import { Account } from '../entity/one-to-many/account.entity';
import { Applicant } from '../entity/one-to-many/applicant.entity';
import { getManager } from 'typeorm';
import { ApplicantPicture } from '../entity/one-to-many/applicant-picture.entity';

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


// insert applicant image
router.post('/applicant/picture', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const applicantPic: ApplicantPicture = new ApplicantPicture();
    applicantPic.data = Buffer.from(req.body.data, 'base64');
    applicantPic.mimeType = req.body.mimeType;
    await getManager().getRepository(ApplicantPicture).save(applicantPic);
    const results = await getManager().getRepository(Applicant).update(req.body.applicantId, { applicantPicture: applicantPic });
    return res.status(201).json(results);
}));

// update account
router.put('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Account).update(req.body.accountId, { name: req.body.name });
    return res.status(200).json(results);
}));

// update applicant
router.put('/applicant', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Applicant).update(req.body.applicantId, { name: req.body.name, nid: req.body.nid });
    return res.status(200).json(results);
}));


// get all accounts with applicants
router.get('/', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().getRepository(Account).find({ relations: ["applicants"] });
    return res.status(200).json(results);
}));

// get applicant account from applicant id
router.get('/applicant/:applicantId', wrap(async (req: Request, res: Response, next: NextFunction) => {
    const results = await getManager().findOne(Applicant, parseInt(req.params.applicantId), { relations: ["account", "applicantPicture"] });
    return res.status(200).json(results);
}));


// delete account with applicant and applicant picture
router.delete('/:accountId', wrap(async (req: Request, res: Response, next: NextFunction) => {
    await getManager().transaction(async tem => {
        const accountApplicant: any = await tem.getRepository(Account).createQueryBuilder("account")
                                        .select("account.id")
                                        .addSelect("applicant.id")
                                        .leftJoin("account.applicants", "applicant")
                                        .where("account.id = :id", { id: req.params.accountId })
                                        .getOne();
        for (const applicant of accountApplicant.applicants) {
            const applicantPictureId = await tem.getRepository(Applicant).createQueryBuilder("applicant")
                                            .select("applicant.id")
                                            .addSelect("applicantPicture.id")
                                            .innerJoin("applicant.applicantPicture", "applicantPicture")
                                            .where("applicant.id = :id", { id: applicant.id })
                                            .getOne();
            if(applicantPictureId !== undefined)
                await getManager().getRepository(ApplicantPicture).delete(applicantPictureId.id);
            await getManager().getRepository(Applicant).delete(applicant.id);
        }
        const results = await getManager().getRepository(Account).delete(req.params.accountId);
        return res.status(200).json(results);
    });
}));


export default router;