import EmployeeModel from '../models/Employees.models.js';

// Define the controller
const EmployeesController = {
  // Controller to get all employees
  getAllEmployees: async (req, res) => {
    try {
      const employees = await EmployeeModel.find({});
      res.status(200).json({success: true, employees: employees});
    } catch (error) {
      res.status(500).json({success:false, message: error.message });
    }
  },
  // Controller to add an employee
  addEmployee: async (req, res) => {
    const employee = new EmployeeModel({
      name: req.body.name,
    });
    try {
      const newEmployee = await employee.save();
      res.status(201).json({success:true, newEmployee});
    } catch (error) {
      res.status(400).json({success:false, message: error.message });
    }
  },
  // Controller to get an employee by id
  getEmployee: async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      res.status(200).json({success:true, employee});
    } catch (error) {
      res.status(404).json({success:false, message: error.message });
    }
  },
  // Controller to update an employee
  updateEmployee: async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      employee.name = req.body.name;
      const updatedEmployee = await employee.save();
      res.status(200).json({success:true, updatedEmployee});
    } catch (error) {
      res.status(404).json({success:false, message: error.message });
    }
  },
  // Controller to delete an employee
  deleteEmployee: async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      const deletedEmployee = await employee.remove();
      res.status(200).json({success:true, deletedEmployee});
    } catch (error) {
      res.status(404).json({success:false, message: error.message });
    }
  },
};

// Export the controller
export default EmployeesController;