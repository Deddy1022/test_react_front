import { InferType } from "yup";
import { employeeSchema } from "../Validations/EmployeeValidation";

export type TEmployees = InferType<typeof employeeSchema>

export type EmployeeStateType = {
  success: boolean;
  message: string;
  data: {
    items: TEmployees[],
    currentPage: number;
    totalItems: number;
    totalPages: number;
  }
}