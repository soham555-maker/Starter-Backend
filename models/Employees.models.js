import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Employees = mongoose.model("Employees", employeesSchema);

export default Employees;
