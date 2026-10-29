import React, {useCallback, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Button from '/src/components/Button';
import {addRootstockNetwork} from '/src/components/AddNetworkButtons';
import CheatsheetQr from './CheatsheetQr';
import {
  AI_TOOLS,
  EVM_COMPILER,
  EXPLORER_NETWORK_LINKS,
  INSTITUTIONAL,
  NETWORKS,
  QUICK_REFERENCE,
  REFERENCE_GUIDES,
  START_HERE_STEPS,
  STARTER_KITS,
  SUPPORT_LINKS,
  VERIFY_LINKS,
} from './cheatsheetData';
import styles from './styles.module.scss';

function CopyButton({value, label}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [value]);

  const ariaLabel = label ? `Copy ${label}` : 'Copy value';

  return (
    <button
      type="button"
      className={clsx(styles.copyBtn, copied && styles.copyBtnDone)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : ariaLabel}
      title={copied ? 'Copied' : ariaLabel}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function ReferenceCell({value}) {
  if (value === 'N/A') {
    return <span className={styles.referenceValue}>N/A</span>;
  }

  const copyValue = String(value);

  return (
    <div className={styles.referenceCell}>
      <span className={styles.referenceValue}>{value}</span>
      <CopyButton value={copyValue} />
    </div>
  );
}

function NetworkParams({networkKey}) {
  const network = NETWORKS[networkKey];
  const rows = [
    ['Network Name', network.name],
    ['RPC URL', network.rpcUrl],
    ['Chain ID', network.chainId],
    ['Currency', network.symbol],
    ['Block Explorer', network.explorer],
  ];

  return (
    <div className={styles.networkTable} data-markdown-ignore="true">
      {rows.map(([key, value]) => (
        <div className={styles.networkRow} key={key}>
          <span className={styles.networkKey}>{key}</span>
          <code
            className={clsx(
              styles.networkValue,
              key === 'Chain ID' && styles.chainId,
              key === 'RPC URL' || key === 'Block Explorer' ? styles.networkValueUrl : null,
            )}>
            {value}
          </code>
          <CopyButton value={value} label={key} />
        </div>
      ))}
    </div>
  );
}

function CheatsheetButton({href, children, internal, onClick}) {
  const className = clsx('btn', 'btn-outline', 'btn-sm', styles.cheatBtn);

  if (href) {
    if (internal) {
      return (
        <Button href={href} size="sm" className={className}>
          {children}
        </Button>
      );
    }

    return (
      <Button href={href} size="sm" className={className} target="_blank">
        {children}
      </Button>
    );
  }

  return (
    <Button size="sm" className={className} onClick={onClick}>
      {children}
    </Button>
  );
}

function ExplorerNetworkLinks() {
  return (
    <div className={styles.buttonRow} data-markdown-ignore="true">
      {EXPLORER_NETWORK_LINKS.map((link) => (
        <CheatsheetButton key={link.href} href={link.href} internal={link.internal}>
          {link.label}
        </CheatsheetButton>
      ))}
    </div>
  );
}

function StartHereSection() {
  return (
    <section className={styles.startHere} id="start-here">
      <div className={styles.startHereBox}>
        <div className={styles.startHereTitle}>Start here - about 10 minutes</div>
        <div className={styles.startHereSteps}>
          {START_HERE_STEPS.map((item) => (
            <div className={styles.startHereStep} key={item.step}>
              <div className={styles.startHereNum}>{item.step}</div>
              <div>
                <div className={styles.startHereLabel}>{item.label}</div>
                <p className={styles.startHereHint}>{item.hint}</p>
                {item.href && (
                  <CheatsheetButton href={item.href}>
                    {item.href.replace(/^https?:\/\//, '')}
                  </CheatsheetButton>
                )}
                {item.links && (
                  <div className={styles.startHereLinks}>
                    {item.links.map((link) => (
                      <CheatsheetButton key={link.href} href={link.href} internal={link.internal}>
                        {link.label}
                      </CheatsheetButton>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KitCard({kit}) {
  const content = (
    <>
      <div className={styles.kitCardTitle}>{kit.title}</div>
      <div className={styles.kitCardDesc}>{kit.description}</div>
    </>
  );

  if (kit.internal) {
    return (
      <Link to={kit.href} className={styles.kitCard}>
        {content}
      </Link>
    );
  }

  return (
    <a href={kit.href} className={styles.kitCard} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

function MetaMaskButtons() {
  return (
    <div className={styles.buttonRow} data-markdown-ignore="true">
      <CheatsheetButton onClick={() => addRootstockNetwork('testnet')}>
        Add Rootstock Testnet
      </CheatsheetButton>
      <CheatsheetButton onClick={() => addRootstockNetwork('mainnet')}>
        Add Rootstock Mainnet
      </CheatsheetButton>
    </div>
  );
}

function SectionBadge({num, label, compact}) {
  return (
    <div className={styles.badgeRow}>
      <div className={clsx(styles.badgeNum, compact && styles.badgeNumCompact)}>{num}</div>
      <div className={styles.badgeLabel}>{label}</div>
    </div>
  );
}

function SectionAside({title, desc, num, label, sticky, optional, compactBadge}) {
  return (
    <aside className={clsx(styles.sectionAside, sticky && styles.sectionAsideSticky)}>
      <SectionBadge num={num} label={label} compact={compactBadge} />
      <h2 className={styles.sectionTitle}>
        {title}
        {optional ? <span className={styles.optionalTag}>Optional</span> : null}
      </h2>
      <p className={styles.sectionDesc}>{desc}</p>
    </aside>
  );
}

function ItemHeading({children}) {
  return <h3 className={styles.itemLabel}>{children}</h3>;
}

export default function Cheatsheet() {
  const [activeNetwork, setActiveNetwork] = useState('testnet');

  return (
    <div className={styles.cheatsheet}>
      <nav className={styles.nav} aria-label="Cheatsheet">
        <div className={styles.navInner}>
          <Link to="/" className={styles.navLink}>
            ← DevPortal
          </Link>
          <a href="/cheatsheet.md" className={styles.mdLink} title="Plain-text source for AI agents">
            View markdown
          </a>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <div className={styles.titleBlock}>
              <div className={styles.titleRootstock}>Rootstock</div>
              <div className={styles.titleLine}>Cheat</div>
              <div className={styles.titleLine}>Sheet</div>
            </div>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroLead}>Start building on Rootstock in minutes.</p>
            <p className={styles.heroSub}>
              Network setup, starter kits, AI tooling, and institutional entry points on one page.
            </p>
          </div>
          <BrowserOnly fallback={null}>{() => <CheatsheetQr />}</BrowserOnly>
        </div>
      </header>

      <StartHereSection />

      <main className={styles.main}>
        <section className={styles.section} id="environment">
          <div className={styles.sectionGrid}>
            <SectionAside
              sticky
              num="1.0"
              label="Dev Environment"
              title="Set up your environment"
              desc="Essential network setup and developer tooling."
            />
            <div className={styles.sectionBody}>
              <div className={styles.itemCard}>
                <ItemHeading>1.1 Add Rootstock to MetaMask</ItemHeading>
                <p className={styles.itemText} data-markdown-ignore="true">
                  Click a button below or copy network details into your wallet.
                </p>
                <p className={styles.itemSubLabel}>MetaMask</p>
                <BrowserOnly fallback={null}>{() => <MetaMaskButtons />}</BrowserOnly>
                <p className={styles.itemSubLabel}>Rootstock Explorer</p>
                <ExplorerNetworkLinks />
                <div className={styles.buttonRow} data-markdown-ignore="true">
                  <CheatsheetButton href="/dev-tools/wallets/metamask/" internal>
                    MetaMask setup guide
                  </CheatsheetButton>
                </div>
                <div className={styles.tabRow}>
                  <button
                    type="button"
                    className={activeNetwork === 'testnet' ? styles.tabActive : styles.tab}
                    onClick={() => setActiveNetwork('testnet')}>
                    Testnet
                  </button>
                  <button
                    type="button"
                    className={activeNetwork === 'mainnet' ? styles.tabActive : styles.tab}
                    onClick={() => setActiveNetwork('mainnet')}>
                    Mainnet
                  </button>
                </div>
                <NetworkParams networkKey={activeNetwork} />
              </div>

              <div className={styles.itemCard}>
                <ItemHeading>1.2 Get Testnet Tokens</ItemHeading>
                <p className={styles.itemText}>
                  Get tRBTC from the faucet. Promo codes for events are posted on the faucet site.
                </p>
                <CheatsheetButton href="https://faucet.rootstock.io">faucet.rootstock.io</CheatsheetButton>
              </div>

              <div className={styles.itemCard}>
                <ItemHeading>1.3 RPC Provider</ItemHeading>
                <p className={styles.itemText}>
                  Production-grade RPC API for Rootstock. Create a free API key for higher limits.
                </p>
                <div className={styles.buttonRow} data-markdown-ignore="true">
                  <CheatsheetButton href="https://rpc.rootstock.io">rpc.rootstock.io</CheatsheetButton>
                  <CheatsheetButton href="https://rpc.rootstock.io/doc">RPC API Sandbox</CheatsheetButton>
                  <CheatsheetButton href="/developers/rpc-api/rootstock/setup/" internal>
                    RPC API setup guide
                  </CheatsheetButton>
                </div>
              </div>

              <div className={styles.itemCard}>
                <ItemHeading>1.4 Solidity Compiler</ItemHeading>
                <p className={styles.itemText}>
                  Recommended compiler settings for Rootstock. See the EVM compatibility matrix for
                  opcode support and behavioral differences vs Ethereum.
                </p>
                <div className={styles.networkTable} data-markdown-ignore="true">
                  <div className={styles.networkRow}>
                    <span className={styles.networkKey}>Supported Version</span>
                    <code className={styles.networkValue}>{EVM_COMPILER.solidityVersionDisplay}</code>
                    <CopyButton value={EVM_COMPILER.solidityVersion} label="Solidity version" />
                  </div>
                  <div className={styles.networkRow}>
                    <span className={styles.networkKey}>EVM Version</span>
                    <code className={styles.networkValue}>{EVM_COMPILER.evmVersionDisplay}</code>
                    <CopyButton value={EVM_COMPILER.evmVersion} label="EVM version" />
                  </div>
                </div>
                <div className={styles.buttonRow} data-markdown-ignore="true">
                  <CheatsheetButton href={EVM_COMPILER.explorerUrl}>
                    EVM Compatibility Explorer
                  </CheatsheetButton>
                  <CheatsheetButton href={EVM_COMPILER.requirementsPath} internal>
                    Requirements
                  </CheatsheetButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="build">
          <div className={styles.sectionGrid}>
            <SectionAside
              num="2.0"
              label="Build"
              title="Build and deploy"
              desc="Starter kits and deployment resources for Rootstock."
            />
            <div className={styles.sectionBody}>
              {STARTER_KITS.map((kit) => (
                <KitCard key={kit.title} kit={kit} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="verify">
          <div className={styles.sectionGrid}>
            <SectionAside
              num="3.0"
              label="Verify"
              title="Verify and observe"
              desc="Verify contracts and explore onchain activity."
            />
            <div className={styles.sectionBody}>
              {VERIFY_LINKS.map((item) =>
                item.internal ? (
                  <Link key={item.href} to={item.href} className={styles.linkCard}>
                    <div className={styles.linkCardTitle}>{item.title}</div>
                    <div className={styles.linkCardDesc}>{item.description}</div>
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.linkCard}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={styles.linkCardTitle}>{item.title}</div>
                    <div className={styles.linkCardDesc}>{item.description}</div>
                  </a>
                ),
              )}
            </div>
          </div>
        </section>

        <section className={styles.section} id="ai">
          <div className={styles.sectionGrid}>
            <SectionAside
              num="4.0"
              label="Build with AI"
              title="Build with AI"
              desc="MCP, Skills, and the Rootstock AI Assistant for agent-first development."
              optional
            />
            <div className={styles.sectionBody}>
              {AI_TOOLS.map((tool) => (
                <div className={styles.itemCard} key={tool.title}>
                  <ItemHeading>{tool.title}</ItemHeading>
                  <p className={styles.itemText}>{tool.description}</p>
                  {tool.snippet ? <pre className={styles.codeBlock}>{tool.snippet}</pre> : null}
                  <div className={styles.buttonRow} data-markdown-ignore="true">
                    {tool.links.map((link) => (
                      <CheatsheetButton key={link.href} href={link.href} internal={link.internal}>
                        {link.label}
                      </CheatsheetButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="institutional">
          <div className={styles.sectionGrid}>
            <SectionAside
              num="5.0"
              label="Institutional"
              title="Institutional"
              desc="Infrastructure and DeFi primitives for institutions."
              optional
            />
            <div className={styles.sectionBody}>
              <div className={styles.tableScroll}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INSTITUTIONAL.map((row) => (
                      <tr key={row.product}>
                        <td>{row.product}</td>
                        <td>{row.description}</td>
                        <td>
                          {row.internal ? (
                            <Link to={row.href}>Open guide</Link>
                          ) : (
                            <a href={row.href} target="_blank" rel="noopener noreferrer">
                              Open
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="support">
          <div className={styles.sectionGrid}>
            <SectionAside
              num="6.0"
              label="Support"
              title="Support and docs"
              desc="Get help and stay connected."
            />
            <div className={styles.sectionBody}>
              <div className={styles.buttonRow} data-markdown-ignore="true">
                {SUPPORT_LINKS.map((link) => (
                  <CheatsheetButton key={link.href} href={link.href}>
                    {link.label}
                  </CheatsheetButton>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="reference">
          <div className={styles.sectionGrid}>
            <SectionAside
              num="Ref"
              label="Networks"
              compactBadge
              title="Network quick reference"
              desc="Copy values for testnet and mainnet. Currency symbol is rBTC on mainnet."
            />
            <div className={styles.sectionBody}>
              <div className={styles.tableScroll}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Testnet</th>
                      <th>Mainnet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUICK_REFERENCE.map((row) => (
                      <tr key={row.param}>
                        <td>{row.param}</td>
                        <td>
                          <ReferenceCell value={row.testnet} />
                        </td>
                        <td>
                          <ReferenceCell value={row.mainnet} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.relatedLabel}>Related guides</p>
              <div className={styles.buttonRow} data-markdown-ignore="true">
                {REFERENCE_GUIDES.map((guide) => (
                  <CheatsheetButton
                    key={guide.href}
                    href={guide.href}
                    internal={guide.internal}>
                    {guide.label}
                  </CheatsheetButton>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        Rootstock. Bitcoin&apos;s Smart Contract Platform · dev.rootstock.io · rootstock.io
      </footer>
    </div>
  );
}
