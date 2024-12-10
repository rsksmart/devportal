---
sidebar_position: 303
sidebar_label: Interactuar con dApp usando MyCrypto
title: Interactuar con dApp usando MyCrypto
tags:
  - recursos
  - tokenbridge
  - cadena de bloques
  - puentes
  - fichas
  - ethereum
  - rootstock
  - rsk
---

Esta guía describe los pasos necesarios para realizar una transferencia de token entre dos redes blockchain, que llamaremos **Mainchain** y **Sidechain**, a través de la interacción con contratos especiales que componen un subsistema llamado **Token Bridge**.

La prueba realizada utiliza los nodos Rootstock (con un nodo de lamentación local) y Ethereum (a través del cliente de Ganache) como Mainchain y Sidechain respectivamente. Las imágenes de demostración para interactuar con ambos Blockchain fueron tomadas de la aplicación MyCrypto. Alternativamente, se puede usar MyEtherWallet o similares, lo que dará los mismos resultados.

### Condiciones previas

La siguiente lista resume las herramientas y componentes que son necesarios para pasar por esta guía.

- Red principal

- Red Sidechain

- Cartera que permite interactuar con contratos

- Cuenta principal con fondos

- Contrato de direcciones y JSON ABIs en la cadena principal para token IERC20 (o similar) y contrato Bridge

- Dirección del contrato y JSON ABI en Sidechain para contrato Bridge

- El federador procesa transacciones desde la cadena Mainchain a Sidechain

En particular para este caso de uso, se utilizó:

- [Rootstock (regtest node)](https://dev.rootstock.io/node-operators/setup/installation/)
- [Ethereum (a través de Ganache)](https://geth.ethereum.org/docs/install-and-build/installing-geth)
- [MyCrypto](https://mycrypto.com/)

### Configurar

Comience conectando el cliente de interfaz blockchain a la red Mainchain. En este caso, la conexión es a un nodo local personalizado que fue previamente iniciado.

<img src="/img/resources/tokenbridge/rsk_node_setup.png" />

---

Luego accede a tu cuenta utilizando uno de los métodos disponibles en tu aplicación. Asegúrate de tener fondos disponibles antes de continuar.

!["Acceso al monedero"](/img/resources/tokenbridge/wallet_access.png "Acceso al monedero")

## Transferencia de token

El primer paso para realizar la transferencia cruzada consiste en la interacción con el contrato situado en la cadena principal que contiene las fichas a enviar. En este caso usaremos un contrato `IERC20` como ejemplo, pero no está sujeta a ninguna funcionalidad personalizada por lo que cualquier otro contrato basado en ERC20 puede ser utilizado.

Para continuar, introduzca la `dirección` del contrato y su interfaz `JSON ABI`

!["Acceso al Contrato"](/img/resources/tokenbridge/access_contract.png "Acceso al Contrato")

---

Después seleccione el método 'aprobación' y complete los parámetros con la información del destinatario y la cantidad que queremos enviar en unidad de wei. La dirección del pender será la dirección del denominado contrato Bridge en la red Mainchain que se utilizará como intermedio para la transferencia.

!["Aprobación del contrato"](/img/resources/tokenbridge/contract_approve.png "Aprobación del contrato")

---

Luego confirmar el precio del gas, escribir y firmar la transacción y finalmente enviarla. Es posible que se le pida que ingrese la cartera una vez más antes de confirmar.

!["Escribir Transacción"](/img/resources/tokenbridge/transaction_write.png "Escribir Transacción")
!["Envío de Transacción"](/img/resources/tokenbridge/transaction_send.png "Enviado de Transacción")

<img src="/img/resources/tokenbridge/transaction_confirm.png" />

---

Como resultado, se obtendrá el identificador de transacción correspondiente. Se recomienda esperar a que la transacción sea minada y confirmada. Puedes ir a la sección Estado de TX para verificar su estado.

!["Estado de la transacción"](/img/resources/tokenbridge/transaction_status.png "Estado de la transacción")

---

## Recibir tokens

A continuación, acceda al contrato Bridge en la cadena principal, introduciendo su dirección (que es a la que originalmente enviamos los tokens) y el JSON ABI.

!["Acceso al puente del contrato"](/img/resources/tokenbridge/access_contract_bridge.png "Acceso al puente del contrato")

---

En esta ocasión, invocar el método `receiveTokens` colocando la dirección del contrato IERC20 en la entrada `tokenToUse`, y la cantidad, en wei, que deseamos recibir.

!["Recibir Contrato"](/img/resources/tokenbridge/contract_receive.png "Recibir Contrato")

---

Nuevamente, escriba, firme y confirme la transacción y espere a que sea aprobada.

<img src="/img/resources/tokenbridge/transaction_confirm_receive.png" />

---

Una vez que esta transacción se procese en contrato con Bridge, el servicio federador identificará el evento y cruzará la información a la cadena Sidechain. El federador puede ser configurado para esperar unos bloques antes de transferir transacciones.

## Cambiar redes

El siguiente paso es conectar el cliente de interfaz de Blockchain a la cadena Sidechain, donde los tokens serán recibidos. En este caso utilizamos el cliente de Ganache con los contratos correspondientes previamente desplegados.

Luego conecte con el contrato Sidechain de Bridge utilizando la dirección correspondiente y JSON ABI una vez más. Esta vez llame al método `mappedTokens`, pasando como parámetro la dirección del contrato IERC20 del Mainchain que se utilizó anteriormente. El resultado de esta operación será la dirección del contrato asociado en la Sidechain que contiene las fichas transferidas.

!["Tokens Mapeados de Contrato"](/img/resources/tokenbridge/contract_mapped_tokens.png "Tokens Mapeados de Contrato")

---

## Validando resultado

Utilizando la dirección obtenida del paso anterior (`0x1684e1C7bd0225917C48F60FbdC7f47b2982a3C2`), y la interfaz ABI IERC20, conectémonos al contrato.

!["Acceder al Contrato Sidetoken"](/img/resources/tokenbridge/access_contract_sidetoken.png "Acceder al Contrato Lidero")

---

Para confirmar que la transferencia fue exitosa, verifique el saldo de la cuenta utilizada para enviar los fondos desde la cadena principal. Invoca el método `balanceOf` y ten en cuenta que el valor ha aumentado en la cadena Sidechain.

!["Balance del contrato"](/img/resources/tokenbridge/contract_balance.png "Balance del contrato")

---

Del mismo modo, verifique el contrato `symbol`. Tenga en cuenta que en este caso el valor es `eMAIN` donde 'e' se refiere a una transferencia a la cadena Ethereum Sidechain.

!["Símbolo de contrato"](/img/resources/tokenbridge/contract_symbol.png "Símbolo de contrato")
