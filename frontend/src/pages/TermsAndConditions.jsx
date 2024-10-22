import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260] text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-center mb-6">Terms and Conditions</h1>
                <p className="text-lg leading-relaxed text-center mb-8">
                    Please read these terms and conditions carefully before using our services.
                </p>
                <h2 className="text-4xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="text-lg leading-relaxed mb-6">
                    By accessing or using our services, you agree to be bound by these terms and conditions.
                </p>
                <h2 className="text-4xl font-bold mb-4">Use of Services</h2>
                <p className="text-lg leading-relaxed mb-6">
                    You agree to use our services only for lawful purposes and in accordance with our policies.
                </p>
                <h2 className="text-4xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-lg leading-relaxed mb-6">
                    We will not be liable for any damages arising from the use of our services.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
