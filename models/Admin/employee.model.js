import {Schema,model} from "mongoose";

const employeeSchema = new Schema(
  {
    sn: {
      type: Number,
    },
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    employeeEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required : true,
      match: /^\S+@\S+\.\S+$/,
    },
    employeeSalary: {
      type: Number,
      trim: true,
      required : true,
    },
    employeeMobile: {
      type: String,
      trim: true,
      required : true,
    },
    employeeCountry: {
      type: String,
      required : true,
      trim: true,
    },
    employeeAddress: {
      type: String,
      required : true,
      trim: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function(next){
    let sn = 0;
    const employee = await model('Employee').find().sort({sn:-1}).limit(1);
    if(employee.length === 0){
        sn = 1
    }else{
        sn = (employee[0].sn+1)
    }
    this.sn = sn;
    next();
});

const EmployeeModel = model("Employee",employeeSchema)
export default EmployeeModel;
