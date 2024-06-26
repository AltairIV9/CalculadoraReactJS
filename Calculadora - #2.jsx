import { useRef, useState, useEffect } from 'react'

export default function Calculadora(){
  const inputRef = useRef(null)
  const btnACRef = useRef(null)
  const btnSomaRef = useRef(null)
  const btnSubtracaoRef = useRef(null)
  const btnMultiplicacaoRef = useRef(null)
  const btnDivisaoRef = useRef(null)
  const btnIgualRef = useRef(null)
  const [valor, setValor] = useState(0)

  const [estado, setEstado] = useState(0)
  const estadoRef = useRef(0)

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
      <div className='janela'>
        <input className='input' ref={inputRef}/>

        <div className='teclado'>
          <div style={{display: 'grid', gridTemplateColumns: '3fr 1fr'}}>
            <div style={{display: 'grid', gridTemplateRows: '1fr 4fr'}}>
              <div className='tecladoAuxiliar'>
                <button className='button' ref={btnACRef} onClick={reset}>AC</button>
                <button className='button'>AP.</button>
                <button className='button'>(</button>
                <button className='button'>)</button>
              </div>

              <div className='tecladoNumerico'>
                <button className='button'>1</button>
                <button className='button'>2</button>
                <button className='button'>3</button>
                <button className='button'>4</button>
                <button className='button'>5</button>
                <button className='button'>6</button>
                <button className='button'>7</button>
                <button className='button'>8</button>
                <button className='button'>9</button>
                <button className='button buttonNumero0'>0</button>
                <button className='button'>,</button>
              </div>
            </div>

            <div className='tecladoOperacoes'>
              <button className='button buttonOperacao' ref={btnDivisaoRef} onClick={dividir}>/</button>
              <button className='button buttonOperacao' ref={btnMultiplicacaoRef} onClick={multiplicar}>x</button>
              <button className='button buttonOperacao' ref={btnSubtracaoRef} onClick={subtrair}>-</button>
              <button className='button buttonOperacao' ref={btnSomaRef} onClick={somar}>+</button>
              <button className='button buttonOperacao' ref={btnIgualRef} onClick={igual}>=</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
