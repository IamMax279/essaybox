import * as yup from "yup"

const email = yup.string()
.email("Zły format")
.required("To pole jest wymagane")

const password = yup.string()
.required("To pole jest wymagane")
.min(8, "Zbyt krótkie hasło")

export const signUpSchema = yup.object().shape({
    email,
    password
})