import * as yup from "yup"

const email = yup.string()
.email("Zły format")
.required("To pole jest wymagane")

const password = yup.string()
.required("To pole jest wymagane")
.min(8, "Zbyt krótkie hasło")

export const signinSchema = yup.object().shape({
    email: email,
    password: password
})