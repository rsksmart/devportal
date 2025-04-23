---
sidebar_label: Configurar nodo en Ubuntu
sidebar_position: 300
title: Configurar nodo en Ubuntu
tags:
  - ubuntu
  - instalar
  - rsk
  - rskj
  - nodo
  - cómo
  - red
  - requisitos
  - red principal
description: Instalar RSKj en Ubuntu.
---

Asegúrese de que su sistema cumpla con los [requisitos mínimos](/node-operators/setup/requirements/) antes de instalar los nodos Rootstock.

## Vídeo

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Instalar a través de Ubuntu Package Manager

La forma más fácil de instalar y ejecutar un nodo Rootstock en Ubuntu es hacerlo a través del Administrador de paquetes Ubuntu.

Escriba los siguientes comandos para instalar RSKj en Ubuntu usando nuestras PPAs para Ubuntu.

La clave pública de repo instalada Fingerprint es `5EED 9995 C84A 49BC 02D4 F507 DF10 691F 518C 7BEA`. Además, la clave pública se pudo encontrar en el documento [Ubuntu Key Server](https://keyserver.ubuntu.com/).

```shell
$ sudo add-apt-repository ppa:rsksmart/rskj
$ sudo apt-get update
$ sudo apt-get install rskj
```

Durante la instalación, se le pedirá que acepte los términos y confirme la red.

<img alt="" class="setup-node-ubuntu" src="/img/ubuntu/ubuntu1.png"></img>

Elija Sí e ingrese para aceptar la licencia para continuar

<img alt="choose mainnet" class="setup-node-ubuntu" src="/img/ubuntu/ubuntu2.png"></img>

Elige `mainnet` y presiona `Enter` para continuar

## Instalar a través de descargas directas

You can also download the RSKj Ubuntu Package for the latest RSKj release `LOVELL 7.0.0` and install it with the `dpkg` command. Follow this [download link](https://launchpad.net/~rsksmart/+archive/ubuntu/rskj/+packages) to download the matching package for your ubuntu system.

```shell
# first install openjdk-17-jre or oracle-java17-installer
sudo apt-get install openjdk-17-jre

# download the RSKj package and find the file rskj-6.5.0~UBUNTU_VERSION_NAME_amd64.deb

# run this command in the same directory as the deb file above
dpkg -i rskj-6.5.0~UBUNTU_VERSION_NAME_amd64.deb
```

Le recomendamos que compruebe que el hash SHA256 del archivo de paquete descargado coincide, antes de la instalación:

- `rskj_2.0.1_bionic_amd64.deb`: `b2f0f30ac597e56afc3269318bbdc0a5186f7c3f7d23a795cf2305d7c7b12638`
- `rskj_2.0.1_bionic_i386.deb`: `3ca031ee133691ed86bb078827e8b2d82600d7bbd76194358289bbc02385d971`
- `rskj_2.0.1_trusty_amd64.deb`: `4c56d8d0ed0efc277afe341aa7026e87f47047ff69bd6dd99296c5ecab1fa550`
- `rskj_2.0.1_trusty_i386.deb`: `e5cb7b72e4aff8be4cbcd5d1e757e1fda463f1565154ae05395fcf1796ecf9fb`
- `rskj_2.0.1_xenial_amd64.deb`: `70c245388a7f521b96905bf49b93e38f58c54970e4e4effa36d7f2b0a2aa8ef4`
- `rskj_2.0.1_xenial_i386.deb`: `f067301454eb5976bbf00052ccd6523b1ee61f6aeb33ef4ea6fcb07ff0328668`

## Después de la instalación

Por defecto, el nodo se conecta a la red principal. Para cambiar la opción de red (Mainnet/ Testnet/ Regtest), consulte las instrucciones en [switching networks](/node-operators/setup/configuration/switch-network). Para cambiar las configuraciones del nodo, consulte las instrucciones en [Configuración de Nodo Rootstock](/node-operators/setup/configuration/).

El instalador configurará su nodo en las siguientes rutas:

- `/etc/rsk`: el directorio donde se ubicarán los archivos de configuración.
- `/usr/share/rsk`: el directorio donde se ubicará el JAR de RSKj.
- `/var/lib/rsk/database`: el directorio donde se almacenará la base de datos.
- `/var/log/rsk`: el directorio donde se almacenarán los registros.

<img alt="path" class="setup-node-ubuntu" src="/img/ubuntu/ubuntu3.png"></img>

### Iniciar/Detener el nodo

Después de la instalación, puede utilizar los siguientes comandos para gestionar su nodo.

**Para iniciar el nodo:**

```shell
inicio del servicio sudo rsk
```

**Para detener el nodo:**

```shell
parada rsk de servicio sudo
```

**Para reiniciar el nodo:**

```shell
reinicio rsk del servicio sudo
```

**Para comprobar el estado del servicio de nodo:**

```shell
sudo service rsk status
```

<img alt="scripts" class="setup-node-ubuntu" src="/img/ubuntu/ubuntu4.png"></img>
