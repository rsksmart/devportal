---
sidebar_label: Cadena de Seguridad
sidebar_position: 8
title: Verificar cadena de seguridad del código fuente de RSKj
tags:
  - rsk
  - rskj
  - nodo
  - seguridad
  - operadores de nodos
  - construcciones reproducibles
  - verificación
description: "Todas las diferentes maneras en que puede verificar RSKj: Firmar clave, huellas dactilares de la clave pública, SHA256SUMS.asc, dependencias binarias, script de entorno seguro"
---

## Verificar la autenticidad del código fuente RSKj y sus dependencias binarias

La autenticidad del código fuente debe ser verificada comprobando la firma de las etiquetas de lanzamiento en el repositorio oficial de Git. Vea [Construcciones reproducibles](/node-operators/setup/reproducible-build/). La autenticidad de las dependencias binarias es verificada por Gradle después de seguir los pasos siguientes para instalar los plugins necesarios.

### Descargar clave pública de lanzamiento Rootstock

Para el sistema operativo Linux (Ubuntu por ejemplo), se recomienda instalar `curl` y `gnupg-curl` para descargar la clave a través de HTTPS.

Recomendamos usar GPG v1 para descargar la clave pública porque GPG v2 encuentra problemas al conectarse a servidores de claves HTTPS. También puedes descargar la clave usando `curl`, `wget` o un navegador web, pero siempre comprueba la huella digital antes de importarla.

```bash
gpg --keyserver https://secchannel.rsk.co/SUPPORT.asc --recv-keys A6DBEAC640C5A14B
```

Deberías ver la salida a continuación:

```text
Salida:
gpg: clave A6DBEAC640C5A14B: "IOV Labs Support <support@iovlabs.org>" importado
gpg: Número total procesado: 1
gpg: importado: 1 (RSA: 1)
```

## Verificar la huella digital de la clave pública

```bash
gpg --finger A6DBEAC640C5A14B
```

La salida debería verse así:

```text
Salida:
pub rsa4096 2022-05-11 [C]
1DC9 1579 9132 3D23 FD37 BAA7 A6DB EAC6 40C5 A14B
uid [ unknown] IOV Labs Support <support@iovlabs.org>
sub rsa4096 2022-05-11 [S]
sub rsa4096 2022-05-11 [E]
```

## Verificar la firma de SHA256SUMS.asc

El archivo `SHA256SUMS.asc` está firmado con la clave pública Rootstock e incluye los haskeys SHA256 de los archivos necesarios para iniciar el proceso de compilación.

_Note: Asegúrate de `cd` en el directorio [`rskj`](https://github.com/rsksmart/rskj) antes de ejecutar los siguientes comandos.

```bash
gpg --verify SHA256SUMS.asc
```

La salida debería verse así:

```text
Output:
gpg: Signature made Wed May 11 10:50:48 2022 -03
gpg: using RSA key 1F1AA750373B90D9792DC3217997999EEA3A9079
gpg: Good signature from "IOV Labs Support <support@iovlabs.org>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg: There is no indication that the signature belongs to the owner.
Primary key fingerprint: 1DC9 1579 9132 3D23 FD37  BAA7 A6DB EAC6 40C5 A14B
Subkey fingerprint: 1F1A A750 373B 90D9 792D  C321 7997 999E EA3A 9079
```

_Nota:_ Aprende más sobre [Gestión de claves](https://www.gnupg.org/gph/en/manual/x334.html) aquí.

## Verificación de dependencias binarias

La autenticidad del script `configure.sh` se marca usando el comando `sha256sum` y el archivo `SHA256SUM.asc` firmado. El script se utiliza para descargar y comprobar la autenticidad de los complementos Gradle Wrapper y Gradle Witness. Después de instalar estos plugins, Gradle comprueba la autenticidad del resto de las dependencias binarias.

Linux - Windows (consola bash)

````mdx-code-block
<Tabs>
  <TabItem value="linux" label="Linux" default>
    ```bash
    sha256sum --check SHA256SUMS. sc
    ```
  </TabItem>
  <TabItem value="mac" label="Mac OSX">
   ```bash
  shasum --check SHA256SUMS. sc
   ```
  </TabItem>
</Tabs>
````

## Ejecutar script configure para configurar entorno seguro

````mdx-code-block
<Tabs>
  <TabItem value="linux" label="Linux, Mac OSX" default>
    ```bash
    ./configure.sh
    ```
  </TabItem>
</Tabs>
````
