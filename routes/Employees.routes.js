import { Router } from "express";

// Import the controller
import EmployeesController from "../controllers/Employees.controllers.js";

// Create an instance of the router
const router = Router();

// Define the routes
router.get("/", EmployeesController.getAllEmployees);

router.post("/", EmployeesController.addEmployee);

router.get("/:id", EmployeesController.getEmployee);

router.put("/:id", EmployeesController.updateEmployee);

router.delete("/:id", EmployeesController.deleteEmployee);

// Export the router
export default router;