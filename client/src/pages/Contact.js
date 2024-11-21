import React from "react";
import Layout from "../components/Layout/Layout";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact Us - Saman</title>
        <meta
          name="description"
          content="Get in touch with us for any queries or feedback. We are here to assist you!"
        />
        <meta name="author" content="Safal lama" />
        <meta
          name="keywords"
          content="contact, get in touch, customer support, feedback"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="container my-5">
        <h1 className="text-center mb-4">Contact Us</h1>

        <div className="row justify-content-center">
          <div className="col-11 col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm p-4">
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="form-label d-flex align-items-center"
                  >
                    <FaUser className="me-2 text-muted" /> Name
                  </label>
                  <input
                    type="text"
                    className="form-control border rounded-1"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label d-flex align-items-center"
                  >
                    <FaEnvelope className="me-2 text-muted" /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control border rounded-1"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="form-label d-flex align-items-center"
                  >
                    <FaCommentDots className="me-2 text-muted" /> Message
                  </label>
                  <textarea
                    className="form-control border rounded-1"
                    id="message"
                    rows="3"
                    placeholder="Write your message here"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
