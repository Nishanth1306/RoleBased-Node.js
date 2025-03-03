import express from "express";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware.js";
import Employee from "../models/employeeModel.js";

const router = express.Router();

router.post("/addemployee",authenticateJWT, authorizeAdmin, async (req, res) => {
    console.log(req.body);
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





router.get("/dashboard", authenticateJWT, authorizeAdmin, (req, res) => {
    res.json({ message: "Admin Dashboard Access Granted", user: req.user });
});

export default router;
