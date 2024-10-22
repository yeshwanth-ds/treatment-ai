import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260] text-white ">
            <Navbar />
            <div className="container mx-auto px-6 py-16 mt-12">
                <h1 className="text-5xl font-bold text-center mb-6">About Us</h1>
                <p className="text-lg leading-relaxed text-center mb-8">
                    At Treatment Made Easy AI, we are dedicated to transforming healthcare through innovative technology. Our team of experts combines medical knowledge with artificial intelligence to create solutions that empower both patients and providers.
                </p>
                <h2 className="text-4xl font-bold text-center mb-6 mt-24">Our Mission</h2>
                <p className="text-lg leading-relaxed text-center mb-8">
                    Our mission is to make medical treatments more accessible and personalized, ensuring that every individual receives the care they deserve. We believe in leveraging technology to bridge gaps in healthcare.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUsPage;
