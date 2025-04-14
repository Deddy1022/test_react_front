import { object, ref, string } from 'yup';

export const userSchema = object({
  id: string(),
  username: string().required("Nom d'utilisateur ne peut être vide"),
  password: string()
    .required("Mot de passe ne peut être vide")
    .matches(/[&~"#'{}()[\]\\-|`_ç^@=*$¨¤%!§:/;.,?]/, "Le mot de passe doit contenir au moins un caractère spécial")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .min(8, "Le mot de passe doit avoir plus de 7 caractères"),
  confirmPassword: string()
    .nullable()
    .oneOf([ref('password')], "Ce champ doit correspondre au mot de passe saisi")
})

export const loginSchema = object({
  id: string(),
  username: string().required("Nom d'utilisateur ne peut être vide"),
  password: string()
    .matches(/[&~"#'{}()[\]\\-|`_ç^@=*$¨¤%!§:/;.,?]/, "Le mot de passe doit contenir au moins un caractère spécial")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .min(8, "Le mot de passe doit avoir plus de 7 caractères")
    .required("Mot de passe ne peut être vide")
})