---
title: "Tarifas de gas RBTC: Optimización de los costes de transacción"
sidebar_label: Gas
tags:
  - gas
  - transacciones
  - rbtc
  - red principal
  - rsk
  - portainjertos
  - conversión
  - bitcoin
  - precio del gas
sidebar_position: 302
---

El gas es el precio interno por ejecutar una transacción o contrato.
Cuando envías tokens, interactúas con un contrato, envías RBTC o haces cualquier otra cosa en la blockchain, debes **pagar por ese cálculo**. Ese pago se calcula como **gas**. En Rootstock, se paga en RBTC.

## ¿Qué es el gas?

Hay cuatro conceptos importantes:

- \*\*El precio del gas: El coste de la operación.
- **Límite de gas**: El gas máximo que puede permitirse la operación. Es un límite superior que el usuario establece para evitar perder gas.
- **Gas total**: El gas que ha consumido la operación. También se denomina **gas utilizado**.
- \*\*Unidad: El gas se paga en **RBTC**.

Empecemos con una analogía sencilla: Un coche.

Para conducir un coche necesitas gasolina. El precio de la gasolina es el dinero que pagas por cada galón. El límite de gasolina es la cantidad máxima de gasolina que aceptas consumir, la gasolina que _cargas_. El total de gasolina es la cantidad que has gastado al final del viaje.
Puedes calcular el gas total y establecer un límite de gas adecuado para que tu viaje no gaste más de lo previsto.

Las transacciones son bastante similares:

El precio del gas es el precio que usted fija para las operaciones. El límite de gas es el precio máximo que va a pagar por la transacción cuando se opere. Entonces, cuando se ejecuta la transacción, el gas total es el precio que finalmente pagas.

El gas es la _fee_ cobrada por el minero que mina el bloque que incluye la transacción.

La tasa resultante es:

```
tarifa = totalGas * precioGas
```

## ¿Cómo elijo un precio y un límite de gasolina adecuados?

Si quiere gastar menos en una transacción, puede hacerlo reduciendo la cantidad que paga por unidad de gas (precio del gas). Al igual que en Bitcoin, el precio que pagas por cada unidad aumenta o disminuye la **rapidez con la que se minará tu transacción.**

### Precio adecuado del gas

El precio del gas cambia con el tiempo. Para elegir un precio del gas adecuado debes tener en cuenta 2 conceptos:

- Qué es el _precio mínimo del gas_ y cómo cambia
- Cómo conseguir ese _precio mínimo de la gasolina_

### Precio mínimo del gas

El `minimumGasPrice` lo escriben los mineros en la cabecera del bloque y establece el precio mínimo del gas que debe tener una transacción para ser incluida en ese bloque. Puede cambiar con el tiempo, hasta un 1% del `minimumGasPrice` del bloque anterior. El precio mínimo del gas del último bloque puede obtenerse utilizando este método Web3:

Los medios por los que los mineros negocian el precio mínimo del gas se describen en [RSKIP09](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP09.md).

```javascript
web3.eth.getBlock('latest').precioMinimoGas
```

:::tip[Gas Límite]

El límite de gas de transacción por bloque es de 6.800.000 unidades.

:::

He aquí algunos enfoques prácticos de este tema:

1. Enfoque optimista (no recomendado):
   Puede establecer `minimumGasPrice` como parámetro del precio del gas para la transacción **pero si el precio mínimo del gas está siendo negociado y sube, su transacción podría ser rechazada**.

2. Enfoque sensato:
   En lugar de utilizar "precio mínimo del gas" tal y como está, puede [añadir un 10% a su valor](#cómo-cambia-el-precio-del-gas-con-el-tiempo).

3. Enfoque de la media de la red:
   Puedes obtener el precio medio del gas que se está pagando en la red:

```javascript
web3.eth.preciogas()
```

Aunque este valor sea mayor o igual que el precio mínimo del gas. (`gasPrice >= minimumGasPrice`), se recomienda añadir un pequeño porcentaje para aumentar la prioridad de su transacción.

### Límite de gas adecuado

El gas total puede estimarse utilizando este método Web3:

```javascript
myContract.methods.myMethod(param1, param2, ...).estimateGas(options, callback)
```

> Visite [aquí](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-estimategas) para consultar la documentación de Web3.

### Más información

#### ¿Cómo varía el precio del gas con el tiempo?

Cada minero puede votar para aumentar o disminuir el "precio mínimo del gas" hasta un 1%. Esto permite a los mineros aumentar el "precio mínimo del gas" un 100% en aproximadamente 50 minutos, suponiendo un bloque cada 30 segundos.
Los nodos que reenvían transacciones podrían comprobar que el **precio del gas anunciado en una transacción es al menos un 10% superior al mínimo**. Esto asegura a la transacción una vida útil de 10 bloques, suponiendo un "precio mínimo del gas" en bloque en constante aumento.
El precio mínimo del gas negociado se describe en [RSKIP09](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP09.md).

## ¿Qué ocurre si falla mi transacción?

\*\*Incluso si falla, los mineros deben validar y ejecutar su transacción (solicitud de cálculo) y, por tanto, usted debe pagar por ese cálculo igual que pagaría por una transacción exitosa.

## ¿Qué pasa si me quedo sin gasolina?

Si una transacción alcanza el límite de gas, se revertirán todos los cambios pero **se seguirá pagando la tasa**.

## El gas en los contratos inteligentes

Cuando compilas contratos inteligentes (comúnmente escritos en [Solidity](https://solidity.readthedocs.io/en/latest/)), se convierten en códigos de operación, conocidos como `opcodes`.
Estos códigos (opcodes) se muestran con nombres mnemotécnicos como `ADD` (suma) o `MUL` (multiplicación). [Aquí](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/org/ethereum/vm/GasCost.java) puedes ver el precio de cada opcode.
Como puedes adivinar, es importante escribir contratos inteligentes utilizando la mejor combinación (más barata) de opcodes.
Ejemplos de buenas prácticas para escribir contratos inteligentes:

### Evite declarar variables como \`var

```javascript
function payBonus() {
    for (uint i = 0; i < empleados.longitud; i++) {
      dirección empleado = empleados[i];
      uint bonus = calculateBonus(empleado);
      empleado.enviar(bonus);
    }
  }
```

En el código anterior, el problema es que si el tipo de `i` se declarara como `var`, se tomaría como `uint8` porque éste es el tipo más pequeño que se requiere para contener el valor 0. Si el array tiene más de 255 elementos, el bucle no terminará con éxito, resultando en gas desperdiciado. Es mejor usar el tipo explícito `uint` para no tener sorpresas y tener límites más altos. **Evita declarar variables usando `var` si es posible.**

### Bucle de matrices grandes

```javascript
function soDifficultLooper() {
    for (uint i = 0; i < largeArray.length; i++) {
      address persona = largeArray[i];
      uint pago = difficultOperation(largeArray);
      persona.enviar(pago);
    }
  }
```

Cada llamada a una función que modifica el estado del contrato inteligente tiene un coste de gas. Un bucle podría gastar mucho gas, lo que podría alcanzar fácilmente el límite de gas de una transacción o bloque. Si una transacción alcanza el límite de gas, se revertirán todos los cambios pero se seguirá pagando la tarifa. **Ten en cuenta los costes variables de gas cuando utilices bucles.**
