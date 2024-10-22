import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260] text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-center mb-6">Contact Us</h1>
                <p className="text-lg leading-relaxed text-center mb-8">
                    We would love to hear from you! If you have any questions, suggestions, or feedback, please reach out to us.
                </p>
                <form className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-lg" htmlFor="name">Name</label>
                        <input className="w-full p-2 rounded-lg" type="text" id="name" placeholder="Your Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg" htmlFor="email">Email</label>
                        <input className="w-full p-2 rounded-lg" type="email" id="email" placeholder="Your Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg" htmlFor="message">Message</label>
                        <textarea className="w-full p-2 rounded-lg" id="message" placeholder="Your Message" rows="4"></textarea>
                    </div>
                    <button className="bg-[#00F260] text-[#005C97] py-3 px-8 rounded-lg font-semibold hover:bg-[#005C97] hover:text-white transition duration-300 shadow-md">
                        Send Message
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUsPage;
