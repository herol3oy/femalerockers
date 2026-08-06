import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Female Rockers collects, uses, shares, and protects personal information.",
};

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About this policy",
    content: (
      <>
        <p>
          This Privacy Policy explains how Female Rockers collects, uses, shares, and protects
          personal information when you visit our website, create an account, publish a profile,
          participate in the community, or contact us.
        </p>
        <p>
          Female Rockers is an independent project and is responsible for the personal information
          described in this policy. Questions and privacy requests can be sent to{" "}
          <a href="mailto:contact@femalerockers.com">contact@femalerockers.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>We collect information in the following ways:</p>
        <ul>
          <li>
            <strong>Account information:</strong> your email address, authentication details,
            account status, invitation information, and newsletter preference.
          </li>
          <li>
            <strong>Profile information:</strong> your username, artist or band name, profile image,
            location, instrument, genre, biography, social links, video links, and collaboration
            availability.
          </li>
          <li>
            <strong>Community activity:</strong> comments, ratings, likes, referrals, challenge
            participation, and other interactions you choose to make.
          </li>
          <li>
            <strong>Submissions:</strong> collaboration and challenge details, descriptions, cover
            images, video links, status information, and related communications.
          </li>
          <li>
            <strong>Messages:</strong> your name, email address, and message when you use the
            contact form, as well as feedback you voluntarily leave when deleting an account.
          </li>
          <li>
            <strong>Technical information:</strong> authentication cookies, device and browser
            information, IP address, request logs, and security events that may be processed
            automatically by our service providers when you use the website.
          </li>
        </ul>
        <p>
          If you sign in with Google, we receive the basic account information Google makes
          available for authentication, such as your email address and profile identity. We do not
          receive your Google password.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How and why we use information",
    content: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>create, authenticate, and administer accounts;</li>
          <li>publish artist profiles and provide community features;</li>
          <li>review, manage, and promote collaboration or challenge submissions;</li>
          <li>send invitations and necessary service communications;</li>
          <li>send newsletters when you have opted in and let you opt out again;</li>
          <li>respond to questions and support requests;</li>
          <li>
            secure the service, prevent misuse, moderate content, and diagnose technical problems;
            and
          </li>
          <li>comply with legal obligations and protect legal rights.</li>
        </ul>
        <p>
          Depending on the activity and applicable law, we rely on performance of our agreement with
          you, your consent, our legitimate interests in operating and protecting Female Rockers,
          and compliance with legal obligations. You can withdraw consent for future processing at
          any time, including by turning off newsletter emails in your profile.
        </p>
        <p>
          We do not use your information for solely automated decisions that produce legal or
          similarly significant effects.
        </p>
      </>
    ),
  },
  {
    id: "public-information",
    title: "Public profiles and content",
    content: (
      <>
        <p>
          Female Rockers is designed to help musicians be discovered. Profile information and
          community contributions you publish may therefore be visible to anyone, including people
          without an account, and may appear in search results.
        </p>
        <p>
          Collaboration and challenge submissions are initially used for review and administration.
          Selected content may be featured on Female Rockers’ website and social channels as
          described in our <Link href="/terms">Terms &amp; Conditions</Link>. Please do not submit
          sensitive information or content you do not want shared for those purposes.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    content: (
      <>
        <p>We may share information with:</p>
        <ul>
          <li>
            <strong>Supabase</strong> for authentication, database, and file storage services;
          </li>
          <li>
            <strong>Google</strong> when you choose Google authentication;
          </li>
          <li>
            <strong>Brevo</strong> for transactional or opted-in email delivery;
          </li>
          <li>
            <strong>Web3Forms</strong> to process messages submitted through our contact form;
          </li>
          <li>
            hosting, security, maintenance, and other technical providers that process information
            on our behalf;
          </li>
          <li>social media platforms when content is selected and authorized for promotion; and</li>
          <li>
            authorities or other parties when reasonably necessary to comply with law, enforce our
            terms, protect safety, or defend legal rights.
          </li>
        </ul>
        <p>
          We do not sell personal information or share it for cross-context behavioral advertising.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    content: (
      <p>
        Our service providers and social platforms may process information in countries other than
        the country where you live. Where applicable law requires it, we rely on recognized
        safeguards for international transfers, such as adequacy decisions or standard contractual
        clauses. Contact us if you would like more information about safeguards relevant to your
        information.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technology",
    content: (
      <>
        <p>
          We use cookies and similar local technology that are necessary to authenticate users,
          maintain sessions, protect the website, and remember interface preferences. Blocking
          essential cookies may prevent account features from working correctly.
        </p>
        <p>
          Female Rockers does not currently use advertising cookies or website analytics trackers.
          If that changes, we will update this policy and request consent where required.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    content: (
      <>
        <p>
          We keep account and profile information while your account is active and for as long as
          reasonably necessary to provide the service. If you deactivate your account, your
          information is preserved so the profile can be restored when you reactivate.
        </p>
        <p>
          When you permanently delete your account, we remove the account, profile, contributions,
          collaboration records, and uploaded profile or cover images from active systems. Limited
          copies may remain for a reasonable period in protected backups or where retention is
          required for security, fraud prevention, dispute resolution, or law. Voluntary
          account-deletion feedback may be retained without your user ID, email, or username.
        </p>
        <p>
          Other records, such as contact messages, invitation delivery logs, and administrative
          records, are kept only for as long as reasonably needed for their purpose and any
          applicable legal requirements. Newsletter information is kept until you opt out or ask us
          to delete it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use reasonable technical and organizational measures intended to protect personal
        information, including access controls and restricted administrative access. No online
        service can guarantee absolute security, so please use a strong, unique password and tell us
        promptly if you believe your account has been compromised.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights and choices",
    content: (
      <>
        <p>
          Depending on where you live, you may have rights to access, correct, delete, restrict, or
          object to processing of your personal information; receive a portable copy; withdraw
          consent; and lodge a complaint with a data protection authority. These rights may be
          subject to legal conditions and exceptions.
        </p>
        <p>
          You can update profile information, manage your newsletter preference, deactivate your
          account, or permanently delete it through account settings. For any other request, email{" "}
          <a href="mailto:contact@femalerockers.com">contact@femalerockers.com</a>. We may need to
          verify your identity before completing a request.
        </p>
      </>
    ),
  },
  {
    id: "age",
    title: "Age requirement",
    content: (
      <p>
        Female Rockers accounts are intended only for people who are at least 18 years old. We do
        not knowingly collect personal information from anyone under 18. If you believe a person
        under 18 has created an account, please contact us so we can investigate and take
        appropriate action.
      </p>
    ),
  },
  {
    id: "changes-and-contact",
    title: "Changes and contact",
    content: (
      <>
        <p>
          We may update this Privacy Policy as the service, our providers, or legal requirements
          change. We will post the revised policy here and update the date above. Where required, we
          will provide additional notice or ask for consent.
        </p>
        <p>
          Questions, concerns, and privacy requests can be sent to{" "}
          <a href="mailto:contact@femalerockers.com">contact@femalerockers.com</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Female Rockers handles personal information and the choices available to you."
      lastUpdated="August 5, 2026"
      sections={sections}
    />
  );
}
