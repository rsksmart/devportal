import React, { useState, useEffect, useRef } from 'react'
import { getAddressInformation, canPegIn } from '/src/_utils/pegin-address-verifier/pegin-address-verifier'

export default function AddressVerifier () {

  const [address, setAddress] = useState('')
  const [addressInfo, setAddressInfo] = useState('')
  const inputRef = useRef(null)
  const checkAddress = (e) => {
    e.preventDefault()
    const address = inputRef.current.value;
    setAddress(address)
    setAddressInfo(getAddressInformation(address))
  }

  const AddressInfoResult = ({ info }) => {
    const [result, setResult] = useState('')

    useEffect(() => {
      const displayAddress = `<code>${address}</code>`;

      if (info === null) {
        setResult(`The address ${displayAddress} is not valid.`)
      } else if (info?.type) {
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
      <div className="pt-12" dangerouslySetInnerHTML={{ __html: result }}></div>
    )
  }

  return (
    <form className="pegin-address-verifier" onSubmit={checkAddress}>
      <div className="d-flex flex-column gap-12 align-items-start flex-md-row align-items-md-stretch">
        <input type="text" className="form-control form-control--xl" required={true} ref={inputRef}/>
        <button type="submit" className="btn ">Check</button>
      </div>
      <AddressInfoResult info={addressInfo}/>
    </form>
  )
}
