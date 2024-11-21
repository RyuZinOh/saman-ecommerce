import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout
      title="About Us - Saman"
      description="Learn more about our mission, values, and the team behind My Website."
      author="Safal lama"
      keywords="About us, mission, team, values"
    >
      <div className="container my-5">
        <h1 className="text-center mb-4">About Us</h1>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <p className="text-muted text-center mb-4">
              Welcome to our website! We're dedicated to providing you with the
              best services and information to meet your needs.
            </p>
            <h3 className="mb-3">Our Mission</h3>
            <p>
              Our mission is to deliver quality and value through our services,
              helping our clients achieve their goals with ease and confidence.
              We believe in building a community where everyone feels supported
              and informed.
            </p>

            <h3 className="mb-3">Our Values</h3>
            <ul>
              <li>
                Integrity: We uphold honesty and transparency in all that we do.
              </li>
              <li>
                Innovation: We strive to bring fresh ideas and continuous
                improvement.
              </li>
              <li>
                Excellence: Our commitment to quality drives us to exceed
                expectations.
              </li>
              <li>
                Community: Building strong relationships with our users and
                partners is at our core.
              </li>
            </ul>

            <h3 className="mb-3">Meet the Team</h3>
            <p>
              Our team is a diverse group of professionals with expertise across
              various fields, all working together to bring you the best
              possible experience. We’re here to support you every step of the
              way.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
