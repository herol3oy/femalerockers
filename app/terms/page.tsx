import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms that apply when using Female Rockers and its community features.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    content: (
      <>
        <p>
          These Terms &amp; Conditions govern your access to and use of the
          Female Rockers website, accounts, profiles, community features,
          challenges, collaborations, and related services.
        </p>
        <p>
          By creating an account or using the service, you agree to these terms
          and acknowledge our <Link href="/privacy">Privacy Policy</Link>. If
          you do not agree, do not create an account or use member-only
          features.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and accounts",
    content: (
      <>
        <p>
          You must be at least 18 years old and legally able to enter into these
          terms. By creating an account, you confirm that you meet these
          requirements.
        </p>
        <p>
          Registration may require an invitation and account approval. You must
          provide accurate information, keep it current, protect your password
          and account access, and notify us promptly of suspected unauthorized
          use. You are responsible for activity performed through your account
          unless applicable law provides otherwise.
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "The Female Rockers service",
    content: (
      <>
        <p>
          Female Rockers is an independent project that helps female musicians
          present their work, participate in a community, and be considered for
          features and promotional opportunities.
        </p>
        <p>
          An account, submission, invitation, approval, profile, or community
          interaction does not guarantee discovery, publication, promotion,
          engagement, professional opportunities, or any particular result. We
          may add, change, suspend, or discontinue features when reasonably
          necessary.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>break applicable law or encourage unlawful activity;</li>
          <li>
            harass, threaten, exploit, impersonate, or invade the privacy of
            another person;
          </li>
          <li>
            upload or link to content that is unlawful, hateful, deceptive,
            defamatory, sexually exploitative, or intentionally harmful;
          </li>
          <li>
            infringe copyrights, trademarks, privacy, publicity, or other
            rights;
          </li>
          <li>
            distribute malware, probe security, bypass access controls, scrape
            the service at unreasonable volume, or interfere with operation;
          </li>
          <li>
            send spam or use the community for unauthorized advertising; or
          </li>
          <li>
            misuse another person’s account, invitation, identity, or personal
            information.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content and our permission to use it",
    content: (
      <>
        <p>
          You retain ownership of content you create and submit. You are
          responsible for it and confirm that you have all rights, licenses,
          consents, and permissions needed to upload, link, display, and promote
          it, including permissions relating to music, performances, images,
          video, artwork, names, and anyone appearing in the content.
        </p>
        <p>
          You grant Female Rockers a worldwide, non-exclusive, royalty-free
          license to host, store, reproduce, resize, crop, format, caption,
          display, distribute, communicate, and promote your content for
          operating, improving, and publicizing Female Rockers and its artists.
          This permission includes using your artist name, profile information,
          and submitted media on the website and Female Rockers’ social
          channels, and allowing our technical providers and those social
          platforms to process the content for those purposes.
        </p>
        <p>
          This license does not transfer ownership to Female Rockers. It ends
          when the relevant content or account is deleted, except to the extent
          content has already been published on a third-party platform, reshared
          by others, retained in a temporary backup, or must be kept for legal
          reasons. You may contact us to request removal from channels we
          control.
        </p>
      </>
    ),
  },
  {
    id: "submissions",
    title: "Collaborations and challenges",
    content: (
      <>
        <p>
          When you submit a collaboration or challenge entry, you authorize
          Female Rockers to access the submitted public link, review and
          download the material, make reasonable presentation edits, prepare
          captions, and publish or promote selected content under the license
          above.
        </p>
        <p>
          Submitted video links must remain publicly accessible through a
          permanent storage provider for the time needed to review and process
          the entry. Selection, scheduling, editorial treatment, and publication
          decisions remain at Female Rockers’ discretion. We may reject or
          remove a submission that does not meet the challenge, technical,
          rights, safety, or community requirements.
        </p>
      </>
    ),
  },
  {
    id: "moderation",
    title: "Moderation and account action",
    content: (
      <>
        <p>
          We may review, limit visibility of, reject, or remove content, and may
          suspend or terminate access, when we reasonably believe it violates
          these terms, infringes rights, creates risk, or harms the service or
          community. We may also preserve or disclose information when required
          by law or reasonably necessary to protect safety and legal rights.
        </p>
        <p>
          Where practicable, we will provide notice of significant account
          action. You can ask us to review a decision by contacting us. You may
          deactivate or permanently delete your own account through profile
          settings.
        </p>
      </>
    ),
  },
  {
    id: "our-property",
    title: "Female Rockers property",
    content: (
      <p>
        The website’s software, design, branding, logos, original editorial
        material, and other Female Rockers content are owned by Female Rockers
        or its licensors and are protected by applicable intellectual property
        laws. Except as allowed by law, you may not copy, modify, sell, or use
        them commercially without written permission.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    content: (
      <p>
        The service may link to or rely on third-party websites, storage
        providers, authentication services, and social platforms. Their own
        terms and privacy policies apply to your use of those services. Female
        Rockers does not control and is not responsible for third-party content,
        availability, security, or practices.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        The service is provided on an “as is” and “as available” basis. To the
        extent permitted by law, Female Rockers does not promise uninterrupted
        or error-free operation, permanent storage, a specific audience, or any
        professional or commercial outcome. Nothing in these terms excludes
        warranties or protections that cannot lawfully be excluded.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Responsibility and liability",
    content: (
      <>
        <p>
          To the extent permitted by law, Female Rockers is not liable for
          indirect, incidental, special, or consequential losses arising from
          use of the service, loss of content, third-party conduct, or missed
          opportunities. This does not limit liability for fraud, intentional
          misconduct, gross negligence, personal injury, or any liability that
          cannot legally be limited.
        </p>
        <p>
          To the extent permitted by law, you are responsible for reasonable
          losses, claims, and costs caused by your unlawful content,
          infringement of another person’s rights, or material breach of these
          terms. This does not apply to losses caused by Female Rockers or where
          prohibited by applicable consumer law.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms to reflect service, legal, or operational
        changes. We will post the revised terms here and update the date above.
        For material changes, we will provide additional notice where reasonably
        practicable or legally required. If the law requires renewed consent, we
        will request it before the change applies to you.
      </p>
    ),
  },
  {
    id: "law-and-contact",
    title: "Applicable law and contact",
    content: (
      <>
        <p>
          These terms are governed by the laws that apply to Female Rockers and
          your use of the service. Nothing in these terms deprives you of
          mandatory protections available under the law where you live. Any
          dispute will be handled by the courts or authorities that have
          jurisdiction under applicable law.
        </p>
        <p>
          We encourage you to contact us first so we can try to resolve a
          concern. Email questions, rights notices, and other legal
          communications to{" "}
          <a href="mailto:contact@femalerockers.com">
            contact@femalerockers.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The rules and responsibilities that apply when you use Female Rockers."
      lastUpdated="August 5, 2026"
      sections={sections}
    />
  );
}
