import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#005C97] text-white p-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* New content on the left side */}
                <div className="text-left mb-4 md:mb-0">
                    <p className="text-sm">
                        <strong>Contact Us:</strong>support@treatmentai.com
                    </p>
                </div>

                {/* Centered copyright and policy links */}
                <div className="text-center mb-4 md:mb-0">
                    <p className="text-sm">
                        © 2024 Yeshwanth D S | Treatment AI. All Rights Reserved.
                    </p>
                    <p className="text-sm">
                        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
                        <a href="/terms-of-service" className="hover:underline"> Terms of Service</a>
                    </p>
                </div>

                {/* Social Media Links on the right */}
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F260]">
                        <FaFacebook size={20} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F260]">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F260]">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F260]">
                        <FaInstagram size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
