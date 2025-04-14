import { InferType } from "yup"
import { userSchema } from "../Validations/UserValidation"

export type TUser = InferType<typeof userSchema>

export type UserStateType = {
  success: boolean;
  message: string;
  data: TUser[]
}