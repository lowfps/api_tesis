"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        console.log(req.headers);
        res.json({
            'answer': 'The public API for roles is in /api/public/roles',
            'answer2': 'The public API for users is in /api/public/users'
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
