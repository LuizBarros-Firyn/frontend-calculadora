import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import api from '../../services/api';

import { valuesFormValidation as validation } from '../../FormHandling/YupValidations';

import { FiTerminal } from 'react-icons/fi';

import './styles.css'

export default function Main() {
    const [oper, setOper] = useState('')

    const valuesFormInitialValues = {
        "val1": "",
        "val2": "",
    };

    async function handleSubmitBugReport(values) {
        if (!oper) {
            alert('Por favor, escolha a operação desejada');
            return;
        }

        try {
            await api.get(`?val1=${values.val1}&oper=${oper}&val2=${values.val2}`).then(response => {
                alert(`Resultado: ${response.data.result}`);
            });
        } catch (error) {
            alert('Erro ao realizar conta, tente novamente mais tarde');
        }
    }

    return (
        <div className="main-container">
            <div className="content">
                <section>
                    <div className="page-welcome">
                        <FiTerminal size={40} color="#e02041"/>
                        <h1>Calculadora TypeScript</h1>
                    </div>
                    <p>Seja bem vindo ao front-end da Calculadora TypeScript. O trabalho de nuvem do professor Reginaldo
                        é sobre criar um webservice que pudesse receber uma expressão matemática e retornar o resultado em JSON.
                        Para aproveitar o trabalho, o webservice foi desenvolvido em TypeScript!
                    </p>
                </section>
                <Formik initialValues={valuesFormInitialValues} onSubmit={handleSubmitBugReport} validationSchema={validation}>
                    { props => {
                        const {
                            touched, errors, isSubmitting
                        } = props;

                        return(
                            <Form autoComplete="off">
                                <Field placeholder="Primeiro valor" name="val1" className={errors.val1 && touched.val1 && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="val1" />
                                </div>
                                <Field placeholder="Segundo valor" name="val2" className={errors.val2 && touched.val2 && "failed-field"} />
                                <div className="error-messages">
                                    <ErrorMessage component="span" name="val2" />
                                </div>
                                <select className="dropdown" value={oper} onChange={e => setOper(e.target.value)}>
                                    <option className='placeholder'>Operação</option>
                                    <option value='soma'>Soma</option>
                                    <option value='subtracao'>Subtração</option>
                                    <option value='multiplicacao'>Multiplicação</option>
                                    <option value='divisao'>Divisão</option>
                                </select>
                                <button className="button" type="submit" disabled={isSubmitting}>Calcular</button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>   
    );
}