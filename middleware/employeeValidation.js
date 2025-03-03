import { body, validationResult } from 'express-validator';

const employeeValidation = [
    body('name').isString().isLength({min : 3}).withMessage("Name Should be Atleast 3 Characters"),
    body('email').isEmail().withMessage("INvalid Email"),
    
    body('mobileNumber').matches(/^[6-9]\d{9}$/).withMessage("Enter the correct Mobile Number"),
    body('department').isString().isLength({min : 7}).withMessage("For Testing, Enter 'Testing', For Development, Enter 'Development'"),

    (req, res, next) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({message: error.array()});
        }
        next();
    }
];

export {employeeValidation};