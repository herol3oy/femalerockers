'use client'

import { useState } from 'react'

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text.trim())
      setCopiedField(fieldId)
      setTimeout(() => setCopiedField(null), 1200)
    } catch {
      alert('Copy failed. Please copy manually.')
    }
  }

  return (
    <div className="fr-donate">
      <div className="fr-donate__header">Support Female Rockers</div>

      <div className="fr-donate__section">
        <div className="fr-donate__title">PayPal</div>
        <div className="fr-donate__row">
          <code>femalerockerscontact@gmail.com</code>
          <button
            className="fr-copy"
            onClick={() =>
              copyToClipboard('femalerockerscontact@gmail.com', 'paypal')
            }
          >
            {copiedField === 'paypal' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="fr-donate__hint">
          Send as “Friends & Family” if appropriate in your country.
        </div>
      </div>

      <div className="fr-donate__section">
        <div className="fr-donate__title">Bank Transfer (Wise)</div>
        <div className="fr-donate__grid">
          {[
            ['Account Name', 'Morteza Yazdanikarizi', 'accname'],
            ['Bank', 'Wise', 'bank'],
            ['IBAN', 'BE24 9678 2336 2638', 'iban'],
            ['SWIFT/BIC', 'TRWIBEB1XXX', 'swift'],
            ['Reference', 'Donation to Female Rockers', 'ref'],
            ['Address', 'Jocs Florals 45, 08014, Barcelona, Spain', 'addr'],
          ].map(([label, value, id]) => (
            <div key={label}>
              <div className="fr-donate__label">{label}</div>
              <div className="fr-donate__value">
                <code>{value}</code>
                <button
                  className="fr-copy"
                  onClick={() => copyToClipboard(value, id)}
                >
                  {copiedField === id ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fr-donate__section">
        <div className="fr-donate__title">Crypto — USDT (Tether)</div>

        {[
          [
            'Ethereum · ERC-20',
            '0x3Fd5E4a6480869BC3f35dA5ddCa7deF368DB05B7',
            'eth',
          ],
          ['TRON · TRC-20', 'TM5nYwKiWifmsAsEs1ZEPon3mcD5jQnh3t', 'tron'],
          [
            'BNB Smart Chain · BEP-20',
            '0x3Fd5E4a6480869BC3f35dA5ddCa7deF368DB05B7',
            'bsc',
          ],
        ].map(([badge, address, id]) => (
          <div className="fr-donate__row" key={id}>
            <div className="fr-donate__badge">{badge}</div>
            <code>{address}</code>
            <button
              className="fr-copy"
              onClick={() => copyToClipboard(address, id)}
            >
              {copiedField === id ? 'Copied' : 'Copy'}
            </button>
          </div>
        ))}

        <div className="fr-donate__hint">
          Send only USDT on the matching network. Using the wrong network can
          result in loss of funds.
        </div>
      </div>

      <div className="fr-donate__footer">
        Thank you for supporting independent art. 💛
      </div>

      <style jsx>{`
        .fr-donate {
          --bg: #0b0c10;
          --ink: #e8e8e8;
          --muted: #9aa3ad;
          --accent: #ffd166;
          --line: #222831;
          max-width: 880px;
          margin: 24px auto;
          padding: 20px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: linear-gradient(180deg, #0b0c10 0%, #121319 100%);
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          color: var(--ink);
        }
        .fr-donate__header {
          font-weight: 700;
          letter-spacing: 0.4px;
          margin-bottom: 12px;
        }
        .fr-donate__section {
          border-top: 1px solid var(--line);
          padding-top: 16px;
          margin-top: 16px;
        }
        .fr-donate__title {
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--accent);
        }
        .fr-donate__row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 8px 0;
          flex-wrap: wrap;
        }
        .fr-donate__grid {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 8px;
        }
        .fr-donate__label {
          color: var(--muted);
        }
        .fr-donate__value {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        code {
          background: #11161c;
          border: 1px solid var(--line);
          padding: 8px 10px;
          border-radius: 8px;
          display: inline-block;
          overflow: hidden;
        }
        .fr-copy {
          cursor: pointer;
          border: 1px solid var(--line);
          background: #151a21;
          color: var(--ink);
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
        }
        .fr-copy:hover {
          border-color: #2b3340;
        }
        .fr-donate__badge {
          font-size: 12px;
          color: #cbd5e1;
          background: #1a2029;
          border: 1px solid #243042;
          padding: 3px 8px;
          border-radius: 999px;
          margin-right: 6px;
        }
        .fr-donate__hint {
          font-size: 12px;
          color: var(--muted);
          margin-top: 6px;
        }
        .fr-donate__footer {
          border-top: 1px dashed var(--line);
          margin-top: 18px;
          padding-top: 12px;
          font-size: 12px;
          color: var(--muted);
        }
        @media (max-width: 640px) {
          .fr-donate__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
