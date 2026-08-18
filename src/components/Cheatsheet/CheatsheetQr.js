import React, {useCallback, useEffect, useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.scss';

const QR_SIZE = 136;

function buildQrOptions({data, image}) {
  return {
    width: QR_SIZE,
    height: QR_SIZE,
    type: 'svg',
    data,
    image,
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
    dotsOptions: {
      color: '#000000',
      type: 'rounded',
    },
    backgroundOptions: {
      color: '#deff1a',
    },
    imageOptions: {
      imageSize: 0.4,
      margin: 2,
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: '#ff9100',
    },
  };
}

export default function CheatsheetQr() {
  const containerRef = useRef(null);
  const qrRef = useRef(null);
  const {siteConfig} = useDocusaurusContext();
  const iconPath = useBaseUrl('/img/cheatsheet/rootstock-qr-icon.svg');
  const pageUrl = `${siteConfig.url.replace(/\/$/, '')}/cheatsheet?utm_source=cheatsheet&utm_medium=qr`;

  useEffect(() => {
    let mounted = true;

    import('qr-code-styling').then(({default: QRCodeStyling}) => {
      if (!mounted || !containerRef.current) {
        return;
      }

      const image = `${window.location.origin}${iconPath}`;
      const options = buildQrOptions({data: pageUrl, image});
      containerRef.current.innerHTML = '';
      const qr = new QRCodeStyling(options);
      qr.append(containerRef.current);
      qrRef.current = qr;
    });

    return () => {
      mounted = false;
      qrRef.current = null;
    };
  }, [iconPath, pageUrl]);

  const handleDownload = useCallback(async () => {
    const {default: QRCodeStyling} = await import('qr-code-styling');
    const image = `${window.location.origin}${iconPath}`;
    const qr = new QRCodeStyling(buildQrOptions({data: pageUrl, image}));
    qr.download({name: 'rootstock-cheatsheet-qr', extension: 'png'});
  }, [iconPath, pageUrl]);

  return (
    <div className={styles.heroQr}>
      <div className={styles.qrFrame}>
        <div
          ref={containerRef}
          className={styles.qrCanvas}
          role="img"
          aria-label="QR code linking to the Rootstock developer cheatsheet"
        />
      </div>
      <div className={styles.qrCaption}>dev.rootstock.io/cheatsheet</div>
      <button type="button" className={styles.qrDownload} onClick={handleDownload}>
        Download PNG
      </button>
    </div>
  );
}
