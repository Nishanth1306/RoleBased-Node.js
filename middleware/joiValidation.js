    import Joi from 'joi';

    const employeeSchema = Joi.object({
        name : Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        mobileNumber: Joi.string().pattern(new RegExp('^[6-9]\\d{9}$')).required(),
        department: Joi.string().valid("Testing","Development").required()
    });

    const validateEmployee = (req, res, next) => {
        const { error } = employeeSchema.validate(req.body, { abortEarly: false });
        if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
        }
        next(); 
    };
    

    export {validateEmployee};