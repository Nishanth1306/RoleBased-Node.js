import express from "express";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware.js";
import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
//import { emplo } from "../middleware/employeeValidation.js";

import { validateEmployee } from "../middleware/joiValidation.js";


const router = express.Router();

router.post("/addemployee",authenticateJWT, authorizeAdmin, validateEmployee, async (req, res) => {
    //console.log(req.body);
    try{
        const {name, email, mobileNumber, department} = req.body;

        const newEmployee = await Employee.create({name, email, mobileNumber, department});
        res.status(201).json({message: "Employee Created", employee: newEmployee});
    }catch(error){
        res.status(500).json({message: "Error creating employee", error: error});
    }
});
router.delete("/deleteemployee/:id", authenticateJWT, authorizeAdmin, async (req, res) => {
    try{
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        if(!employee){
            return res.status(404).json({message: "Employee not found"});
        }
        await employee.destroy();
        res.json({message: "Employee Deleted", employee});
        
    }catch(error){
        res.status(500).json({message: "Error deleting employee", error: error});
    }
});

router.patch("/updateemployee/:id", authenticateJWT, authorizeAdmin, async (req, res) => {
    try{
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        if(!employee){
            return res.status(404).json({message: "Employee Not Found"});
        }
        const {name, email, mobileNumber, department} = req.body;
        employee.name = name;
        employee.email = email;
        employee.mobileNumber = mobileNumber;
        employee.department = department;
        await employee.save();

        res.json({message: "Employee Updated", employee});
    }
    catch(error){
        res.status(500).json({message: "Error updating employee", error: error});
    }
})

router.get("/allemployees", authenticateJWT, authorizeAdmin, async (req, res) => {
    try{
        const employees = await Employee.findAll();

        res.json({message: "All Employees", employees});
    }
    catch(error){
        res.status(500).json({message: "Error fetching employees", error: error});
    }
});

router.post("/addadmin", authenticateJWT, authorizeAdmin, async (req, res) => {
        const {username, password} = req.body;
        try{
            const existingUser = await User.findOne({where: {username}});
            if(existingUser){
                return res.status(400).json({message: "Username already exists. Choose a different one."});
            }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await User.create({username, password : hashedPassword, isAdmin: true, role: "admin"});
        res.status(201).json({message: "Admin Created", admin: newAdmin});
    }
    catch(error){
        res.status(500).json({message: "Error creating admin", error: error});
        console.log(error.message);
    }
});


router.get("/dashboard", authenticateJWT, authorizeAdmin, (req, res) => {
    res.json({ message: "Admin Dashboard Access Granted", user: req.user });
});

export default router;
