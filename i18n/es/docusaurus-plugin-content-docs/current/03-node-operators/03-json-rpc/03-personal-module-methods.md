---
title: Métodos de Módulo Personal
sidebar_label: Módulo Personal
sidebar_position: 300
tags:
  - rsk
  - rskj
  - nodo
  - rpc
  - rpc api
  - operadores de nodos
  - rootstock
description: Los métodos JSON-RPC soportados por nodos Rootstock.
---

## cuenta personal

Bloquea la cuenta dada.

### Parámetros

1. `DATA`, 20 Bytes - dirección.

#### Parámetros de ejemplo

```js
params: ['0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b']
```

##### Devuelve

`Boolean` - `true` si la cuenta fue bloqueada con éxito, de lo contrario `false`.

**Ejemplo**

```js
// Solicitar
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

## cuenta_personal

Desbloquea la cuenta dada por una cantidad de tiempo.

### Parámetros

1. `DATA`, 20 Bytes - dirección.
2. `String` - La contraseña de la cuenta.
3. `QUANTITY` - (opcional, por defecto: 1800000 milisegundos) La duración de la cuenta para permanecer desbloqueada.

#### Parámetros de ejemplo

```js
params: [
  "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  "test passphrase!",
  "927C0" // 600000 milisegundos (10 min)
]
```

##### Devuelve

`Boolean` - `true` si la cuenta fue desbloqueada con éxito, de lo contrario `false`.

##### Ejemplo

```js
// Solicitar
curl -X POST --data '{"jsonrpc":"2. ","method":"personal_unlockAccount","params":["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test passphrase!",
  "927C0"],"id":73}'

// Resultado
{
  "id":1,
  "jsonrpc": "2. ",
  "resultado": verdadero
}
```

***

## transacción_personal

Envía una transacción sobre la API de gestión.

### Parámetros

1. `Objeto` - El objeto de llamada de transacción

- `from`: `DATA`, 20 Bytes - (opcional) La dirección desde la que se envía la transacción.
- `to`: `DATA`, 20 Bytes - La dirección a la que se dirige la transacción.
- `gas`: `QUANTITY` - (opcional) Integer del gas proporcionado para la ejecución de la transacción. eth_call consume cero gas, pero este parámetro puede ser necesario para algunas ejecuciones.
- `gasPrice`: `QUANTITY` - (opcional) Entero del precio gaseoso utilizado para cada gas pagado.
- `value`: `QUANTITY` - (opcional) Integer del valor enviado con esta transacción.
- `data`: `DATA` - (opcional) Hash de los parámetros codificados y de la firma del método. Para más detalles vea [Ethereum Contract ABI en la documentación de Solididad](https://solidity.readthedocs.io/en/latest/abi-spec.html).

2. `String` - La contraseña de la cuenta actual.

#### Parámetros de ejemplo

```js
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0", // 30400
  "gasPrice": "0x9184e72a000", // 1000000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}, "test passphrase!"]
```

##### Devuelve

`DATA` - El hash de la transacción.

\*\* Ejemplo\*\*

```js
// Solicitar
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## personal_importar_RawKey

Importa la clave privada dada en el almacén de claves, cifrándola con la frase.

### Parámetros

1. `DATA` - Una clave privada sin cifrar (cadena hexadecimal).
2. `String` - La contraseña de la cuenta actual.

#### Parámetros de ejemplo

```js
Parámetros: [
  "0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e",
  "¡frase de contraseña de prueba!"
]
```

##### Devuelve

`DATA` - La dirección de la nueva cuenta.

\*\* Ejemplo\*\*

```js
// Solicitar
curl -X POST --data '{"jsonrpc":"2. ","method":"personal_importRawKey","params":["0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e",
  "test passphrase!"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2. ",
  "resultado": "0x8f337bf484b2fc75e4b0436645dcc226ee2ac531"
}
```

## personal_dumpRawKey

Devuelve una representación hexadecimal de la clave privada de la dirección dada.

### Parámetros

1. `DATA`, 20 Bytes - La dirección de la cuenta, dicha cuenta debe ser desbloqueada.

#### Parámetros de ejemplo

```js
Parámetros: ["0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e"]
```

##### Devuelve

`DATA` - Una representación hexadecimal de la clave de la cuenta.

##### Ejemplo

```js
// Solicitar
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_dumpRawKey","params":["0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "777ebfc1e2b6930b09647e7a2273b3e53f759c751c0056695af466783db3642f"
}
```

## cuenta_nueva personal

Crea una nueva cuenta.

### Parámetros

1. `String` - La contraseña con la que cifrar esta cuenta.

#### Parámetros de ejemplo

```js
parámetros: ["¡prueba la contraseña!"]
```

##### Devuelve

`DATA` - La dirección de la cuenta recién creada.

##### Ejemplo

```js
// Solicitud
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["test passphrase!"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8f337bf484b2fc75e4b0436645dcc226eee2ac531"
}
```

## personal_newAccountWithSeed

Crea una nueva cuenta usando una frase de semilla.

### Parámetros

1. `Cadena` - La frase semilla con la que cifrar esta cuenta.

#### Parámetros de ejemplo

```js
params: ["seed"]
```

##### Devuelve

`DATA` - La dirección de la cuenta recién creada.

**Ejemplo**

```js
// Solicitar
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccountWithSeed","params":["seed"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8f337bf484b2fc75e4b0436645dcc226eee2ac531"
}
```
