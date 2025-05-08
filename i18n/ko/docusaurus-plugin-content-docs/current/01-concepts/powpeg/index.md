---
title: 가장 안전하며, 허가가 필요 없고, 검열할 수 없는 Bitcoin Peg 구축하기
sidebar_position: 4
sidebar_label: PowPeg 프로토콜
tags:
  - rsk
  - rootstock
  - rbtc
  - btc
  - 아키텍처
  - powpeg 프로토콜
  - powpeg 앱
description: PowPeg 프로토콜을 통해 BTC를 RBTC로, RBTC를 BTC로 전송합니다.
render_features: powpeg-hsm-증명-프레임
---

Rootstock의 **PowPeg** 프로토콜은 2018년 연합으로 시작된 이후 계속 발전하여 현재는 많은 탈중앙적 특성을 포함하고 있습니다. 이 프로토콜은 변조 방지 보안 요소(SE)에 기반한 특수 목적 PowHSM에 저장된 개인 키를 보호합니다. 각 PowHSM은 SPV 모드에서 Rootstock 노드를 실행하므로, 체인 누적 작업 증명(PoW)으로만 서명을 요구할 수 있습니다. PowPeg에서 보안은 심층 방어라고 하는 중첩 설계의 단순성을 통해 만들어집니다.

:::note\[Info]

- PowPeg 앱은 [테스트넷](https://powpeg.testnet.rootstock.io/) 및 [메인넷](https://powpeg.rootstock.io/)에서 사용할 수 있습니다.
- 설계 및 아키텍처에 관한 일반 정보, Ledger와 Trezor를 사용해 페그인(peg-in) 트랜잭션을 수행하는 방법, 자주 묻는 질문 및 PowPeg에서 수행할 수 있는 고급 옵션에 대한 내용은 [PowPeg 사용자 가이드](/resources/guides/powpeg-app/)를 참조해 주세요.
- 서명자와 증명에 관한 정보는 [PowPeg HSM 펌웨어 증명](/concepts/powpeg/hsm-firmware-attestation) 섹션에서 확인할 수 있습니다.
- PowPeg 사용 시 기본 모드와 고속 모드의 차이점에 대해 알아보려면 [고속 모드 소개: PowPeg를 이용하지만 더 빠르게 RBTC를 획득하는 방법](https://blog.rootstock.io/noticia/get-rbtc-fast-mode/)을 참조하세요
  :::

## PowPeg 프로토콜의 역사

고유한 블록 형식을 가진 두 개의 블록체인은 각 블록체인이 다른 블록체인의 컨센서스 규칙을 평가할 수 있으며, 체인 사이의 메시지가 장기간 검열되지 않은 경우 완전히 탈중앙화된 방식으로 통신할 수 있습니다. 현재는 "튜링 완전" 스마트 컨트랙트를 갖춘 플랫폼만 다른 블록체인의 컨센서스 규칙을 평가할 수 있습니다. Bitcoin은 좋든 나쁘든 임의의 조건으로 코인의 잠금을 해제하는 능력이 부족합니다. 따라서 Rootstock을 만들 때 Bitcoin에 존재했던 유일한 당사자 간 신뢰 배분 기술인 다중 서명을 사용해야만 했습니다. 다중 서명을 사용하면 공증인 집단에 의해 잠금 처리된 Bitcoin을 보호하는 작업을 부여할 수 있으며, 일정 수준의 악의적이거나, 해킹되거나, 이용 불가능한 당사자를 허용할 수 있습니다.

Rootstock 제네시스 블록이 채굴되었을 때, 다중 서명의 보호를 목표로 하는 자율 기능자 집합인 Rootstock 연합이 탄생했습니다. 이 연합은 Rootstock에서 실행되며, 중단 불가능한 스마트 컨트랙트인 Rootstock 브릿지에 의해 통제되었고, 탄생 이후 성공적인 작동을 이어왔습니다. 2020년 Rootstock 커뮤니티는 보안과 검열 저항성 두 가지 측면에서 Rootstock Peg를 성장시킬 때라고 판단하고 연합 시스템을 PowPeg로 진화시켰습니다. PowPeg는 독특한 양방향 페그 시스템으로, 잠금 처리된 Bitcoin의 보안을 컨센서스를 이루는 동일한 Bitcoin 해시레이트를 통해 유지합니다. 기능자 집합은 여전히 존재하지만, 이들의 주된 역할은 하드웨어와 노드가 항상 활성화 연결 상태를 유지하도록 하는 것이며, Bitcoin 다중 서명 개인 키는 직접 제어하지 않습니다. [PowPeg HSM 펌웨어 증명](/concepts/powpeg/hsm-firmware-attestation)을 참조하세요.

## Rootstock의 PowPeg 프로토콜

PowPeg 설계 당시 Rootstock 연구원과 개발자 전략은 양방향 페그 프로토콜을 구축해 온 다른 팀이 채택한 전략과 다릅니다. Rootstock PowPeg은 "**심층 방어**"라고 부르는 중첩 보안 모델에 기반합니다. 대부분의 다른 페그는 복잡한 방식으로 다자간 보관 문제를 해결하는 단일 공동 암호화 프로토콜에 의존합니다. 이러한 복잡한 암호화 프로토콜은 섬세하며, 이를 철저하게 감사할 수 있는 기관은 매우 소수입니다. 이러한 유형의 프로토콜은 때때로 손상되어 사용자에게 갑작스러운 보안 손실을 초래하기도 합니다.

최근의 다른 양방향 페그 설계들은 새 토큰의 높은 담보화를 이용하는 암호경제학적 보상에 초점을 맞춥니다. 하지만 핵심 사이드체인 기능에 다른 토큰을 사용하는 것은 Bitcoin의 가치에 부합하지 않습니다. 대신 Rootstock PowPeg 브릿지는 다중 방어, 또는 계층에 의존하며 각 계층은 상대적으로 이해와 테스트가 간단합니다. 이러한 심층 방어 접근법 덕분에 Rootstock은 큰 문제나 다운타임 없이 제네시스에서 현재 상태로 성장할 수 있었습니다. 담보가 없기 때문에 Rootstock PowPeg 회원들은 소량의 Rootstock 트랜잭션 수수료를 자동으로 받음으로써 참여에 대한 보상을 획득합니다. Ethereum 생태계에서 볼 수 있듯이 트랜잭션 수수료는 최종적으로 채굴자에게 지속적인 수입을 제공하며, 때로는 블록체인 보조금보다 [훨씬 높습니다](https://coinmetrics.io/ethereums-defi-evolution-how-defi-is-fueling-ethereums-growth/).

## PowPeg 프로토콜 기능자

Rootstock PowPeg에 참여하는 기능자는 **PowHSM**이라는 특수 하드웨어의 활성 상태를 유지하고, 특수한 유형의 Rootstock 전체 노드("PowPeg 노드")에 연결합니다. PowHSM은 외부 변조 방지 장치로, Bitcoin 다중 서명 프로토콜에 필요한 개인 키 중 하나를 생성 및 보호하여 충분한 누적 작업량에 의해 유효성이 증명된 트랜잭션에만 서명합니다. PowPeg 노드는 연결성을 극대화하고 Rootstock 블록체인, 특히 누적 작업량에 관한 정보를 PowHSM으로 전송하도록 설계되었습니다.

기능자의 역할은 PowHSM, PowPeg 노드와 그 둘 간의 통신에서 변경 사항을 감사함으로써 오직 유효한 다중 서명 트랜잭션만 PowHSM이 서명하도록 만드는 것입니다. 기능자 자체는 어떤 방식으로든 트랜잭션의 서명에 적극적으로 관여하지 않으며 Rootstock 블록체인의 블록 생성에 참여하지 않습니다.

## 병합 채굴자와 아르마딜로 모니터링

Bitcoin 채굴자 중 상당 부분이 Rootstock 병합 채굴에 참여하여 Rootstock 네트워크를 효과적으로 보호하는 데 필요한 블록체인 특성인 지속성과 활성 상태를 제공합니다. PowPeg 프로토콜에서 병합 채굴자는 Rootstock과 Bitcoin 사이의 브릿지를 보호하는 Rootstock의 심층 방어 접근법에서 가장 크고 중요한 계층의 역할을 맡고 있습니다. 기능자는 병합 채굴의 안정성에 의존하여 안전하고 시의적절한 방식으로 유효한 다중 서명 트랜잭션이 서명되고 검증되도록 보장합니다.

## 경제적 행위자와 브릿지 컨트랙트

암호화폐 가맹점과 거래소 등 경제적 행위자는 Rootstock 네트워크를 통해 페그인 및 페그아웃 트랜잭션(아래에 상술)을 브릿지 스마트 컨트랙트로 전송하고 수령함으로써 Rootstock PowPeg와 상호 작용합니다. 브릿지는 Rootstock 블록 체인에 있는 사전에 컴파일된 스마트 컨트랙트입니다. 브릿지의 역할은 Bitcoin 블록체인에 대한 최신 정보를 유지하고, 페그인 요청을 식별하고 페그아웃을 명령하는 것입니다. 이러한 기능을 달성하기 위해 브릿지 컨트랙트는 SPV([간단한 결제 인증](https://en.bitcoinwiki.org/wiki/Simplified_Payment_Verification)) 모드에서 Bitcoin 지갑을 관리합니다. 이 모드에서 트랜잭션은 블록 헤더를 통해 확인되며 블록 헤더에 대한 검증은 최소화되지만 예상 작업 증명(PoW)은 검증에 포함됩니다. 이러한 검증은 브릿지 지갑이 체인 작업량이 가장 많은 Bitcoin 체인을 따르도록 보장하지만, 해당 체인의 유효성은 확인하지 않습니다.

일반적으로 체인 작업량이 가장 많은 체인이 네트워크에서 가장 뛰어난 체인입니다. Bitcoin 역사상 [의도하지 않은 네트워크 포크](https://bitcoinmagazine.com/articles/bitcoin-network-shaken-by-blockchain-fork-1363144448)는 단 한 번 있었는데, 사전에 확립된 컨센서스 규칙에 따라 하나의 분기가 유효하지 않았습니다. 해당 포크 길이는 24 블록이었습니다. 따라서 브릿지는 의도되었거나 의도되지 않은 무효 포크를 방지하기 위해 페그인 트랜잭션을 확정하기 전 확인을 100회 기다리도록 설계되었습니다.

## 페그인/페그아웃 및 기타 Rootstock PowPeg 프로토콜 특성

현재 Bitcoin을 사이드 체인으로 전송하는 프로세스에는 페그인, 다시 Bitcoin으로 반환하는 프로세스에는 페그아웃이라는 표준화된 용어를 사용합니다. 페그인 작업은 아주 간단해서 Bitcoin을 PowPeg 주소로 전송하고 Bitcoin 트랜잭션에 관해 브릿지에 알리기만 하면 됩니다. PowPeg 기능자는 사용자의 입장에서 "감시탑" 서비스를 제공하고 페그인도 브릿지에 알립니다.

Rootstock PowPeg는 자산 마이그레이션 프로토콜이며 네트워크 지연이 발생하는 경우 페그인을 취소할 수 없습니다. 네트워크 지연 중에 페그인을 취소할 수 없다는 특성은 일반적으로 거래소 프로토콜에서 자산 마이그레이션 프로토콜을 구분 짓는 특성입니다. 거래소 프로토콜에는 거래 상대자가 자금의 잠금 해제에 실패한다는 위험이 상존하며 사용자는 제한된 지연 시간 내에 이러한 실패에 관해 알려야 합니다. Rootstock은 특별한 경우에만 페그인 작업에 사용된 Bitcoin을 반환하는데, 바로 시간의 흐름에 따라 증가하는 한도가 초과된 경우입니다.

엄밀히 말해 Rootstock PowPeg는 하이브리드 페그입니다. 페그인은 SPV 증명을 사용해 완전히 탈중앙화된 방식으로 작동하며, PowPeg 회원은 Bitcoin 예치가 Rootstock에 제대로 통지되었는지 확인하는 감시탑의 역할만 수행합니다. PowPeg 회원이 이에 실패하면 페그인 트랜잭션을 발행한 사용자는 결국 사용자가 온라인에 접속해 트랜잭션에 관해 Rootstock에 통지하는 최악의 상황이라고 가정하고 Rootstock에 통지할 수 있습니다. Rootstock는 사용자를 양방향 페그 트랜잭션의 발신자이자 수신자로 간주하므로 사용자가 Rootstock 네트워크에 통지할 것을 강력히 권장합니다.

페그아웃을 수행하기 위해 브릿지는 Rootstock 계정에서 요청을 수락하고, 수천 개의 확인 블록 이후 PowHSM에 이 트랜잭션에 서명하라고 명령하는 Bitcoin 페그아웃 트랜잭션을 구축합니다. 브릿지는 페그아웃 트랜잭션에 포함할 트랜잭션 입력(또는 UTXO)을 선택하여 모든 유형의 UTXO에 대한 선별적인 검열을 예방합니다. 또한 브릿지는 PowPeg 구성이 변경될 때 필요한 모든 재무 작업에 대한 강제 지연을 조정하고 적용합니다. 마지막으로 브릿지는 오라클의 역할을 수행하여 Bitcoin 블록체인을 Rootstock 스마트 컨트랙트에 노출합니다. Rootstock 페그아웃은 PowHSM의 참여와 대다수 PowPeg 회원의 협력에 의존하는데, 모든 페그아웃 트랜잭션에는 PoWHSM의 서명이 필요하기 때문입니다. PowHSM이 실질적인 보안을 제공한다고 가정할 때 PowPeg 페그아웃도 무신뢰입니다.

## Rootstock PowPeg 보안

Rootstock 페그는 현존하는 가장 안전한 다중 서명 시스템 중 하나가 되어가고 있습니다. 엄밀히 말해 PowPeg의 보안은 여러 개의 동시다발적인 전략, 즉 심층 방어, 조정 투명성, 공개 증명 등에 의존하고 있지만, 페그의 보안은 기술적인 특성에만 의존하지 않습니다. 실제 보안은 기술, 운영, 평판 등 다양한 관점에서 분석되어야 합니다. 다음 섹션에서는 PowPeg 기술적인 설계 결정을 중점적으로 살펴보겠습니다.

## 심층 방어

심층 방어는 신중한 책임의 분리를 통해 실현되므로 시스템을 손상시키려면 한 요소나 한 행위자를 손상시키는 것으로는 충분하지 않습니다. 채굴자는 단독으로 페그의 자금을 훔칠 수 없고, 기능자, PowHSM 제조업체, 개발자도 마찬가지입니다. 페그 프로세스는 소프트웨어나 펌웨어에 강제 적용된 컨센서스 규칙에 의해 통제되며, 서로를 버그와 취약점으로부터 보호합니다. 나아가 Rootstock 커뮤니티는 실수가 발생하지 않도록 코드를 보호합니다. 커뮤니티의 목표는 더 많은 보호 계층을 추가하고, 각 계층이 보안을 강화하는 방식으로 PowPeg를 개선하는 것입니다.

위에서 설명한 것처럼, 각 기능자는 PowPeg 노드뿐만 아니라 PowHSM도 실행합니다. 몇 개월 후면 모든 기존 PowPeg 회원은 PowHSM 버전 2.0으로의 업그레이드를 완료하게 될 것입니다. 앞서 설명한 바와 같이 각 PowHSM은 SPV 모드에서 컨센서스 노드를 실행하므로 명령은 실제 해시레이트를 통해 지원되어야 합니다. 불가능한 것은 아니지만, 여러 Bitcoin 풀을 해킹하지 않고 PowHSM을 속이는 일은 매우 어려워졌습니다.

"베토크라시"라는 용어는 이러한 맥락에서 아주 유용합니다. 베토크라시는 어떤 단일 개체도 결정을 내리고 실질적인 책임을 지기에 충분한 힘을 가지지 않는 거버넌스 시스템입니다. PowPeg의 보안에 대한 Rootstock의 심층 방어 접근법은 그러한 이념을 따라 공격을 무력화합니다. 양방향 페그 시스템을 설계할 때 해야할 좋은 질문은 "프로토콜이 베토크라시를 얼마나 닮았는가"로, 연합 대 탈중앙화 시스템에 대한 끝나지 않는 종교적 논쟁으로부터 많은 사람을 구해줍니다.

## 조정 투명성

기능자 간의 모든 통신은 Rootstock 블록체인을 통해 이루어집니다. 기능자 간에는 숨겨진 메시지가 없으며 기능자들이 서로 비밀리에 통신하도록 사전에 만들어진 하위 시스템도 없습니다. 교환된 모든 메시지는 공개됩니다. PowPeg 노드 실행 가능 코드를 완전하게 통제하는 가상의 공격자에 의한 숨겨진 통신을 막을 수는 없지만, 장기간에 걸친 은밀한 공모는 방지합니다. 조정은 공개 네트워크를 통해 이루어지므로, 시스템은 PowHSM이 블록체인 정직한 최고의 체인에 노출하고 모든 네트워크 참여자가 주기적으로 PowHSM 내부 상태를 알 수 있게 허용합니다. 외부 해커에게 은밀한 조정을 위해 사전에 만들어진 시스템이 있다면 이는 기능자 IP를 획득하고 표적 공격을 시도하는 데 사용할 수 있는 강력한 권한 상승 도구가 될 수 있습니다. PowPeg 기능자는 Tor를 통해 네트워크에 연결하거나 문제 없이 매일 IP를 변경할 수 있습니다.

마지막으로 브릿지 스마트 컨트랙트는 페그아웃 트랜잭션을 구축하고 PowHSM이 서명할 트랜잭션과 관련된 어떤 것도 선택할 수 없게 합니다. 전체 트랜잭션 콘텐츠는 Rootstock 컨센서스를 통해 결정됩니다.

## 펌웨어 증명

Rootstock PowHSM 펌웨어는 전체 노드 및 PowPeg 노드와 함께 결정론적 빌드를 사용해 생성되지만, 현재 PosHSM상의 펌웨어 설치는 완전히 신뢰 없이 진행될 수 없습니다. 하나의 감사 그룹이 각각의 신규 장치나 장치 배치에 이루어지는 펌웨어 설치 프로세스의 정확도를 증명해야 하니다. 하지만 우리는 새로운 방어 수단을 통해 해당 영역을 개선하고 있습니다. 다음 PowHSM 펌웨어 업데이트(버전 2.1)는 장치에서 제공하는 보안 기능을 사용해 펌웨어 증명을 제공할 수 있습니다. 따라서 다음 목표는 Rootstock의 배포 절차의 일부로, 혹은 _활성 유지_ 메시지로 주기적으로 펌웨어 증명을 포함하는 것입니다. 곧 증명 메시지가 블록체인에 저장되고 커뮤니티의 모든 회원이 PowHSM 펌웨어를 검증할 수 있게 될 것입니다.

## 작업 증명은 시간 증명

PowHSM에서 요구하는 누적 작업량은 모든 공격에 대한 처리율 제한 장치 또는 **강제 시간** 지연의 역할을 합니다. Rootstock이 병합 채굴을 통해 Bitcoin 해시레이트의 많은 비율을 차지하고 있다는 사실을 고려했을 때, 악의적으로 포크된 분기를 통한 페그아웃을 확정하도록 PowHSM을 "속이기 위해" 필요한 누적 난이도의 양을 보면 주요 Bitcoin 채굴 풀의 일부가 여러 날 동안 대규모로 공모해야 함을 알 수 있습니다. 그러한 공격은 투명하며 Bitcoin과 Rootstock 커뮤니티에서 모두 확인할 수 있을 것입니다. 은행 금고 [개설 절차](https://www.law.cornell.edu/cfr/text/12/208.61)의 경우 PowHSM은 실제로 공격이 의심되면 인간을 개입하게 만드는 [시간 지연](https://en.wikipedia.org/wiki/Time_lock)을 강제 시행합니다.

## 페그인 및 페그아웃 완결성

Since the Bitcoin blockchain and the Rootstock sidechain are not entangled in a single blockchain or in a parent-child relation as in a [syncchain](https://blog.rootstock.io/noticia/syncchain-synchronized-sidechains-for-improved-security-and-usability/), the transfers of bitcoins between them must at some point in time be considered final. If not, bitcoins locked on one side would never be able to be safely unlocked on the other. **Therefore, peg-in and peg-out transactions require a high number of block confirmations. Peg-ins require 100 Bitcoin blocks (approximately 2000 Rootstock blocks), and peg-outs require 4000 Rootstock blocks (approximately 200 Bitcoin blocks)**. Transactions signed by federation nodes are considered final by Rootstock: these transactions are broadcast and assumed to be included sooner or later in the Bitcoin blockchain. Due to the need for finality, Rootstock consensus does not attempt to recover from an attack that manages to revert the blockchain deep enough to revert a final peg-in or peg-out transaction. If a huge reversal occurs, PowPeg nodes halt any future peg-out, and the malicious actors should not be able to double-spend the peg.

:::note[IRIS 3.0.0]
IRIS 3.0.0 업그레이드 후 페그인 및 페그아웃에 필요한 최소 금액이 절반으로 줄어들어 페그인(BTC) 최소액은 현재 0.005이고 페그아웃(RBTC) 최소액은 현재 0.004입니다. 브릿지는 이 최소 금액 외에도 페그아웃을 위해 지불해야 하는 수수료를 추정하여, 수수료 지불 후 남는 금액이 너무 적으면(BTC로 쓰기에 충분하지 않은 경우) 페그아웃을 거부합니다. 위에서 설명한 조건 중 하나로 인해 페그아웃이 거부되면 자금은 환불됩니다.
:::

## 탈중앙화 - 베토크라시 구축하기

The use of PowHSMs in a federation is a step forward in decentralization, because a remotely compromised functionary does not compromise the main element for the security of the peg: a multisig private key. Since Rootstock has a large portion of the Bitcoin merge-mined hashrate, currently surpassing 51%, it seems extremely unlikely that a new group of merge-miners can hijack consensus long enough to force PowHSMs to perform a malicious peg-out. But the Rootstock community should never rest on its laurels.  Instead, the Rootstock community is planning to apply once again a layered approach leading to more “additive security”.

## PowPeg 검열 저항성

또한 Rootstock PowPeg는 각 PowPeg 노드에 제한적인 책임의 집합이 위임되어 있다는 점에서도 독특합니다. 특히 PowPeg 기능자는 페그인 및 페그아웃 트랜잭션에 선별적인 검열을 적용할 수 없습니다. 만약 한 PowPeg 기능자가 특정 트랜잭션의 검열을 시도하면 다른 기능자가 페그아웃을 서명하고 실행하여 검열이 실패하게 됩니다. 만약 모든 기능자가 한 트랜잭션의 검열을 시도하면 기능자는 다른 페그아웃은 계속 수행할 수 없으며, 페그아웃이 UTXO에 연결되어 있으므로 기능자는 페그아웃 트랜잭션에 대해 UTXO를 선택할 수 없습니다. "거스름돈" UTXO를 포함해 페그아웃 UTXO는 브릿지 컨트랙트를 통해 선정되어 컨센서스에 의해 강제되는 체인을 형성합니다. 따라서 트랜잭션을 선별적으로 금지하는 것은 결국 PowPeg의 완전한 중단으로 이어지며, 그러한 이유로 선별적 검열은 가능하지 않습니다.

PowPeg의 완전한 중단은 기능자가 전 세계에 지리적으로 분산되어 있기 때문에 단일 정부가 실행하기란 매우 어려울 것입니다. 전 세계적으로 조직된 강력한 공격이나 정보 기관으로부터의 공격으로부터 보호하기 위해 Rootstock은 PowPeg이 해체되었음이 증명된 후 1년 뒤에 활성화되는 긴급 복원 다중 서명 타임락을 추가할 계획입니다. 중단 시도가 발생하면 새 Rootstock Powpeg가 신속하게 확장되어 PowHSM 장치를 운영하고 Tor를 통해 PowPeg 노드를 실행하는 수 백명의 개별 사용자로 탈중앙화될 것입니다. 즉, 중단 시도는 Rootstock를 더 강력하고 다음 공격에 탄력적으로 만들어 줍니다.

## 결론

Rootstock 페그는 연합에서 PowPeg로 성장했습니다. 시간이 흘러 페그가 성장함에 따라 더 많은 Bitcoin이 Rootstock으로 옮겨졌습니다. 개발자들은 Rootstock의 안전하고 효율적인 금고에서 dApp을 구축할 특별한 기회를 찾을 수 있습니다. 대안들과 비교했을 때 PowPeg는 Bitcoin 스크립팅 시스템이 만든 제약 내에서 계층화된 보호를 기반으로 하는 강력한 보안으로 최대한의 탈중앙화를 결합합니다.