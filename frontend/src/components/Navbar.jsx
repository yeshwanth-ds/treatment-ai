import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaUserCircle } from 'react-icons/fa'; // Import the user icon
import { useAuthStore } from '../store/authStore'; // Adjust the import path if necessary

const Navbar = () => {
    const { isAuthenticated } = useAuthStore(); // Get authentication status
    const navigate = useNavigate(); // To programmatically navigate

    const handleGetStartedClick = () => {
        if (isAuthenticated) {
            navigate('/get-treatment'); // Navigate to Get Treatment page if logged in
        } else {
            navigate('/login'); // Navigate to Login page if not logged in
        }
    };

    return (
        <nav className="bg-[#005C97] p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white font-bold text-xl">
                    <Link to="/">Treatment <span className="text-[#00F260]">AI</span></Link>
                </div>
                
                {/* Links */}
                <div className="flex space-x-4">
                    <button onClick={handleGetStartedClick} className="text-white hover:text-teal-400">
                        Get Started
                    </button>
                    <Link>|</Link>
                    <Link to="/about-us" className="text-white hover:text-teal-400">About Us</Link>
                    <Link>|</Link>
                    <Link to="/contact-us" className="text-white hover:text-teal-400">Contact Us</Link>
                </div>

                {/* Profile Icon */}
                <div className="flex justify-center">
                    <Link to="/dashboard" className="text-white hover:text-teal-400">
                        <FaUserCircle className="w-8 h-8" /> {/* Profile Icon */}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
