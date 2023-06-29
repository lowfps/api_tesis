import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        console.log(req.headers);
        res.json({
            'answer': 'The public API for roles is in /api/public/roles',
            'answer2': 'The public API for users is in /api/public/users'
        });
    }
}

const indexController = new IndexController();
export default indexController;