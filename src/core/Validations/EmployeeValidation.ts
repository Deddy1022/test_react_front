import { date, object, ref, string } from "yup";

export const employeeSchema = object({
  id: string(),
  firstName: string().required('Nom doit être fournit'),
  lastName: string().required('Prénom doit être fournit'),
  dateOfBirth: date().required('Veuillez remplir votre date de naissance'),
  entryDate: date()
    .required('Veuillez remplir ce champ'),
  exitDate: date()
    .nullable()
    .min(ref('entryDate'), 'La date de sortie ne peut être inférieur à celle d\'entrée'),
})