---
sidebar_label: 퀵스타트
sidebar_position: 4
title: 퀵스타트
tags:
  - rsk
  - rootstock
  - 초급자
  - 퀵스타트
  - 개발자
  - 숙련자
  - Rootstock으로 포팅
  - 튜토리얼
description: Rootstock에서 개발할 수 있도록 도와주는 퀵스타트, 데모, 스타터 키트.
---

```mdx-code-block
<Filter
values={[
{label: '초급자', value: 'beginner'},
{label: '숙련자', value: 'advanced'},
{label: 'Hardhat', value: 'hardhat'},
{label: 'Remix', value: 'remix'},
{label: 'Wagmi', value: 'wagmi'},
{label: 'Reown', value: 'reown'},
{label: '온체인 데이터', value: 'data'},
{label: 'RPC API', value: 'rpc'},
{label: 'Rootstock으로 포팅', value: 'port-dapps'}
]}>
<FilterItem
    value="beginner, Advanced"
    title="Vyper 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/rootstock-vyper/"
    linkTitle="키트 사용"
    description="Rootstock Vyper 스타터 키트는 Vyper로 작성한 스마트 컨트랙트를 Rootstock 네트워크에 배포하는 방법을 보여줍니다."
  />
<FilterItem
    value="beginner, Advanced"
    title="Privy 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/privy/"
    linkTitle="키트 사용"
    description="Rootstock Privy 스타터 키트는 개발자가 소셜 로그인을 통해 사용자를 온보딩하면서도, 사용자가 직접 지갑을 관리할 수 있도록 지원합니다. 이를 통해 dApp은 Rootstock 위에서 개발할 때 사용자에 대한 제어권, 프라이버시, 유연성을 모두 유지할 수 있습니다."
  />
<FilterItem
    value="dynamic, wagmi, advanced"
    title="Dynamic 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/dynamic/"
    linkTitle="키트 사용"
    description="Dynamic 스타터 키트는 Wagmi 라이브러리를 사용해 Web3 기능을 Next.js 애플리케이션에 더 빠르게 연동할 수 있도록 도와줍니다."
  />
<FilterItem
    value="beginner, web3auth, advanced"
    title="Web3Auth 스타터 키트"
    subtitle="Web3Auth"
    color="orange"
    linkHref="/developers/quickstart/web3auth/"
    linkTitle="시작하기"
    description="Web3Auth와 Wagmi를 사용해, 소셜 로그인 기반 dApp을 Rootstock에 구축하고 배포하는 단계별 가이드입니다."
  />
<FilterItem
    value="wagmi, beginner"
    title="Wagmi 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/wagmi/"
    linkTitle="키트 사용"
    description="이 스타터 키트는 React, Wagmi, Shadcn 라이브러리를 사용해 Rootstock 블록체인 위에 탈중앙화 애플리케이션(dApp)을 개발할 수 있는 기반을 제공합니다."
  />
<FilterItem
    value="reown, beginner"
    title="Reown 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/reown/"
    linkTitle="키트 사용"
    description="이 스타터 키트는 React, Reown, Wagmi, Shadcn 라이브러리를 활용해 Rootstock 블록체인 위에 탈중앙화 애플리케이션(dApp)을 개발할 수 있는 기반을 제공합니다."
  />
<FilterItem
    value="hardhat, beginner"
    title="Hardhat 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/hardhat/"
    linkTitle="키트 사용"
    description="ERC20, ERC721, ERC1155 등 대표적인 ERC 표준을 기반으로 한 스마트 컨트랙트 예제, 테스트, 배포 스크립트, 그리고 관련 작업들을 제공합니다."
  />
<FilterItem
    value="hardhat, beginner"
    title="Hardhat Ignition 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/hardhat-ignition/"
    linkTitle="키트 사용"
    description="이 가이드는 Hardhat Ignition을 활용해 스마트 컨트랙트를 Rootstock 블록체인에 배포하는 과정을 쉽게 따라할 수 있도록 구성되어 있습니다."
  />
<FilterItem
    value="foundry, sc, beginner"
    title="Foundry 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/foundry/"
    linkTitle="키트 사용"
    description="ERC20, ERC721, ERC1155 등 대표적인 ERC 표준을 기반으로 한 스마트 컨트랙트 예제, 테스트, 배포 스크립트, 그리고 관련 작업들을 제공합니다."
  />
<FilterItem
    value="wagmi, sc, advanced"
    value="wagmi, advanced"
    title="계정 추상화 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/quickstart/rootstock-etherspot/"
    linkTitle="키트 사용"
    description="Etherspot을 사용한 계정 추상화 스타터 키트"
  />
<FilterItem
    value="advanced"
    title="Cucumber를 사용한 dApp 자동화"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/resources/tutorials/dapp-automation-cucumber/"
    linkTitle="dApp 자동화"
    description="Cucumber 애자일 자동화 프레임워크를 활용해 dApp을 자동화하는 방법을 배워보세요."
  />
<FilterItem
    value="advanced"
    title="RIF 릴레이 스타터 키트"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/developers/integrate/rif-relay/sample-dapp/"
    linkTitle="키트 사용"
    description="RIF 릴레이 위에서 개발할 수 있도록 도와주는 스타터 키트입니다."
  />
<FilterItem
    value="data, advanced"
    title="The Graph 시작하기"
    subtitle="퀵스타트"
    color="orange"
    linkHref="/dev-tools/data/thegraph/"
    linkTitle="시작하기"
    description="탈중앙화된 인덱서 네트워크를 통해 온체인 데이터를 손쉽게 조회할 수 있습니다."
  />
<FilterItem
    value="beginner"
    title="Web3.py 시작하기"
    subtitle="Web3.py"
    color="orange"
    linkHref="/developers/quickstart/web3-python/"
    linkTitle="시작하기"
    description="Web3.py를 사용해 Rootstock에서 스마트 컨트랙트를 배포하고 상호작용해보세요."
  />
<FilterItem
    value="beginner, advanced, port-dapps"
    title="이더리움 dApp을 Rootstock으로 포팅하기"
    subtitle="dApp 포팅"
    color="orange"
    linkHref="/resources/port-to-rootstock/ethereum-dapp"
    linkTitle="시작하기"
    description="이더리움 dApp을 Rootstock으로 포팅하는 방법을 알아보세요."
  />
<FilterItem
    value="beginner, remix"
    title="Remix와 Rootstock 익스플로러를 사용해 스마트 컨트랙트 배포, 상호작용, 검증하기"
    subtitle="Remix"
    color="orange"
    linkHref="/developers/quickstart/remix/"
    linkTitle="Remix 사용"
    description="이 가이드에서는 Remix IDE를 사용해 스마트 컨트랙트를 작성하고, 컴파일하고, Rootstock 익스플로러를 통해 배포, 상호작용, 검증하는 방법을 다룹니다."
  />
<FilterItem
    value="beginner, advanced"
    title="Apeworx 시작하기"
    subtitle="Ape"
    color="orange"
    linkHref="/developers/quickstart/ape/"
    linkTitle="Ape 사용"
    description="Ape 프레임워크를 사용해 Rootstock에서 스마트 컨트랙트를 컴파일하고 배포하며 상호작용하는 방법을 알아보세요."
  />
<FilterItem
    value="beginner, rpc"
    title="Rootstock RPC API 시작하기"
    subtitle="RPC API"
    color="orange"
    linkHref="/developers/rpc-api/rootstock/setup/"
    linkTitle="RPC API 사용"
    description="Rootstock RPC 서비스는 개발자가 JSON-RPC 메서드를 통해 Rootstock 노드와 쉽고 직관적으로 상호작용할 수 있도록 웹 인터페이스를 제공합니다."
  />
<FilterItem
    value="beginner, rpc"
    title="Alchemy 시작하기"
    subtitle="RPC API"
    color="orange"
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="RPC API 사용"
    description="개발자가 Alchemy RPC Provider 서비스를 사용해 Rootstock 네트워크와 상호작용할 수 있도록 단계별로 안내하는 가이드입니다."
  />
</Filter>


















```
