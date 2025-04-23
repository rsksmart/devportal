---
sidebar_label: Retirar
title: REMASC
tags:
  - rsk
  - rootstock
  - minando
  - bitcoin
  - remasc
---

El Contrato Inteligente del Administrador de Recompensas (REMASC) es un contrato inteligente precompilado que se ejecuta en cada bloque y tiene la responsabilidad de distribuir las recompensas recogidas de las comisiones de transacción a varios participantes de la red. Sin embargo, la distribución de recompensas de un bloque sólo se realiza una vez que el bloque alcanza una cierta madurez. En otras palabras, las recompensas se pagan sólo después de que un número fijo de bloques hayan confirmado un bloque. Con la excepción de los primeros bloques en la cadena de bloques después de la génesis, cada vez que se agrega un bloque a la cadena de bloques, otro bloque anterior alcanza la madurez y sus recompensas son pagadas.

REMASC es una implementación de [DECOR+](https://scalingbitcoin.org/papers/DECOR-LAMI.pdf).

## Cómo funciona

El contrato REMASC mantiene diferentes cuentas internas, una de estas cuentas internas se llama Balance de Recompensa. El Saldo de Recompensas siempre existe y su valor puede cambiar cuando un nuevo bloque es procesado por cualquiera de las siguientes razones:

- El bloque fue aceptado en la cadena principal y todas sus comisiones de transacción se agregan al saldo de recompensa.
- Los mineros y otras partes recompensadas reciben su recompensa y el valor recompensado se resta del saldo de recompensa.

Como ejemplo, supongamos que un bloque tiene 2 transacciones: uno pagando 100000 gas a 2 smart weis y el otro pagando 25000 gas a 3 smart weis. Supongamos también que antes de procesar el bloque, el Balance de Recompensas era 1000000 inteligente. Después de procesar el bloque el Balance de Recompensas se actualizará a 1000000 + 200000 + 75000 = 1275000 smart weis.

De este Balance de Recompensa, el 10% (127500 en el ejemplo) será restado para pagar a los mineros que hayan extraído a la altura correspondiente. Esto crea una recompensa sintética, que es equivalente a aplicar un filtro de pase bajo a las comisiones recibidas, y por lo tanto este método también ha sido llamado [suavizado de comisiones](https://lists. inuxfoundation.org/pipermail/bitcoin-dev/2016-January/012297.html). La cantidad del 10% extraída del saldo de recompensas, se llama la **Recompensa de Bloque Completa** y se denominará **F** a partir de ahora.

El importe de las comisiones en F se verá afectado por las siguientes variables:

- El número de hermanos extraídos a la misma altura de procesamiento
- El hecho de que la [Regla de Selección](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP15.md) fuera respetada o rota

Se introducirán algunas definiciones adicionales antes de formalizar cómo se calcula el pago para cada minero.

Uno y solo un bloque es extraído a una altura **N**. Este bloque es el **bloque principal** a la altura **N**. Los bloques que comparten un padre con un bloque principal se llaman **hermanos**. Estos bloques pueden ser añadidos a la cadena de bloques por **editores**, que siempre son mineros de minería después de los bloques.

El pago para los mineros del bloque principal, los hermanos y los editores se realizará en el bloque N + 4000. El pago ocurre como se especifica en las siguientes reglas:

- [](#top "tex-render FullBlock_{rwd}") _es el 100% de la recompensa del bloque_

- Rootstock recibirá una cuota de ~20% de la recompensa de bloque completo:

  [](#top "tex-render Rsk_{rwd}=\frac{FullBlock_{rwd}}{5}")

- La Federación de Rootstock recibirá una cuota de ~0.8% de la recompensa del bloque completo:

  [](#top "Sombreado de tex-renderizado_{rwd}=\frac{FullBlock_{rwd}-Rsk_{rwd}}{100}")

- Los mineros recibirán un pago de ~79.2% de la recompensa del bloque completo:

  [](#top "Mineros de renderizado de texto_{rwd}=FullBlock_{rwd}-Rsk_{rwd}-Feder_{rwd}")

<br/>

_Es importante notar que estas son divisiones enteras donde los resultados se redondean hacia abajo. Por eso es por qué:_

[](#top "tex-renderizar \frac{4}{5}*FullBlock_{rwd} \neq FullBlock_{rwd}-\frac{FullBlock_{rwd}}{5}")

<br/>

Ahora presentamos diferentes escenarios:

1. Hay **no** hermanos a la altura N

  - **Ninguna regla se rompió**
    El minero del bloque a la altura N se paga
    [](#top "tex-render Miners_{rwd}")

  - **Regla rota**
    El minero recibe el 90% de la
    [](#top "Mineros de tex-renderización_{rwd}")

  que se define como
  [](#top "tex-render Miners_{rwdBroken}=Miners_{rwd}-\frac{Miners_{rwd}}{10} %22")

2. Hay hermanos a la altura N.
  Cada hermano tendrá un editor y un minero respectivos, por lo que definimos:
  - **Publisher Fee** (~10% de [](#top "tex-render Miners_{rwd}")

    [](#top "tex-render PubFee_{rwd}=\frac{Miners_{rwd}}{10}")

  - **Muro de Mineros** (~90% de [](#top "Mineros de renderizado de texto_{rwd}")

    [](#top "tex-render MinersFee_{rwd}=Miners_{rwd}-PubFe_{rwd}")

    Si nosotros S es el número de hermanos, definimos:

  - **Tarifa de Publicador Individual**

    [](#top "tex-render IndPubFee_{rwd}=\frac{PubFee_{rwd}}{S}")

  - **Muro de Minería Individual**
    Para simplificar definimos

    [](#top "tex-render Mining_{rwd}=\frac{MiningFees_{rwd}}{S+1}"),

    es dada por la cuota de minería sobre todos los bloques minados referenciados en el blockchain (que es hermano + el bloque principal), entonces la cuota individual de minería es:

    - Ninguna regla fue rota

      [](#top "tex-render IndMiningFee_{rwd}=Mining_{rwd}")

    - Regla quebrada

      [](#top "tex-render IndMiningFee_{rwdBroken}=Mining_{rwd}-\frac{Mining_{rwd}}{10}-L")

Finalmente, con todas las variables anteriores calculadas, los pagos se realizarán de la siguiente manera:

Cada **publicador** recibe
[](#top "tex-render PubFee_{rwd}")

El **minero del bloque principal** recibe
[](#top "tex-render IndMiningFe_{rwd}")

Además, para **cada hermano**, se necesita calcular una nueva cantidad. Esto es, por cada bloque tardío que el hermano publique, recibe un castigo de ~5% del
[](#top "tex-render IndMiningFe_{rwd}").

El hermano se añade en el bloque N+D para algún valor positivo de D. Un castigo por publicación tardía se calcula para cada uno como
[](#top "tex-render L= \frac{(D-1) * IndMiningFee_{Rwd}}{20}")

Entonces a los mineros respectivos se les paga
[](#top "tex-render IndMiningFeee",_{rwd}= IndMiningFeee_{Rwd} - L")

La cantidad restante de [](#top "mineros de tex-renderizar_{rwd}") se añade a un balance llamado **Saldo Quemado**. A partir de esta escritura, el dinero quemado se pierde pero se pueden aplicar cambios.

## Ejemplo

Supongamos que el Saldo de Recompensas es 90000 inteligente y el pago por este N es 10000 inteligente. Entonces el saldo de recompensa se actualiza a 100000 weis inteligente. De esto, el 10% se distribuirá, que es 10000 weis inteligente.

![](https://i.imgur.com/FgA02Rl.png)

A, B y C comparten el padre P. B es el bloque principal a la altura N y A y C son hermanos. D es editor de C y E es editor de A.

De esta manera, calculamos:

- Recibe **Rootstock**

  [](#top "tex-render Rsk_{rwd}= \frac{FullBlock_{rwd}}{5} \implica \frac{10000}{5} \implies Rsk_{rwd} = 2000")

- **Federación RSK** recibe

  [](#top "tex-render Fed_{rwd}= \frac{FullBlock_{rwd}-Rsk_{rwd}}{100} \implies \frac{10000-2000}{100} \implies Fed_{rwd} = 80")

- **Mineros** reciben un total de
  [](#top "tex-render MinerFee_{rwd}= Miner_{rwd}-PubFee_{rwd} \implica 7920-792 \implies MinerFee_{rwd} = 7128")
  - Los bloques **B** y **C** reciben una Tarifa de Minería Individual

    [](#top "tex-render IndMiningFee_{rwd}= \frac{MinerFee_{rwd}}{S+1} \implica \frac{7128}{3} \implies IndMiningFeee_{rwd} = 2376")

    *En este caso los bloques no se publican tarde así que L es 0, que es por qué*
    [](#top "tex-render IndMiningFee_{rwd}")
    _se utiliza en el cálculo en lugar de_
    [](#top "tex-render IndMiningFeeaaaaaa_{rwd}")

  - **A** recibe

    [](#top "tex-render IndMiningFeeLate_{rwd}=IndMiningFee_{rwd} - L")

    [](#top "tex-render IndMiningFeeLate_{rwd}=IndMiningFee_{rwd} - \frac{(D-1) * IndMiningFee_{Rwd}}{20}")

    [](#top "tex-render IndMiningFeeLate_{rwd}= 2376 = IndMiningFee_{rwd} - \frac{(2-1) * 2376}{20}")

    [](#top "tex-render IndMiningFeeLate_{rwd}= 2257")

    *En este caso A se publicó tarde por lo que L no es 0, por eso* [](#top "tex-render IndMiningFeeLate_{rwd}") *se utiliza en el cálculo en lugar de* [](#top "tex-render IndMiningFee_{rwd}")

Para este ejemplo, se ha supuesto que no había ninguna norma incumplida en ningún bloque. De lo contrario, las tasas pagadas deberían haberse calculado utilizando [](#top "tex-render IndMiningFeeLate_{rwdBroken}")

## Referencias

- [DECOR+](https://scalingbitcoin.org/papers/DECOR-LAMI.pdf)
- [RSKIP-15](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP15.md)
