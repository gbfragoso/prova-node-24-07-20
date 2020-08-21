import { Request, Response, NextFunction } from 'express';
import { body, check, validationResult } from 'express-validator';

class Validator {

    validateNewUser = [
        body('name')
            .notEmpty().withMessage("Nome do usuário é obrigatório"),
        body('username')
            .notEmpty().withMessage("Usarname é obrigatório"),
        body('email')
            .notEmpty().withMessage("Email é obrigatório")
            .isEmail().withMessage("Insira um email válido")
            .normalizeEmail()
    ];

    async handle(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request)
        if (errors.isEmpty()) {
            return next()
        } else {
            return response.status(422).json({ errors: errors.array() })
        }
    }
}

export default Validator;