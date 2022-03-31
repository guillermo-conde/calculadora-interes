import { useState } from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
        total = (total + contribution) * (rate + 1)
  }
  return Math.round(total);
}

const formatter = new Intl.NumberFormat('en-US',{
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val));
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Este dato es requerido').typeError('Debe ingresar un número'),
            contribution: Yup.number().required('Este dato es requerido').typeError('Debe ingresar un número'),
            years: Yup.number().required('Este dato es requerido').typeError('Debe ingresar un número'),
            rate: Yup.number().required('Este dato es requerido').typeError('Debe ingresar un número').min(0, 'El valor debe ser mayor o igual a 0').max(1, 'El valor debe ser menor o igual a 1'),
          })}
          >
            <Form>
              <Input name="deposit" label="Depósito inicial"></Input>
              <Input name="contribution" label="Contribución"></Input>
              <Input name="years" label="Años"></Input>
              <Input name="rate" label="Interés estimado"></Input>
              <Button type='submit'>Calcular</Button>
            </Form>
        </Formik>
        {balance !== '' ? <Balance>El balance final es:  {balance}</Balance>:null}
      </Section>
    </Container>
  );
}

export default App;
