---
sidebar_label: Arquitectura
sidebar_position: 980
title: RIF Relay - Arquitectura
tags:
  - rif
  - sobre
  - relé
  - integrar
description: Arquitectura de relés RIF
---

El sistema de retransmisión RIF está diseñado para lograr el patrocinio de transacciones a bajo coste. El coste del servicio de retransmisión proporcionado por los "patrocinadores" se acuerda entre las partes fuera de la cadena. El bajo coste de las transacciones en Rootstock (RSK) contribuye también a mantener bajos los costes generales del servicio.

El sistema de relés RIF está formado por varios componentes, algunos esenciales y otros auxiliares.

A continuación se ofrece una visión general al respecto:

**En cadena**, el sistema no puede funcionar sin sus Contratos Inteligentes, que engloban las Carteras Inteligentes más el Centro de Retransmisión y los Verificadores.

\*\*Fuera de la cadena, se necesita al menos un servidor de retransmisión para interactuar con los contratos. Sin un Servidor de Retransmisión, no se pueden crear y enviar sobres a los contratos.

A continuación se amplían los detalles de cada uno de estos componentes, así como un glosario introductorio.

### Glosario

| Plazo                         | Descripción                                                                                                                                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Patrocinador                  | Un tercero que paga el gas consumido por una transacción patrocinada (véase más abajo) enviándola a la blockchain.                                                                                                                                                  |
| Transacción patrocinada       | Transacción enviada por el solicitante (véase más abajo) a través del Patrocinador, este tipo de transacción pretende separar al pagador del gas del remitente de la transacción.                                                                                   |
| Solicitante                   | Se trata de un EOA (véase más abajo). El solicitante envía una transacción patrocinada al Patrocinador. No pagan el gas con criptomoneda nativa sino con un token aceptado por el Patrocinador, si no lo subvencionan.              |
| Destinatario                  | Abreviatura de contrato de destinatario. Es el destino de la transacción del solicitante.                                                                                                                                                                              |
| Sobre                         | Utilizando la analogía de los "sobres", es la transacción, (financiada con criptomoneda nativa como gas) enviada por el Patrocinador a la blockchain, la que envuelve la carga útil de la transacción del solicitante (transacción patrocinada). |
| Relé RIF                      | Todo el sistema que permite la retransmisión de las transacciones patrocinadas.                                                                                                                                                                                                        |
| DoS                           | Una denegación de servicio es una amenaza a la seguridad de la información cuyo objetivo es hacer que un servicio no esté disponible.                                                                                                                                                  |
| DeFi                          | Acrónimo de Decentralized Finance, es una novedosa forma de financiación basada en la tecnología blockchain.                                                                                                                                                                           |
| EOA                           | Una cuenta de propiedad externa (EOA) es una cuenta gestionada con una clave, que es capaz de firmar y enviar transacciones, y pagar el coste por ello.                                                                                                             |
| Tasa                          | Importe del token que se cobra por cada transacción retransmitida.                                                                                                                                                                                                                     |
| Modelo de reparto de ingresos | Una forma de retransmitir las transacciones para que las comisiones se repartan entre varios socios.                                                                                                                                                                                   |
| Honorarios Receptor           | Es el Trabajador/Cobrador designado que recibirá las tasas                                                                                                                                                                                                                                             |

## Componentes de la cadena

### Centro de relés

El concentrador de retransmisión es el componente principal de la arquitectura de retransmisión RIF. Actúa como interfaz con el servidor de retransmisión y con toda la arquitectura de la cadena. Remite todas las transacciones a sus respectivos contratos al tiempo que comprueba la validez del trabajador que está procesando la transacción.

También forma parte del proceso de registro de los Relay Workers junto con los Relay Managers. Además, el Centro de Retransmisión guarda el importe de la apuesta de cada Gestor de Retransmisión para garantizar el buen comportamiento de sus trabajadores.
La cuenta que apuesta por un Gestor de Retransmisión específico por primera vez se convierte en la propietaria de la apuesta, sólo esta cuenta puede hacer apuestas posteriores para este Gestor de Retransmisión específico.

Cuando un Gestor de Retransmisiones desautoriza un Centro de Retransmisiones, significa que se desestablece de él, lo que también significa que ya no puede retransmitir a través de ese centro. Cualquier saldo que haya en el centro de retransmisión se envía al remitente original de la participación (el propietario).

El desenganche tiene un retardo predefinido (en bloques). Con ello se pretende evitar que el gestor de retransmisiones se desancle antes de un corte que se iba a producir.

### Billetera inteligente

Es la "cuenta basada en el contrato" propiedad de la EOA del Solicitante. Antes de ejecutar cualquier transacción utilizando el monedero inteligente, es necesario desplegar el contrato de monedero inteligente.

Los monederos inteligentes son contratos que verifican los datos transmitidos y posteriormente invocan al contrato receptor de la transacción. La creación de carteras inteligentes no tiene ningún coste de gas proporcionando la ventaja de que se pueden desplegar sólo cuando sea necesario.

Es el componente que llama al contrato del Destinatario (es decir, la dirección `msg.sender` que verá el Destinatario). Durante la ejecución, el contrato verifica la solicitud de retransmisión y, si es válida, llama a la función del destinatario definida; en caso contrario, revierte la invocación. La verificación incluye la comprobación de que el propietario de la SmartWallet realizó la solicitud, el rechazo de cualquier solicitud con una firma no válida y la prevención de ataques de repetición utilizando un nonce.

El "monedero inteligente" se diseñó para interactuar únicamente con el sistema de retransmisión RIF, por lo que cualquier saldo en moneda nacional se transferirá al propietario del "monedero inteligente" después de cada transacción.

### Cartera inteligente Native Holder

El `monedero inteligente titular nativo` es un `monedero inteligente` que fue diseñado para tener interacciones fuera del sistema RIF Relay. Esto significa que puede contener moneda nativa, como su nombre indica.

El comportamiento del `monedero inteligente de titular nativo` es el mismo que el del `monedero inteligente` con la diferencia de que la moneda nativa no será transferida de vuelta al propietario después de cada transacción y puede disponer del uso de la moneda nativa.

### Cartera inteligente personalizada

La `cartera inteligente personalizada` es una `cartera inteligente` que fue diseñada para ejecutar lógica personalizada después de cada transacción. La lógica personalizada se crea en el momento del despliegue del contrato y se puede ejecutar en cada transacción.

### Gestor de relés

Un EOA que tiene un saldo apostado. Cualquier penalización realizada contra un Trabajador de relevo afecta a la apuesta del Gestor de relevo. Un trabajador de relevo sólo puede ser gestionado por un gestor de relevo. Un gestor de retransmisiones puede tener uno o varios trabajadores de retransmisión. Las responsabilidades del Gestor de Retransmisiones son: registrar el Servidor de Retransmisiones y añadir Trabajadores de Retransmisiones, ambos en el Hub de Retransmisiones.

### Gestor de participaciones

El Stake Manager soporta múltiples Relay Hubs, los stakers son los Relay Managers y pueden autorizar/desautorizar Relay Hubs específicos para poder penalizar a los managers si es necesario. La criptomoneda apostada se mantiene en el contrato StakeManager.

La cuenta que apuesta por primera vez por un Gestor de Retransmisiones específico se convierte en la propietaria de la apuesta, y sólo esta cuenta puede realizar apuestas posteriores para este Gestor de Retransmisiones específico.

Cuando un Gestor de Retransmisiones desautoriza un Centro de Retransmisiones, significa que se desestablece de él, lo que también significa que ya no puede retransmitir a través de ese centro. Cualquier saldo que haya en el Centro de Retransmisión se envía al remitente original de la participación (el propietario). Además, los saldos de los trabajadores se transfieren al propietario de la participación y, si está configurado, el saldo del gestor de retransmisión también se puede transferir al propietario de la participación.

El desenganche tiene un retardo predefinido (en bloques). Con ello se pretende evitar que el gestor de retransmisiones se desasocie antes de un corte que se iba a producir.

### Trabajador de relevo

Un EOA que pertenece a un solo Gestor de Retransmisión. Dado que el Trabajador de Retransmisión es el remitente de la solicitud, es el que paga las tasas de gas de cada transacción. También **puede** cobrar las tasas en ERC20 que se cobran por retransmitir las transacciones.

### Verificador de retransmisión y despliegue

Contratos que autorizan una solicitud específica de retransmisión o despliegue (véase la sección [Solicitudes de retransmisión y despliegue](#solicitudes-de-transmisión-despliegue)).

Se ofrecen dos ejemplos de aplicación:

- **Verificador de relés**: El Verificador de Retransmisión tiene una lista de fichas que acepta. Cuando recibe una solicitud de retransmisión, comprueba la aceptación del token y el saldo del pagador para el token.
- **Verificador de despliegue**: Implementación utilizada en el proceso de despliegue de SmartWallet. Realiza las mismas comprobaciones del verificador de retransmisión, pero también se asegura de que el SmartWallet que se va a desplegar no existe ya. También comprueba que se proporciona una dirección de fábrica de proxy en la solicitud de retransmisión.

### Colector

El recaudador es un contrato inteligente opcional que se utiliza para la función de reparto de ingresos. Normalmente, las comisiones de retransmisión se pagan a la cuenta del trabajador que retransmite la transacción.

Los contratos colectores están diseñados para retener los ingresos generados por las transacciones retransmitidas, de modo que en el futuro puedan ser entregados a los socios de acuerdo con la distribución de participaciones escrita en el contrato. Se inicializan con un token específico que retener, un conjunto de direcciones de socios (cada conjunto con su propia cuota de ingresos recaudados) más un propietario que puede modificar las cuotas o ejecutar la retirada y distribución de fondos. Las participaciones de cada socio se expresan en números enteros que representan un porcentaje y deben sumar exactamente 100. Se puede especificar cualquier número de socios. Se puede especificar cualquier número de socios.

El propietario del contrato puede ser cualquier dirección, incluyendo pero no limitándose a un contrato multisig (ver [Gnosis Safe Contracts](https://github.com/gnosis/safe-contracts)). Utilizar una dirección multisig puede ser una buena idea si es necesario compartir la propiedad del contrato, de forma que decisiones como la distribución de las cuotas cobradas a los socios o la modificación de las cuotas de ingresos puedan tomarse de forma colectiva. También existe una función de transferencia de propiedad.

Se puede desplegar cualquier número de contratos de recaudación y utilizarlos para compartir ingresos, siempre que sus direcciones se especifiquen en las solicitudes de retransmisión. La retirada de fondos de cualquier contrato de recaudación es completamente independiente del flujo de retransmisión de RIF y puede ejecutarse en cualquier momento arbitrario.

Para obtener información sobre cómo implementar un contrato de recopilador (además de otros detalles técnicos), consulte [la sección del recopilador](/developers/integrate/rif-relay/deployment) del proceso de implementación.

### Apoderados

#### Plantilla

Es la lógica que se ejecutaría en cada transacción. En este escenario concreto, es el contrato Smart Wallet.

#### Fábrica de proxy

Fábrica de Proxies a la SmartWallet. La fábrica de proxies se encarga de desplegar los contratos de smart wallets utilizando la plantilla, durante el despliegue ejecuta la inicialización desde cada smart wallet.

#### Proxy

El proxy sólo se implementa en la Cartera Inteligente Personalizada porque delega cada llamada a una dirección lógica de SmartWallet. Este proxy es el que se instanciará por SmartWallet, y recibirá la dirección de SmartWallet como Copia Maestra (MC). Así, cada llamada realizada a este proxy terminará ejecutando la lógica definida en la MC.

Para la ejecución de la transacción (llamada `execute()`), la lógica MC realizará la verificación de la firma y el pago. A continuación, ejecutará la solicitud y, si se ha definido una lógica personalizada, le reenviará el flujo antes de regresar.

Durante la inicialización del monedero inteligente personalizado se puede establecer una lógica personalizada (que afectaría al estado del proxy, por supuesto), el proceso de inicialización y el establecimiento de la lógica personalizada sólo se puede hacer durante el despliegue del monedero inteligente.

### GSNEip712Biblioteca

Se trata de una biblioteca auxiliar que convierte la solicitud de retransmisión en una llamada a una cartera inteligente o a una fábrica de proxy (en tal caso, la solicitud es una solicitud de despliegue).

Encontrará documentación detallada [aquí](https://eips.ethereum.org/EIPS/eip-712).

## Componentes fuera de la cadena

### Servidor de retransmisión

El servidor de retransmisión recibe transacciones patrocinadas a través de HTTP.

El servidor sólo tiene una dirección de Relay Manager y al menos un Relay Worker, y apunta a un único Relay Hub.
Cuando el Servidor de Retransmisión recibe una solicitud de Retransmisión HTTP, crea un Sobre, envolviendo la transacción patrocinada, lo firma utilizando su cuenta de Trabajador de Retransmisión y luego lo envía al contrato del Hub de Retransmisión.

El servidor es un demonio de servicio que funciona como un servicio HTTP. Se anuncia a sí mismo (a través del concentrador de retransmisión) y espera las peticiones de los clientes.

El Servidor de Retransmisión dispone de mecanismos que intentan evitar que se agote el saldo de los trabajadores. El Relay Manager sigue enviando criptomoneda nativa a los trabajadores en función de un saldo mínimo específico.

#### Iniciar flujo

El diagrama de flujo de inicio representa el proceso que sigue el Servidor Relay para comenzar a recibir peticiones, aun que el servidor este recibiendo peticiones no significa que pueda manejarlas, ya que necesita balance para procesar cada petición.
Relay - Flujo de Inicio](/img/rif-relay/start.jpg)

1. Genera (claves privadas) las cuentas de los Trabajadores y del Gestor.
2. Inicializa la instancia para cada contrato que vaya a interactuar con el servidor.

- El contrato RelayHub es el contrato clave para el flujo de inicio, ya que es el contrato que tiene los eventos de interés.

3. Initalizar el Servidor de Retransmisión.
   -El Servidor de Retransmisión tiene toda la lógica para la interacción entre los componentes fuera de la cadena y dentro de la cadena.
4. Inicializar el RegistationManager.

- El Gestor de Registro empieza a buscar eventos relacionados con el proceso de registro (StakeAdded, WorkerAdded) para identificar si se puede registrar el Servidor en el RelayHub.

5. El servidor de retransmisión empieza a buscar cambios en la cadena de bloques mediante RelayHub.

#### Flujo de registros

El diagrama de flujo de registro representa el proceso para proporcionar el stake/balance necesario al gestor/trabajadores para que el Servidor de Retransmisión empiece a procesar peticiones y para registrar el servidor en el RelayHub.

Relé - Flujo de registro](/img/rif-relay/register.jpg)

1. Obtiene los datos del Servidor de Retransmisión.
2. Valida si el servidor ya estaba registrado en el RelayHub.
3. Inicializa la instancia para cada contrato que vaya a interactuar con el servidor.

- El contrato RelayHub es el contrato clave para el flujo de registro ya que es el contrato que tiene los eventos de interés.

4. Consulta el stakeInfo del gestor y valida si ya está apostado.
5. Financie al gestor si es necesario.

### Controlador de intervalos

El diagrama del manejador de intervalos representa el proceso del Servidor de retransmisión para interactuar con la cadena de bloques y procesar las transacciones.

Relé - Flujo del controlador de intervalos](/img/rif-relay/interval-handler.jpg)

1. Obtenga el último bloque minado por la cadena de bloques.
2. Comprueba si es necesario actualizar el estado del Servidor de retransmisión en función de los bloques acuñados.
3. Refresca el precio de la gasolina.
4. Obtén los eventos pasados del RelayHub.
5. Añade los trabajadores y registra el Servidor de Retransmisión si cumple los requisitos.
6. Siga atento a las transacciones y a los nuevos acontecimientos.

### Solicitudes de retransmisión y despliegue

Una solicitud de retransmisión es la transacción patrocinada, la estructura utilizada para retransmitir una transacción. Está formada por Relay Data y Forward Request:

- **Datos de retransmisión**: Toda la información necesaria para retransmitir la solicitud de reenvío definida.
- **Solicitud de reenvío/despliegue**: Está formada por todos los campos "comunes" de la transacción además de todos los datos del token-pago.

Cuando el patrocinador crea un sobre (la transacción real de blockchain que se va a enviar), añadirá esta solicitud de retransmisión (transacción patrocinada) como parte de los datos codificados, junto con el contrato y el método a llamar (RelayHub y relayCall respectivamente).

La **Solicitud de retransmisión** es una estructura que envuelve la transacción enviada por un usuario final. Incluye los datos necesarios para retransmitir la transacción, como la dirección del pagador, la dirección del solicitante original y los datos del pago simbólico.

La estructura **Deploy request** que envuelve la transacción enviada para desplegar un monedero inteligente.

### Herramientas

### Cliente de retransmisión

Se trata de una biblioteca typescript para interactuar con el sistema de relés RIF. Proporciona APIs para encontrar un relé, y para enviar transacciones a través de él. También expone métodos para interactuar con la cadena de bloques.

Puede funcionar como punto de acceso al sistema de retransmisión. Crea, firma y envía la transacción patrocinada, que es firmada por el solicitante y reenviada al servidor de retransmisión mediante el protocolo HTTP.

No es _estrictamente_ necesario ya que cualquier dApp o usuario podría retransmitir transacciones utilizando simplemente un Servidor de Retransmisión y los contratos inteligentes, aunque esto es posiblemente más difícil de hacer manualmente.

### Proveedor de retransmisión

Es el punto de acceso al sistema RIF Relay. Envuelve el `Relay Client` para la compatibilidad con el proveedor Ethers.js.

## Flujo de ejecución

### Retransmisión (Cartera inteligente ya desplegada)

Relé - Flujo de ejecución](/img/rif-relay/execution.jpg)

1. Un solicitante crea una petición.
2. Un Solicitante envía la solicitud al Cliente de Retransmisión (a través de un Proveedor de Retransmisión).
3. El cliente de retransmisión envuelve la solicitud en una solicitud de retransmisión y la firma.
4. El Cliente de Retransmisión envía la Solicitud de Retransmisión al Servidor de Retransmisión (a través de Cliente HTTP ↔ Servidor HTTP).
5. El Servidor de Retransmisión crea una transacción que incluye la Solicitud de Retransmisión y la firma con una cuenta de Trabajador de Retransmisión.
6. La cuenta Relay Worker es un EOA registrado en el Relay Hub.
7. El Servidor de Retransmisión envía la transacción al Centro de Retransmisión utilizando la misma cuenta de trabajador que en el paso anterior, ejecutando la función `relayCall` del contrato del Centro de Retransmisión.
   - Cuando el Centro de Retransmisión recibe una transacción de un Trabajador de Retransmisión, verifica con el Gestor de Participaciones que el Gestor de Retransmisiones del Trabajador ha bloqueado los fondos para la participación. Si no es así, se revierte la ejecución.
   - La cuenta del relevista debe tener fondos para pagar el gas consumido (RBTC).
     - Esta verificación se realiza en el cliente de retransmisión y también en el servidor de retransmisión, llamando al verificador de retransmisión. El verificador comprueba que acepta el token utilizado para pagar y que el pagador tiene un saldo de tokens suficiente. Además, verifica que el monedero inteligente utilizado es el correcto.
8. El RelayHub indica a la Cartera Inteligente que ejecute la Solicitud de Retransmisión a través de la biblioteca [GsnEip712Library](#gsneip712library).
9. La Cartera Inteligente comprueba la firma y el nonce del Solicitante, revirtiendo si falla las comprobaciones.
10. A continuación, la cartera inteligente realiza la transferencia de tokens entre el solicitante y el destinatario de tokens, utilizando los datos recibidos en la solicitud de retransmisión.
11. Invoca el contrato del destinatario con el método indicado en la solicitud de reenvío.

### Despliegue patrocinado de la cartera inteligente

Relay - Billetera inteligente patrocinada](/img/rif-relay/relay.jpg)

El solicitante sin gas tiene una dirección SmartWallet donde recibe los tokens pero no los utiliza. Si el solicitante necesita llamar a un contrato, por ejemplo, para enviar los tokens a otra cuenta, debe desplegar primero una Smart Wallet.

1. Un solicitante crea una solicitud de despliegue de cartera.
2. Un Solicitante envía la solicitud al Servidor de Retransmisión a través del Cliente de Retransmisión.
3. El Cliente de Retransmisión envuelve la transacción enviada por el Solicitante en una Solicitud de Despliegue para crear la Cartera Inteligente y la firma.
4. El Cliente de Retransmisión envía al Servidor de Retransmisión una Solicitud de Despliegue (a través de Cliente HTTP ↔ Servidor HTTP).
5. El servidor de retransmisión firma la transacción que contiene la solicitud de despliegue con la cuenta del trabajador de retransmisión.
6. El Servidor de Retransmisión envía la solicitud al Centro de Retransmisión utilizando la cuenta del Trabajador de Retransmisión que ejecuta la función `relayCall` del contrato del Centro de Retransmisión.

- Aquí es donde el Servidor de Retransmisión normalmente llamará al Verificador de Despliegue para asegurarse:
  - El Verificador acepta las fichas ofrecidas.
  - El verificador conoce la instancia de fábrica de proxy que debe utilizarse.
  - El contrato Proxy Factory no está creando una Cartera Inteligente existente.
  - El solicitante tiene suficientes fichas para pagar.

7. El Relay Hub llama a la Proxy Factory utilizando el método `relayedUserSmartWalletCreation`.
8. La fábrica de proxy realiza las siguientes comprobaciones:
   - Comprueba el nonce del remitente.
   - Comprueba la firma de la solicitud de despliegue.
9. La Fábrica de Proxy crea la Cartera Inteligente utilizando el opcode `create2`.
10. A continuación, llama a la función `initialize` del contrato Smart Wallet.
    - La Cartera Inteligente, durante su inicialización, ejecuta la transferencia de tokens.
    - A continuación, inicializa el estado de la Cartera Inteligente y establece el EOA del solicitante como propietario de la Cartera Inteligente.
    - En el caso de que exista una lógica personalizada, también se llama a su inicialización.

## Obsoleto

### Pagador

La versión 0.2 eliminó los contratos Paymaster en favor de los Verificadores (véase [versions](/developers/integrate/rif-relay/versions/)).
