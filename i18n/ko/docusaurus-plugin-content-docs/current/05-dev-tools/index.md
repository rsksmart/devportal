---
sidebar_position: 1
title: 개발자 도구 및 인프라
sidebar_label: 모든 도구
tags:
  - rsk
  - rootstock
  - 도구
  - 개발자 도구
description: Rootstock에서 스마트 컨트랙트를 개발하고 배포하는 데 필요한 도구와 언어들을 엄선해 소개합니다. 익숙한 Solidity부터 Rust, Hardhat과 같은 개발 환경까지, 스마트 컨트랙트와 상호작용하고 배포하는 데 필요한 모든 것을 이곳에서 확인할 수 있습니다.
---

```mdx-code-block
<Filter
  values={[
    {label: '브릿지', value: 'bridge'},
    {label: '스타터 키트', value: 'demos'},
    {label: '거래소', value: 'exchange'},
    {label: '지갑', value: 'wallet'},
    {label: '탐색기', value: 'explorer'},
    {label: '플랫폼 및 인프라', value: 'platform-infra'},
    {label: '크로스체인', value: 'cc'},
    {label: '데이터', value: 'data'},
    {label: 'SDK', value: 'sdk'},
    {label: 'Faucet', value: 'faucet'},
    {label: '가스', value: 'gas'},
    {label: '개발 환경', value: 'dev-environment'},
    {label: '계정 추상화', value: 'aa'},
    {label: '코드 품질', value: 'code-quality'},
    {label: 'JSON-RPC', value: 'rpc'},
    {label: '라이브러리', value: 'library'},
    {label: '노코드', value: 'no-code'},
    {label: 'RIF 툴', value: 'rifp'},
    {label: '스마트 컨트랙트', value: 'sc'},
    {label: '마이닝', value: 'mine'},
    {label: '오라클', value: 'oracles'},
    {label: '검증', value: 'attest'},
  ]}>
<FilterItem
    value="bridge, exchange"
    title="PowPeg 앱"
    subtitle="브릿지"
    color="orange"
    linkHref="/resources/guides/powpeg-app/"
    target="_blank"
    linkTitle="문서"
    description="PowPeg 앱을 사용해 비트코인과 Rootstock 간 자산을 브릿지하세요."
  />
<FilterItem
    value="bridge, cc"
    title="토큰 브릿지"
    subtitle="브릿지"
    color="orange"
    linkHref="/resources/guides/tokenbridge/"
    target="_blank"
    linkTitle="문서"
    description="토큰 브릿지를 사용해 ERC20 토큰을 Ethereum과 Rootstock 간에 안전하고 간편하게 이동하세요.."
  />
<FilterItem
    value="dev-environment, sc, platform-infra"
    title="Foundry"
    subtitle="개발 환경"
    color="orange"
    linkHref="https://dev.rootstock.io/dev-tools/foundry/"
    linkTitle="스마트 컨트랙트 배포"
    description="Foundry는 Solidity로 스마트 컨트랙트를 작성하고 테스트할 수 있는 사용자 친화적인 개발 환경이자, 스마트 컨트랙트 개발을 위한 툴체인입니다."
  />
<FilterItem
    value="dev-environment, sc"
    title="Hardhat"
    subtitle="개발 환경"
    color="orange"
    linkHref="/dev-tools/dev-environments/hardhat/"
    linkTitle="스마트 컨트랙트 배포"
    description="Hardhat은 개발자를 위한 이더리움 개발 환경으로, Rootstock 및 EVM 호환 체인에서 스마트 컨트랙트를 개발할 때 주로 사용됩니다."
  />
<FilterItem
    value="explorer, sc"
    title="Blockscout 익스플로러"
    subtitle="익스플로러"
    color="orange"
    linkHref="/dev-tools/explorers/blockscout/"
    linkTitle="익스플로러 사용"
    description="Blockscout는 Rootstock을 포함한 모든 EVM 체인의 트랜잭션을 조회할 수 있는 오픈소스 탐색 도구입니다."
  />
<FilterItem
    value="explorer, sc"
    title="Rootstock 익스플로러"
    subtitle="익스플로러"
    color="orange"
    linkHref="/dev-tools/explorers/rootstock/"
    linkTitle="익스플로러 사용"
    description="Rootstock 익스플로러를 통해 트랜잭션, 블록, 주소, 토큰, 통계를 조회하고 스마트 컨트랙트와 상호작용할 수 있습니다."
  />
<FilterItem
    value="explorer, sc"
    title="Rootstock Blockchair"
    subtitle="익스플로러"
    color="orange"
    linkHref="/dev-tools/explorers/blockchair/"
    linkTitle="익스플로러 사용"
    description="Blockchair Explorer는 Rootstock을 포함해 40개 이상의 블록체인을 지원하는 검색 및 분석 엔진입니다. 다양한 블록체인을 하나의 검색 엔진에서 통합적으로 조회할 수 있습니다."
  />
<FilterItem
    value="explorer, sc"
    title="3xpl"
    subtitle="익스플로러"
    color="orange"
    linkHref="/dev-tools/explorers/3xpl/"
    linkTitle="익스플로러 사용"
    description="3xpl(3xplor3r의 약자)은 Rootstock용으로 설계된 매우 빠르고 범용적인 블록 익스플로러입니다. 초보 사용자도 쉽게 이해할 수 있는 직관적인 인터페이스를 제공하며, 개발자와 분석가를 위한 다양한 고급 기능도 함께 지원합니다."
  />
<FilterItem
    value="rpc"
    title="RPC API"
    subtitle="JSON RPC"
    color="orange"
    linkHref="/developers/rpc-api/rootstock/"
    linkTitle="첫번째 API 호출하기"
    description="Rootstock RPC API는 개발자가 JSON-RPC 메서드를 통해 Rootstock 노드와 쉽고 직관적으로 상호작용할 수 있는 웹 인터페이스를 제공합니다."
  />
<FilterItem
    value="rpc"
    title="Alchemy"
    subtitle="JSON RPC"
    color="orange"
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="첫번째 API 호출하기"
    description="Web3 앱을 쉽고 빠르게 개발하고 확장할 수 있도록 돕는 강력한 API, SDK, 그리고 다양한 도구들을 제공합니다."
  />
<FilterItem
    value="rpc, smart contracts"
    title="GetBlock"
    subtitle="JSON RPC"
    color="orange"
    linkHref="/dev-tools/node-rpc/getblock/"
    linkTitle="첫번째 API 호출하기"
    description="GetBlock은 Rootstock, 비트코인(BTC), 이더리움(ETH) 등 다양한 블록체인 노드에 즉시 연결할 수 있는 서비스를 제공합니다."
  />
<FilterItem
    value="rpc, smart contracts"
    title="NOWNodes"
    subtitle="JSON RPC"
    color="orange"
    linkHref="/dev-tools/node-rpc/nownodes/"
    linkTitle="첫번째 API 호출하기"
    description="NOWNodes는 블록체인 풀노드와 Blockbook Explorer에 API를 통해 접속할 수 있도록 지원하는 BaaS(서비스형 블록체인) 솔루션입니다."
  />
<FilterItem
    value="rpc, smart contracts"
    title="dRPC"
    subtitle="JSON RPC"
    color="orange"
    linkHref="/dev-tools/node-rpc/drpc/"
    linkTitle="첫번째 API 호출하기"
    description="dRPC는 분산된 노드 프로바이더 네트워크에 접속할 수 있는 서비스를 제공합니다."
  />
<FilterItem
    value="rpc"
    title="Blast API"
    subtitle="JSON RPC"
    color="orange"
    linkHref="/dev-tools/node-rpc/blast-api/"
    linkTitle="첫번째 API 호출하기"
    description="Blast API는 지연 시간이 짧고 비용 효율적인 RPC 서비스를 제공하는 블록체인 특화 클라우드 인프라입니다."
  />
<FilterItem
    value="wallet, sc"
    title="MetaMask"
    subtitle="지갑"
    color="orange"
    linkHref="/dev-tools/wallets/metamask/"
    linkTitle="MetaMask 사용"
    description="Rootstock 토큰을 생성하고 MetaMask에 추가하는 방법을 알아보세요."
  />
<FilterItem
    value="wallet, sc"
    title="Rootstock 지갑"
    subtitle="지갑"
    color="orange"
    linkHref="/dev-tools/wallets/"
    linkTitle="지갑 사용"
    description="Rootstock의 모든 지갑들을 살펴보세요."
  />
<FilterItem
    value="bridge, exchange"
    title="Sovryn Fast BTC"
    subtitle="브릿지"
    color="orange"
    linkHref="https://wiki.sovryn.com/en/sovryn-dapp/bridge"
    linkTitle="RBTC 받기"
    description="Sovryn은 비트코인 기반의 대출, 차입, 마진 거래를 위한 비수탁형이고 허가 없이 사용할 수 있는 스마트 컨트랙트 시스템입니다."
  />
<FilterItem
    value="bridge, exchange"
    title="RBTC 브릿지"
    subtitle="거래소"
    color="orange"
    linkHref="https://rootstock.io/rbtc/"
    linkTitle="RBTC 받기"
    description="RBTC를 얻을 수 있는 거래소와 브릿지."
  />
<FilterItem
    value="bridge, exchange, rifp"
    title="RIF 거래소"
    subtitle="거래소"
    color="orange"
    linkHref="https://rif.technology/rif-token/"
    linkTitle="RIF 토큰 받기"
    description="RIF 토큰을 얻을 수 있는 거래소와 브릿지.."
  />
<FilterItem
    value="exchange"
    title="RIF 온체인"
    subtitle="거래소"
    color="orange"
    linkHref="https://dapp.rifonchain.com/ipfs/QmWpKDzJ9fUECiiYkGHxqEXKh3CRUEzfvTxYoQonxFBK61/"
    linkTitle="시작하기"
    description="저축하고, 결제하고, 송금할 수 있는 암호화폐 담보 기반 디지털 달러를 손쉽게 이용해보세요. RIF, USDRIF, MOC, RIF Pro 등 다양한 토큰을 지원합니다."
  />
   <FilterItem
    value="sdk"
    title="RSK CLI"
    subtitle="스마트 컨트랙트 개발"
    color="orange"
    linkHref="/developers/smart-contracts/rsk-cli/"
    linkTitle="RSK CLI 시작하기"
    description="rsk-cli 도구(SDK)는 Rootstock 블록체인에서 지갑 관리, 잔액 조회, 트랜잭션 전송, 스마트 컨트랙트 검증 및 상호작용 등을 할 수 있도록 도와주는 도구입니다. Rootstock은 스마트 컨트랙트를 위해 설계된 비트코인 사이드체인이며, rsk-cli는 메인넷과 테스트넷 환경 모두를 지원합니다."
  />
<FilterItem
    value="bridge, exchange, rifp"
    title="RBTC Flyover"
    subtitle="브릿지"
    color="orange"
    linkHref="/developers/integrate/flyover/"
    linkTitle="RBTC 받기"
    description="Flyover 프로토콜은 비트코인과 Rootstock 네트워크 간의 빠른 페그인(peg-in)과 페그아웃(peg-out)을 지원합니다."
  />
<FilterItem
    value="data"
    title="The Graph"
    subtitle="데이터 및 분석"
    color="orange"
    linkHref="/dev-tools/data/thegraph/"
    linkTitle="온체인 데이터 액세스"
    description="dApp을 개발할 때 스마트 컨트랙트의 기록 데이터를 조회해보세요."
  />
<FilterItem
    value="data"
    title="Covalent"
    subtitle="데이터 및 분석"
    color="orange"
    linkHref="https://www.covalenthq.com/docs/networks/rootstock/?utm_source=rootstock&utm_medium=partner-docs"
    linkTitle="온체인 데이터 액세스"
    description="Covalent는 Rootstock을 포함한 100개 이상의 블록체인을 지원하며, 과거부터 현재까지의 온체인 데이터에 접근할 수 있는 호스팅형 블록체인 데이터 솔루션입니다."
  />
<FilterItem
    value="data"
    title="DefiLlama"
    subtitle="데이터 및 분석"
    color="orange"
    linkHref="https://defillama.com/chain/Rootstock"
    linkTitle="온체인 데이터 액세스"
    description="DefiLlama는 DeFi 분야에서 가장 규모가 큰 TVL(총 예치 자산) 집계 플랫폼입니다. 프로토콜이나 플랫폼의 스마트 컨트랙트에 예치된 토큰의 가치를 기준으로 TVL을 계산합니다."
  />
<FilterItem
    value="data"
    title="Tenderly"
    subtitle="데이터 및 분석"
    color="orange"
    linkHref="https://tenderly.co/"
    linkTitle="온체인 데이터 액세스"
    description="Tenderly는 스마트 컨트랙트를 더 빠르고 효율적으로 개발, 모니터링, 개선할 수 있도록 도와주는 도구들을 제공합니다. 개발 생산성을 높이고 시간을 절약하며, 스마트 컨트랙트가 안정적으로 작동하도록 지원합니다."
  />
<FilterItem
    value="platform-infra, sc, sdk"
    title="Thirdweb"
    subtitle="플랫폼"
    color="orange"
    linkHref="https://thirdweb.com/"
    linkTitle="Thirdweb 사용"
    description="Thirdweb은 Rootstock 위에서 개발할 수 있도록 지원하는 풀스택 Web3 개발 도구이자, 프로덕션 수준의 인프라 플랫폼입니다."
  />
 
<FilterItem
    value="platform-infra, sc"
    title="useDApp"
    subtitle="플랫폼"
    color="orange"
    linkHref="https://usedapp.io/"
    linkTitle="useDApp으로 빌딩하기"
    description="useDApp React 라이브러리를 사용해 Rootstock 위에 dApp을 개발하세요."
  />
<FilterItem
    value="no-code, platform-infra, sc"
    title="Forward Protocol"
    subtitle="노코드"
    color="orange"
    linkHref="https://forwardprotocol.io/"
    linkTitle="노코드 dApp 개발"
    description="Forward Protocol의 노코드 툴을 활용해 Rootstock 위에 dApp을 개발하세요."
  />
<FilterItem
    value="no-code, platform-infra, sc"
    title="CryptoDO"
    subtitle="노코드"
    color="orange"
    linkHref="https://www.cryptodo.app/"
    linkTitle="노코드 멀티체인 dApp 개발"
    description="CryptoDo는 기업을 위한 멀티체인 기반의 노코드 Web3 솔루션 빌더입니다."
  />
<FilterItem
    value="library, sdk, rifp, abs"
    title="RIF Relay"
    subtitle="SDK"
    color="orange"
    linkHref="/developers/integrate/rif-relay/"
    linkTitle="RIF Relay 연동"
    description="RIF Relay는 사용자가 ERC-20 토큰으로 트랜잭션 수수료를 지불할 수 있도록 지원하는 안전한 스폰서드 트랜잭션 시스템입니다."
  />
<FilterItem
    value="dev-environment, sc"
    title="Remix"
    subtitle="개발 환경"
    color="orange"
    linkHref="https://remix.ethereum.org/"
    linkTitle="스마트 컨트랙트 배포"
    description="Remix를 사용해 스마트 컨트랙트를 컴파일하고, 상호작용하며, 배포하세요."
  />
<FilterItem
    value="library, sdk, wallet, rifp"
    title="RIF Wallet"
    subtitle="SDK"
    color="orange"
    linkHref="/developers/libraries/rif-wallet-libs/"
    linkTitle="RIF Wallet 연동"
    description="RIF Wallet은 완전하게 프로그래밍 가능하고 확장 가능한 DeFi 지갑으로, 개발자와 기업이 최종 사용자에게 직관적이고 안전한 모바일 중심의 Web3 경험을 제공할 수 있도록 설계되었습니다."
  />
<FilterItem
    value="gas"
    title="Blocknative Gas Price API"
    subtitle="가스"
    color="orange"
    linkHref="/dev-tools/gas/blocknative/"
    linkTitle="가스비 API"
    description="다음 블록의 가스비를 정확하게 예측합니다."
  />
<FilterItem
    value="data"
    title="Rootstock Stats"
    subtitle="데이터 및 분석"
    color="orange"
    linkHref="https://stats.rootstock.io/"
    linkTitle="통계 보기"
    description="Rootstock 통계."
  />
<FilterItem
    value="faucet"
    title="Rootstock Faucet"
    subtitle="faucet"
    color="orange"
    linkHref="https://faucet.rootstock.io/"
    linkTitle="tRBTC 받기"
    description="Rootstock Testnet Faucet에서 tRBTC를 받아보세요."
  />
<FilterItem
    value="faucet, rifp"
    title="RIF Testnet Faucet"
    subtitle="faucet"
    color="orange"
    linkHref="https://faucet.rifos.org/"
    linkTitle="tRIF 받기"
    description="RIF Testnet Faucet에서 tRIF를 받아보세요."
  />
<FilterItem
    value="faucet"
    title="Blast Faucet"
    subtitle="faucet"
    color="orange"
    linkHref="https://blastapi.io/faucets/rootstock-testnet"
    linkTitle="tRBTC 받기"
    description="이 faucet은 개발 및 테스트를 위해 무료 테스트용 RBTC 토큰을 편리하게 받을 수 있는 방법을 제공합니다. 하루 최대 `0.1` tRBTC까지 받을 수 있습니다."
  />
<FilterItem
    value="faucet"
    title="Thirdweb Faucet"
    subtitle="faucet"
    color="orange"
    linkHref="https://thirdweb.com/rootstock-testnet"
    linkTitle="tRBTC 받기"
    description="이 faucet은 개발 및 테스트를 위해 무료 테스트용 RBTC 토큰을 편리하게 받을 수 있는 방법을 제공합니다. 하루 최대 `0.1` tRBTC까지 받을 수 있습니다."
  />
<FilterItem
    value="library, sc"
    title="Ethers.js"
    subtitle="라이브러리"
    color="orange"
    linkHref="https://web3js.readthedocs.io/en/v1.10.0/"
    linkTitle="Ethers.js 라이브러리 사용"
    description="Rootstock 가상 머신(RVM)과 상호작용하기 위한 라이브러리입니다."
  />
<FilterItem
    value="library, sc"
    title="Web3.js"
    subtitle="라이브러리"
    color="orange"
    linkHref="https://docs.ethers.org/v5/"
    linkTitle="Web3.js 라이브러리 사용"
    description="Rootstock 가상 머신(RVM)과 상호작용하기 위한 라이브러리입니다."
  />
<FilterItem
    value="library, sdk, rifp"
    title="RNS"
    subtitle="네임 서비스"
    color="orange"
    linkHref="https://rns.rifos.org/"
    linkTitle="도메인 이름 등록하기"
    description="RNS는 블록체인 주소를 사람이 읽을 수 있는 이름으로 식별할 수 있도록 하는 아키텍처를 제공합니다."
  />
<FilterItem
    value="code-quality, testing, sc"
    title="SolidityScan"
    subtitle="코드 품질"
    color="orange"
    linkHref="https://solidityscan.com/"
    linkTitle="스마트 컨트랙트 보안"
    description="Rootstock에서 스마트 컨트랙트를 안전하게 보호하고, 신뢰할 수 있는 보안 감사 결과와 상세한 리포트를 받아보세요."
  />
<FilterItem
    value="code-quality, testing, sc"
    title="Slither"
    subtitle="코드 품질"
    color="orange"
    linkHref="https://github.com/crytic/slither"
    linkTitle="스마트 컨트랙트 분석"
    description="Slither는 Python3로 작성된 정적 분석 프레임워크로, Solidity와 Vyper 스마트 컨트랙트에 대해 취약점을 탐지하고 코드 이해도를 높이며 맞춤형 분석을 빠르게 시도할 수 있도록 도와줍니다."
  />
<FilterItem
    value="code-quality, testing, sc"
    title="Sourcify"
    subtitle="코드 품질"
    color="orange"
    linkHref="https://sourcify.dev"
    linkTitle="스마트 컨트랙트 검증"
    description="Rootstock에서 스마트 컨트랙트를 검증하세요. Sourcify는 솔리디티 컨트랙트를 자동으로 검증하고 메타데이터를 활용해, 스마트 컨트랙트와의 상호작용을 투명하고 사람이 읽을 수 있는 형태로 제공합니다."
  />
<FilterItem
    value="sc, rollups, aa, platform-infra"
    title="Gelato"
    subtitle="인프라"
    color="orange"
    linkHref="https://gelato.network"
    linkTitle="롤업 배포"
    description="Rootstock 위에 프로덕션 수준의 완전한 서비스형 L2 롤업을 배포하세요. 오라클, 브릿지, 데이터 인덱서, 계정 추상화와 같은 도구들과 기본적으로 통합되어 있습니다."
  />
<FilterItem
    value="mine, platform-infra"
    title="Antpool"
    subtitle="채굴"
    color="orange"
    linkHref="https://www.antpool.com/home"
    linkTitle="채굴 시작하기"
    description="Antpool로 채굴을 시작하세요."
  />
<FilterItem
    value="platform-infra"
    title="Vottun"
    subtitle="인프라"
    color="orange"
    linkHref="https://vottun.com"
    linkTitle="시작하기"
    description="Vottun의 상호운용 가능한 멀티 블록체인 아키텍처는 복잡한 블록체인 기술을 깊이 이해하지 않아도 Web3 애플리케이션을 쉽게 개발할 수 있도록 설계되었습니다."
  />
<FilterItem
    value="platform-infra"
    title="WakeUp Labs"
    subtitle="인프라"
    color="orange"
    linkHref="https://platform.wakeuplabs.io"
    linkTitle="시작하기"
    description="WakeUp Labs는 EVM 호환 블록체인, DAO, 그리고 전통적인 조직들이 기술적인 문제를 해결하고 제품 개발 속도를 높일 수 있도록 지원하는 소프트웨어 개발 스튜디오입니다."
  />
<FilterItem
    value="bridge, sc"
    title="Wormhole"
    subtitle="크로스체인 브릿지"
    color="orange"
    linkHref="https://docs.wormhole.com/wormhole"
    linkTitle="빌딩 시작하기"
    description="Rootstock 위에 멀티체인 dApp을 개발하고 배포하세요."
  />
<FilterItem
    value="data, sc"
    title="Envio"
    subtitle="데이터"
    color="orange"
    linkHref="https://envio.dev/"
    linkTitle="온체인 데이터 액세스"
    description="Rootstock에서 dApp을 개발할 때 필요한 온체인 데이터를 확인하세요."
  />
<FilterItem
    value="data, sc"
    title="Goldsky"
    subtitle="데이터"
    color="orange"
    linkHref="https://docs.goldsky.com/introduction"
    linkTitle="온체인 데이터 액세스"
    description="Goldsky는 Rootstock에서 고성능 subgraph 호스팅과 실시간 데이터를 제공하는 데이터 인덱싱 서비스입니다."
  />
<FilterItem
    value="data, sc"
    title="Subquery"
    subtitle="데이터"
    color="orange"
    linkHref="https://subquery.network/indexer/30"
    linkTitle="온체인 데이터 액세스"
    description="SubQuery는 Rootstock에서 빠르고 신뢰할 수 있으며, 탈중앙화되고 맞춤형으로 설정 가능한 데이터 인덱싱 서비스를 제공합니다."
  />
<FilterItem
    value="mine"
    title="F2Pool"
    subtitle="채굴"
    color="orange"
    linkHref="https://www.f2pool.com/"
    linkTitle="채굴 시작하기"
    description="Rootstock용 마이닝 풀."
  />
<FilterItem
    value="mine"
    title="ViaBTC"
    subtitle="채굴"
    color="orange"
    linkHref="https://www.viabtc.com/"
    linkTitle="채굴 시작하기"
    description="Rootstock용 마이닝 풀."
  />
<FilterItem
    value="mine"
    title="Luxor"
    subtitle="채굴"
    color="orange"
    linkHref="https://luxor.tech/mining"
    linkTitle="채굴 시작하기"
    description="Rootstock용 마이닝 풀."
  />
<FilterItem
    value="mine"
    title="BraiinsPool"
    subtitle="채굴"
    color="orange"
    linkHref="https://braiins.com/pool"
    linkTitle="채굴 시작하기"
    description="Rootstock용 마이닝 풀."
  />
<FilterItem
    value="bridge"
    title="Chainport"
    subtitle="크로스체인 브릿지"
    color="orange"
    linkHref="https://www.chainport.io/"
    linkTitle="시작하기"
    description="Rootstock과 통합된 크로스체인 브릿지."
  />
<FilterItem
    value="data"
    title="Tres Finance"
    subtitle="자산 관리"
    color="orange"
    linkHref="https://tres.finance/"
    linkTitle="시작하기"
    description="Rootstock 기반의 Web3 자산 관리, 감사, 그리고 리포팅 시스템."
  />
<FilterItem
    value="demos, sc"
    title="Wagmi 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/wagmi/"
    linkTitle="키트 사용"
    description="이 스타터 키트는 React, Wagmi, Shadcn 라이브러리를 활용해 Rootstock 블록체인 위에 탈중앙화 애플리케이션(dApp)을 개발할 수 있는 기반을 제공합니다."
  />
<FilterItem
    value="demos, sc"
    title="Reown-Wagmi 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/reown/"
    linkTitle="키트 사용"
    description="이 스타터 키트는 React, Reown, Wagmi, Shadcn 라이브러리를 활용해 Rootstock 블록체인 위에 탈중앙화 애플리케이션(dApp)을 개발할 수 있는 기반을 제공합니다."
  />
<FilterItem
    value="demos, sc"
    title="Privy 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/privy/"
    linkTitle="키트 사용"
    description="Rootstock Privy 스타터 키트는 개발자가 소셜 로그인을 통해 사용자를 온보딩하고, 사용자가 스스로 지갑을 관리할 수 있도록 지원합니다. 이를 통해 Rootstock 기반 dApp 개발 시 제어권, 프라이버시, 유연성을 유지할 수 있습니다."
  />
<FilterItem
    value="demos, sc"
    title="Hardhat 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/hardhat/"
    linkTitle="키트 사용"
    description="Rootstock Hardhat 스타터 키트."
  />
<FilterItem
    value="demos, sc"
    title="Web3Auth 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/web3auth/"
    linkTitle="키트 사용"
    description="Rootstock Web3Auth 스타터 키트를 사용해 소셜 로그인 기반 dApp을 Rootstock 위에 구축하세요."
  />
<FilterItem
    value="demos, sc"
    title="Dynamic 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/dynamic/"
    linkTitle="키트 사용"
    description="Rootstock Dynamic 스타터 키트."
  />
<FilterItem
    value="demos, sc"
    title="Hardhat Ignition 스타터 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/hardhat-ignition/"
    linkTitle="키트 사용"
    description="Rootstock Hardhat Ignition 스타터 키트."
  />
<FilterItem
    value="demos, sdk, sc, aa"
    title="계정 추상화 키트"
    subtitle="데모"
    color="orange"
    linkHref="/developers/quickstart/rootstock-etherspot/"
    linkTitle="키트 사용"
    description="Etherspot을 사용한 계정 추상화 스타터 dApp."
  />
<FilterItem
    value="sdk, sc, aa, platform-infra"
    title="Etherspot"
    subtitle="계정 추상화"
    color="orange"
    linkHref="https://etherspot.io/"
    linkTitle="Etherspot 사용"
    description="Rootstock에서의 계정 추상화 개발."
  />
<FilterItem
    value="demos, sc"
    title="dApp 자동화"
    subtitle="데모"
    color="orange"
    linkHref="/resources/tutorials/dapp-automation-cucumber/"
    linkTitle="dApp 자동화"
    description="Cucumber와 Playwright를 사용해 dApp을 자동화하는 방법을 알아보세요."
  />
<FilterItem
    value="sc, oracles, data"
    title="Umbrella Network"
    subtitle="오라클"
    color="orange"
    linkHref="https://umb.network/"
    linkTitle="온체인 데이터 액세스"
    description="Rootstock에서 스마트 컨트랙트를 위한 온체인 데이터에 액세스하세요."
  />
<FilterItem
    value="sc, oracles, data"
    title="Redstone Finance"
    subtitle="오라클"
    color="orange"
    linkHref="https://redstone.finance/"
    linkTitle="온체인 데이터 액세스"
    description="Rootstock에서 스마트 컨트랙트를 위한 온체인 데이터에 액세스하세요."
  />
  <FilterItem
    value="cc, data"
    title="Router Protocol"
    subtitle="크로스체인 브릿지"
    color="orange"
    linkHref="https://routerprotocol.com/"
    linkTitle="크로스체인 dApps 개발"
    description="Router Protocol은 체인 추상화를 가능하게 하는 레이어 1 블록체인입니다."
  />
  <FilterItem
    value="cc, data"
    title="Layerzero"
    subtitle="크로스체인 브릿지"
    color="orange"
    linkHref="/use-cases/interoperability/rootstock-layerzero/"
    linkTitle="크로스체인 dApps 개발"
    description="LayerZero는 크로스체인 메시징 프로토콜로, Rootstock에서 다른 블록체인으로 비트코인 기반 자산을 원활하게 이동할 수 있도록 해줍니다. 이를 통해 개발자는 여러 체인을 마치 하나처럼 연결해 상호작용하는 옴니체인 애플리케이션(OApp)을 구축할 수 있습니다."
  />
  <FilterItem
    value="attest"
    title="Rootstock Attestation Service (RAS)"
    subtitle="검증"
    color="orange"
    linkHref="/dev-tools/attestations/ras/"
    linkTitle="지금 검증하기"
    description="Rootstock Attestation Service(RAS)는 개인과 조직이 특정 이벤트, 행동, 또는 데이터에 대해 검증 가능한 주장 또는 증명을 생성할 수 있도록 해주는 시스템입니다. 이 증명은 온체인뿐만 아니라 오프체인에서도 생성할 수 있습니다. Rootstock에서 RAS를 활용하는 방법을 알아보세요."
  />
</Filter>
```
