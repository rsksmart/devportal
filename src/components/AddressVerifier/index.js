import React, { useState, useEffect, useRef } from 'react'
import { getAddressInformation, canPegIn } from '/src/_utils/pegin-address-verifier/pegin-address-verifier'
import Admonition from '@theme/Admonition'
import { ADDRESS_TYPES } from '/src/_utils/pegin-address-verifier/crypto/constants'

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
      // Check if info is null or if info.type is undefined before attempting to use it.
      if (!info || !info.type) {
        setResult(`The address ${displayAddress} is not valid.`)
        setResultType('warning')
        setResultTitle('Not valid')
      } else {
        let displayAddressType = `<code>${info.type.toUpperCase()}</code>`
        let displayNetwork = `<code>${info.network.charAt(0).toUpperCase()}${info.network.slice(1)}</code>`
        let isCanPegIn = canPegIn(info);

        if (isCanPegIn) {
          setResultTitle('Valid for Direct Peg-in')
          setResultType('success')
          setResult(`The address ${displayAddress} is a valid ${displayAddressType} address, and may be used for a direct peg-in on ${displayNetwork}. Visit the <a href="https://powpeg.rootstock.io/" target="_blank">Powpeg App</a> to peg-in or peg-out on Rootstock.`)
        } else if (info.type === ADDRESS_TYPES.BECH32) {
          setResultTitle('Not valid for Legacy Peg-in, visit the PowPeg App')
          setResultType('info')
          setResult(`The address ${displayAddress} is a valid ${displayAddressType} address. However, a direct peg-in is not supported for this address type. Visit the <a href="https://powpeg.rootstock.io/" target="_blank">Powpeg App</a> to perform a peg-in transaction from this address.`)
        } else {
          setResultTitle('Not Valid for Peg-in')
          setResultType('warning')
          setResult(`The address ${displayAddress} is a valid ${displayAddressType} address, however, will not peg in on ${displayNetwork}.<br/><strong>Do not use</strong> this wallet for peg-in, your BTC may be <strong>lost</strong>. Please check the <a href="/dev-tools/wallets/#compatibility-matrix" target="_blank">compatibility matrix</a>.`)
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
      {addressInfo && <AddressInfoResult info={addressInfo}/>}
    </form>
  )
}