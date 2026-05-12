import React, {useRef, useState, useEffect, useCallback} from 'react';
import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';
import styles from './styles.module.scss';

const useCaseData = {
  title: <Translate>Browse by Use Cases</Translate>,
  description: null,
  cards: [
    {
      title: <Translate>Generate Yield</Translate>,
      color: 'orange',
      description: (
        <Translate>Transform Bitcoin from a passive asset into productive capital with yield-bearing vaults and staking mechanisms.</Translate>
      ),
      list: [
        {
          title: <Translate>Integrate USDRIF Vault on Rootstock</Translate>,
          href: '/use-cases/btcfi-finance-yield/yield-vaults-sdk/',
        },
      ],
    },
    {
      title: <Translate>Bridge Assets</Translate>,
      color: 'cyan',
      description: (
        <Translate>Securely bridge assets between Bitcoin and Rootstock using trust-minimized protocols.</Translate>
      ),
      list: [
        {
          title: <Translate>Atlas Bridge SDK</Translate>,
          href: '/resources/guides/atlas/',
        },
        {
          title: (
            <Translate>Omnichain Fungible Token (OFTs) on Rootstock with Layerzero</Translate>
          ),
          href: '/use-cases/interoperability/rootstock-layerzero/',
        },
      ],
    },
    {
      title: <Translate>Onboard Users</Translate>,
      color: 'green',
      description: (
        <Translate>Remove onboarding friction with social login, smart wallets, and human-readable names.</Translate>
      ),
      list: [
        {
          title: <Translate>Smart Wallet Onboarding with Para SDK</Translate>,
          href: '/use-cases/onboarding-ux/para/',
        },
        {
          title: (
            <Translate>Use USSD to interact with DeFi protocols on Rootstock.</Translate>
          ),
          href: '/use-cases/onboarding-ux/ussd-rootstock-defi/',
        },
      ],
    },
    {
      title: <Translate>AI Agents</Translate>,
      color: 'pink',
      description: (
        <Translate>Connect AI models to on-chain data and deploy autonomous agents for intelligent portfolio management.</Translate>
      ),
      list: [
        {
          title: (
            <Translate>Conversational AI Agent with Blockchain Actions</Translate>
          ),
          href: '/use-cases/ai-automation/ai-agent-rootstock/',
        },
        {
          title: (
            <Translate>
              Introduction to Model Context Protocol (MCP) on Rootstock
            </Translate>
          ),
          href: '/use-cases/ai-automation/mcp-rootstock/',
        },
      ],
    },
    {
      title: <Translate>Automate Payments</Translate>,
      color: 'orange',
      description: (
        <Translate>Launch custom tokens and integrate Bitcoin-native payments, stablecoins, and agentic commerce using payment standards like x402.</Translate>
      ),
      list: [
        {
          title: <Translate>x402 Payments with Rootstock</Translate>,
          href: '/use-cases/payments-assets/integrate-x402/',
        },
      ],
    },
  ],
};

function getScrollStepPx(viewportEl) {
  const trackEl = viewportEl.firstElementChild;
  const slide = viewportEl.querySelector('[data-rsk-slide]');
  if (!slide || !trackEl) {
    return viewportEl.clientWidth * 0.25;
  }
  const cs = getComputedStyle(trackEl);
  const gapRaw = cs.columnGap || cs.gap || '16px';
  const gap = parseFloat(gapRaw) || 16;
  return slide.offsetWidth + gap;
}

function RootstockCarouselArrow() {
  return (
    <span className={styles.arrowOuter} aria-hidden="true">
      <span className={styles.arrowRingShadow} />
      <span className={styles.arrowRing} />
      <svg
        className={styles.arrowIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function HomepageSectionUseCases() {
  const trackRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    const overflow = maxScroll > 2;
    setHasOverflow(overflow);
    setCanScrollNext(overflow && el.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) {
      return undefined;
    }
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, {passive: true});
    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 2) {
      return;
    }
    const step = getScrollStepPx(el);
    el.scrollBy({left: step, behavior: 'smooth'});
  }, []);

  return (
    <section className="mb-64">
      <div className="mb-32">
        {useCaseData.title && (
          <h2 className="h1 mb-0">{useCaseData.title}</h2>
        )}
        {useCaseData.description && (
          <div className="markdown mt-12">{useCaseData.description}</div>
        )}
      </div>

      <div className={styles.carousel}>
        <div ref={trackRef} className={styles.viewport}>
          <div className={styles.track}>
            {useCaseData.cards.map((item, idx) => (
              <div className={styles.slide} key={idx} data-rsk-slide>
                <Card
                  index={`${idx + 1}.`}
                  title={item.title}
                  color={item.color}
                  description={item.description}
                  list={item.list}
                />
              </div>
            ))}
          </div>
        </div>

        {hasOverflow && (
          <div className={styles.arrowWrap}>
            <button
              type="button"
              className={styles.arrowBtn}
              disabled={!canScrollNext}
              onClick={scrollNext}
              aria-label={
                canScrollNext
                  ? 'Scroll use cases to the right'
                  : 'End of use cases list'
              }>
              <RootstockCarouselArrow />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
