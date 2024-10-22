import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import logo from '../assets/logo.png';
import { useAuthStore } from '../store/authStore'; 

const HomePage = () => {
    const { isAuthenticated } = useAuthStore(); 
    const navigate = useNavigate(); 

    const handleGetStartedClick = () => {
        if (isAuthenticated) {
            navigate('/get-treatment'); 
        } else {
            navigate('/login'); 
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260] text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-16">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-2/3 text-center md:text-left mb-8 md:mb-0 mt-28">
                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Treatment Made Easy with AI
                        </h1>
                        <p className="text-lg leading-relaxed mb-8">
                            Treatment Made Easy AI leverages advanced artificial intelligence to streamline medical treatments, enhancing patient care and decision-making. Our platform simplifies complex processes for healthcare providers, ensuring efficient and personalized care.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <button
                                onClick={handleGetStartedClick}
                                className="bg-[#00F260] text-[#005C97] py-3 px-8 rounded-lg font-semibold hover:bg-[#005C97] hover:text-white transition duration-300 shadow-md transform hover:scale-105"
                            >
                                Try It Now
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center md:mr-4">
                        <img 
                            src={logo} 
                            alt="Treatment AI Logo" 
                            className="w-full h-auto max-w-[250px] rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105" 
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-52"> {/* Increased margin-top to 24 to add more space */}
                    <h2 className="text-4xl font-bold text-center mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transition transform hover:shadow-xl hover:scale-105">
                            <h3 className="text-2xl font-semibold mb-2">Personalized Treatment Plans</h3>
                            <p>Our AI analyzes individual symptoms and medical history to suggest tailored treatment options.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transition transform hover:shadow-xl hover:scale-105">
                            <h3 className="text-2xl font-semibold mb-2">Real-Time Data Analysis</h3>
                            <p>Instantly access and analyze the latest medical research and treatment protocols to inform decisions.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transition transform hover:shadow-xl hover:scale-105">
                            <h3 className="text-2xl font-semibold mb-2">User-Friendly Interface</h3>
                            <p>Navigate through our platform effortlessly, ensuring a smooth experience for both patients and providers.</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mt-16">
                    <h2 className="text-4xl font-bold text-center mb-6">What Our Users Say</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transition transform hover:shadow-xl">
                            <p className="italic">"This platform has transformed my practice! I can now provide more accurate and timely treatment recommendations." - Dr. Smith</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transition transform hover:shadow-xl">
                            <p className="italic">"I was able to find effective treatment for my symptoms quickly. Highly recommend!" - Emily R.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 transition transform hover:shadow-xl">
                            <p className="italic">"The AI's recommendations have improved my understanding of my health condition." - John D.</p>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mt-24">
                    <h2 className="text-4xl font-bold text-center mb-6">How It Works</h2>
                    <p className="text-lg leading-relaxed text-center mb-8">
                        Getting started with Treatment Made Easy AI is simple! Just enter your symptoms into our user-friendly platform, and our AI will analyze your input against a vast database of medical knowledge. You’ll receive personalized treatment recommendations tailored to your needs.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleGetStartedClick}
                            className="bg-[#005C97] text-text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#00F260] hover:[#005C97] transition duration-300 shadow-md transform hover:scale-105"
                        >
                            Try It Now
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <FAQ />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
