import { useRef, useState, useEffect } from 'react'

export default function Calculadora(){
  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  }

  const styleInput = {
    fontSize: '20px'
  }

  const styleOperacoes = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px'
  }

  const [estado, setEstado] = useState(0)
  const estadoRef = useRef(0)

  const styleButton = {
    fontSize: '20px'
  }

  const styleButtonSoma = {
    fontSize: '20px',
    backgroundColor: estado == 1 ? 'rgb(200, 200, 200)': ''
  }

  const styleButtonSubtracao = {
    fontSize: '20px',
    backgroundColor: estado == 2 ? 'rgb(200, 200, 200)': ''
  }
  
  const styleButtonMultiplicacao = {
    fontSize: '20px',
    backgroundColor: estado == 3 ? 'rgb(200, 200, 200)': ''
  }
  
  const styleButtonDivisao = {
    fontSize: '20px',
    backgroundColor: estado == 4 ? 'rgb(200, 200, 200)': ''
  }

  const inputRef = useRef(null)
  const btnACRef = useRef(null)
  const btnSomaRef = useRef(null)
  const btnSubtracaoRef = useRef(null)
  const btnMultiplicacaoRef = useRef(null)
  const btnDivisaoRef = useRef(null)
  const btnIgualRef = useRef(null)
  const [valor, setValor] = useState(0)

  const [entrouNumero, setEntrouNumero] = useState(false)
  const handleInput = () => {
    if(estadoRef.current == 0){
      if(inputRef.current.value.length > 0){
        setValor(parseFloat(inputRef.current.value))
      }else{
        setValor(0)

        inputRef.current.value = 0
      }
    }

    setEntrouNumero(true)
  }

  const handleFocus = () => {
    inputRef.current.select()
  }

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.value = 0
      
      inputRef.current.addEventListener('input', handleInput)
      inputRef.current.addEventListener('focus', handleFocus)
    }

    return () => {
      inputRef.current.removeEventListener('input', handleInput)
      inputRef.current.removeEventListener('focus', handleFocus)
    }
  }, [])
  
  // estado 0 - inicio
  // estado 1 - soma
  // estado 2 - subtracao

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.value = valor
    }

    if(estado != 0){
      inputRef.current.select()
    }
  }, [valor])

  useEffect(() => {
    estadoRef.current = estado
  }, [estado])

  const reset = () => {
    setEstado(0)
    setValor(0)
    setEntrouNumero(false)
  }

  const calcular = () => {
    if(estado == 1){
      setValor(valor + parseFloat(inputRef.current.value))
    }else if(estado == 2){
      setValor(valor - parseFloat(inputRef.current.value))
    }
  }

  const somar = () => {
    if(entrouNumero){
      calcular()
    }
    
    setEstado(1)

    inputRef.current.focus()

    setEntrouNumero(false)
  }

  const subtrair = () => {
    if(entrouNumero){
      calcular()
    }

    setEstado(2)

    inputRef.current.focus()

    setEntrouNumero(false)
  }

  const multiplicar = () => {
    setEstado(3)

    setEntrouNumero(false)
  }

  const dividir = () => {
    setEstado(4)

    setEntrouNumero(false)
  }

  const igual = () => {
    calcular()

    setEstado(0)
  }

  return(
    <>
      <div style={style}>
        <input ref={inputRef} style={styleInput}/>

        <div style={styleOperacoes}>
          <button ref={btnACRef} style={styleButton} onClick={reset}>AC</button>
          <button ref={btnSomaRef} style={styleButtonSoma} onClick={somar}>+</button>
          <button ref={btnSubtracaoRef} style={styleButtonSubtracao} onClick={subtrair}>-</button>
          <button ref={btnMultiplicacaoRef} style={styleButtonMultiplicacao} onClick={multiplicar}>*</button>
          <button ref={btnDivisaoRef} style={styleButtonDivisao} onClick={dividir}>/</button>
          <button ref={btnIgualRef} style={styleButton} onClick={igual}>=</button>
        </div>
      </div>
    </>
  )
}
