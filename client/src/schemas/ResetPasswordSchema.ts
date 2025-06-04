import * as yup from "yup"

const password = yup.string()
.required("To pole jest wymagane")
.min(8, "Zbyt krótkie hasło")

const confirmPassword = yup.string()
.required("To pole jest wymagane")
.min(8, "Zbyt krótkie hasło")
.oneOf([yup.ref("password")], "Hasła muszą być takie same")

export const resetPasswordSchema = yup.object().shape({
    password,
    confirmPassword
})