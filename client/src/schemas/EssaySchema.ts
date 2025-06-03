import * as yup from "yup"

const topic = yup.string()
.min(8, "Zbyt krótki temat")
.max(160, "Zbyt długi temat")

export const essaySchema = yup.object().shape({
    topic
})