import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260] text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-center mb-6">Privacy Policy</h1>
                <p className="text-lg leading-relaxed text-center mb-8">
                    Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.
                </p>
                <h2 className="text-4xl font-bold mb-4">Information We Collect</h2>
                <p className="text-lg leading-relaxed mb-6">
                    We collect information that you provide to us directly, such as your name, email address, and any other information you provide when you use our services.
                </p>
                <h2 className="text-4xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-lg leading-relaxed mb-6">
                    We use your information to improve our services, provide customer support, and communicate with you.
                </p>
                <h2 className="text-4xl font-bold mb-4">Data Security</h2>
                <p className="text-lg leading-relaxed mb-6">
                    We implement reasonable security measures to protect your information from unauthorized access.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
