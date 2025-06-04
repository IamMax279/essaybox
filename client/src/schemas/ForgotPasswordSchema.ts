import * as yup from "yup"

const email = yup.string()
.email("Zły format")
.required("To pole jest wymagane")

export const forgotPasswordSchema = yup.object().shape({
    email
})