import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans text-gray-800">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600 mt-2">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Introduction
        </h2>
        <p className="mb-4 leading-relaxed">
          eKisaan app is a commercial app by eKisaan FinAgri Ventures
          ("eKisaan"). This page is used to inform visitors regarding our
          policies with the collection, use, and disclosure of Personal
          Information for anyone using the app and website of eKisaan ("eKisaan
          Platform").
        </p>
        <p className="leading-relaxed">
          By using eKisaan Platform, you consent to the terms of our privacy
          policy ("Privacy Policy") in addition to our Terms of Service. We
          encourage you to read this Privacy Policy regarding the collection,
          use, and disclosure of your information from time to time to keep
          yourself updated with the changes & updates that we make to this
          Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Information We Collect
        </h2>

        <h3 className="text-xl font-medium mb-3 text-gray-700">
          Personal Identification Information
        </h3>
        <p className="mb-4 leading-relaxed">
          If you choose to use our Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Identification Information that we collect is used for providing and
          improving the Service. We will not use or share your information with
          anyone except as described in this Privacy Policy.
        </p>

        <h3 className="text-xl font-medium mb-3 text-gray-700">
          Non-personal Identification Information
        </h3>
        <p className="mb-4 leading-relaxed">
          We may collect non-personal identification information about users
          whenever they interact with our site. Non-personal identification
          information may include the type of mobile phone and technical
          information about users, such as the operating system and the Internet
          service providers utilized including IP address and other similar
          information.
        </p>

        <h3 className="text-xl font-medium mb-3 text-gray-700">
          Usage and Technical Information
        </h3>
        <p className="leading-relaxed">
          We collect the information about how you interact with our Service.
          This information may include your IP address, geographical location,
          browser type, referral source, length of visit, pages viewed and items
          clicked.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li>To effectively provide and introduce any new Services to you</li>
          <li>
            To monitor usage or traffic patterns and gather demographic
            information
          </li>
          <li>
            To communicate directly with you, including sending information
            about new products and services
          </li>
          <li>To deliver you a personalized experience</li>
          <li>
            To ensure compliance with our legal and regulatory obligations
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          How We Protect Your Information
        </h2>
        <p className="leading-relaxed">
          We adopt appropriate data collection, storage and processing practices
          and security measures to protect against unauthorized access,
          alteration, disclosure or destruction of your personal information,
          username, password, transaction information and data stored on our
          app. The data is stored securely on our servers at{" "}
          <a
            href="https://eKisaan.org"
            className="text-blue-600 hover:underline"
          >
            https://eKisaan.org
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Sharing Your Personal Information
        </h2>
        <p className="mb-4 leading-relaxed">
          We do not sell, trade, or rent users personal identification
          information to any third party. We may share generic aggregated
          demographic information not linked to any personal identification
          information regarding visitors and users with our business partners,
          trusted affiliates and advertisers for the purposes outlined above.
        </p>
        <p className="leading-relaxed">
          We do not disclose, transfer or share your personal information with
          others except with our affiliates and group companies, potential
          recruiters, and in compliance with legal obligations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Changes to This Privacy Policy
        </h2>
        <p className="leading-relaxed">
          We may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new Privacy Policy on this
          page. These changes are effective immediately after they are posted on
          this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Contact Us
        </h2>
        <p className="leading-relaxed">
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at:{" "}
          <a
            href="mailto:ekisaan@gmail.com"
            className="text-blue-600 hover:underline"
          >
            ekisaan@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}
