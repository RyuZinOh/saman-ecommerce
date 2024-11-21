import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout
      title="Privacy Policy - Saman"
      description="Read our privacy policy to understand how we collect, use, and protect your personal information."
      author="Safal lama"
      keywords="privacy policy, terms of use, data protection, user rights"
    >
      <div className="container my-5">
        <h1 className="text-center mb-4">Privacy Policy</h1>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h3 className="mb-4">Introduction</h3>
            <p>
              Welcome to Saman - ecommerce. We value your privacy and are
              committed to protecting your personal data. This privacy policy
              outlines how we collect, use, and safeguard your personal
              information.
            </p>

            <h3 className="mb-4">Information We Collect</h3>
            <p>
              We may collect the following types of information when you visit
              our website:
            </p>
            <ul>
              <li>Personal details such as name, email, and phone number.</li>
              <li>
                Usage data like IP addresses, browser types, and access times.
              </li>
              <li>
                Cookies and similar tracking technologies to enhance user
                experience.
              </li>
            </ul>

            <h3 className="mb-4">How We Use Your Information</h3>
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li>To provide and improve our services to you.</li>
              <li>To communicate with you about our offerings and updates.</li>
              <li>To respond to your queries and provide customer support.</li>
            </ul>

            <h3 className="mb-4">How We Protect Your Information</h3>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, alteration, or disclosure. However, no
              method of transmission over the internet or electronic storage is
              100% secure.
            </p>

            <h3 className="mb-4">Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data.</li>
              <li>Opt-out of communications from us at any time.</li>
              <li>Request information about how we handle your data.</li>
            </ul>

            <h3 className="mb-4">Cookies</h3>
            <p>
              We use cookies to improve your experience on our website. Cookies
              are small files stored on your device that help us remember your
              preferences and personalize your visit. You can control the use of
              cookies through your browser settings.
            </p>

            <h3 className="mb-4">Changes to This Privacy Policy</h3>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page.
            </p>

            <h3 className="mb-4">Contact Us</h3>
            <p>
              If you have any questions about this privacy policy or your
              personal data, please contact us at [yoyuehappy@gmail.com].
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
