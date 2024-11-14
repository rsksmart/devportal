import React, { useState, useEffect, useRef } from 'react'
import { getAddressInformation, canPegIn } from '/src/_utils/pegin-address-verifier/pegin-address-verifier'
import Admonition from '@theme/Admonition'

export default function AddressVerifier () {

  const [address, setAddress] = useState('')
  const [addressInfo, setAddressInfo] = useState('')
  const inputRef = useRef(null)
  const clearForm = (e) => {
    setAddress('')
    setAddressInfo('')
  }
  const checkAddress = (e) => {
    e.preventDefault()
    if (!inputRef?.current?.value) return

    const address = inputRef.current.value.trim()
    setAddress(address)
    setAddressInfo(getAddressInformation(address))
  }

  const AddressInfoResult = ({ info }) => {
    const [result, setResult] = useState('')
    const [resultType, setResultType] = useState('')
    const [resultTitle, setResultTitle] = useState('')

    useEffect(() => {
      const displayAddress = `<code>${address}</code>`

      if (info === null) {
        setResult(`The address ${displayAddress} is not valid.`)
        setResultType('warning')
        setResultTitle('Not valid')
      } else if (info?.type) {
        setResultType('success')
        setResultTitle('Valid')
        let displayAddressType = `<code>${info.type.toUpperCase()}</code>`
        let displayNetwork = `<code>${info.network.charAt(0).toUpperCase()}${info.network.slice(1)}</code>`

        let isCanPegIn = canPegIn(info)
        if (isCanPegIn) {
          if (info.type == 'p2pkh') {
            setResult(`The address ${displayAddress} is a valid ${displayAddressType} address, and may peg in on ${displayNetwork}.`)
          } else {
            setResult(`The address ${displayAddress} is a valid ${displayAddressType} address, however, may not peg in on ${displayNetwork}. Please check the compatibility matrix.`)
          }
        } else {
          setResult(`The address ${displayAddress} is a valid ${displayAddressType} address, however, will not peg in on ${displayNetwork}.<br/><strong>Do not use</strong> this wallet, your BTC will be <strong>lost</strong>. Please check the compatibility matrix.`)
        }
      }
    }, [info])

    return result && (
      <Admonition title={resultTitle} type={resultType}>
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
      </Admonition>
    )
  }

  return (
    <form className="pegin-address-verifier" onSubmit={checkAddress}>
      <div className="d-flex flex-column gap-12 align-items-start flex-md-row align-items-md-center">
        <input type="text" className="form-control form-control--xl" required={true} ref={inputRef} maxLength={150} placeholder="Enter your BTC address"/>
        <div className="d-flex gap-12">
          <button type="submit" className="btn">Check</button>
          <button type="reset" className="btn" onClick={clearForm}>Clear</button>
        </div>
      </div>
      <AddressInfoResult info={addressInfo}/>
    </form>
  )
}
