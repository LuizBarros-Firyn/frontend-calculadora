import * as Yup from 'yup';

export function valuesFormValidation() {
    const schema = Yup.object().shape({
        val1: Yup.number().min(-100000000000000, "Numero inválido").max(100000000000000, "Numero inválido").required("Numero obrigatório"),
        val2: Yup.number().min(-100000000000000, "Numero inválido").max(100000000000000, "Numero inválido").required("Numero obrigatório"),
    });

    return schema;
};