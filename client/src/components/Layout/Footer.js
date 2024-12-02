import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      text: "“Saman offers the best shopping experience! I found everything I need with amazing deals.”",
      name: "Alicia S.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      text: "“Great product variety and top-notch customer service. Definitely my go-to store!”",
      name: "Jon D.",
      image: "https://randomuser.me/api/portraits/men/57.jpg",
    },
    {
      text: "“Quick delivery and excellent quality. I'm very happy with my purchases from Saman.”",
      name: "Maya L.",
      image: "https://randomuser.me/api/portraits/women/61.jpg",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-dark text-white py-5">
      <footer className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h4>About Saman</h4>
            <p>
              Saman is your one-stop shop for the best products at the best
              prices. We provide top-quality items and reliable service to our
              customers.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to="/about"
                  className="text-white text-decoration-none hover-text-yellow"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-white text-decoration-none hover-text-yellow"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/policy"
                  className="text-white text-decoration-none hover-text-yellow"
                >
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Contact Us</h4>
            <p>
              Email:{" "}
              <a
                href="mailto:yoyuehappy@gmail.com"
                className="text-white text-decoration-none"
              >
                yoyuehappy@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+977 9814202188"
                className="text-white text-decoration-none"
              >
                +977 9814202188
              </a>
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Customer Testimonials</h4>
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={prevTestimonial}
                className="btn btn-link text-white"
              >
                <FaArrowLeft size={20} />
              </button>
              <div className="d-flex align-items-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt="Customer"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <p className="mb-0">
                  <i>{testimonials[currentTestimonial].text}</i>
                </p>
              </div>
              <button
                onClick={nextTestimonial}
                className="btn btn-link text-white"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
            <p className="font-weight-bold mt-2">
              {testimonials[currentTestimonial].name}
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2024 Saman. All Rights Reserved.</p>
          <div className="mt-3">
            <a
              href="https://github.com/ryuzinoh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 text-decoration-none"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/yoyuehappy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 text-decoration-none"
            >
              <RiTwitterXFill size={24} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 text-decoration-none"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 text-decoration-none"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
