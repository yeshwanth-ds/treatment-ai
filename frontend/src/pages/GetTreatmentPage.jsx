import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from "../store/authStore";

const GetTreatmentPage = () => {
    const [symptom, setSymptom] = useState('');
    const [treatmentData, setTreatmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [displayText, setDisplayText] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const { getTreatment } = useAuthStore(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTreatmentData(null);
        setDisplayText([]);
        setIsTyping(false);

        try {
            const response = await getTreatment(symptom); 
            if (response.success) {
                setTreatmentData(response.data);
                simulateTypingEffect(response.data);
            } else {
                setError('No treatment data available');
            }
        } catch (err) {
            const errorMessage = err.message || "Error fetching treatment data. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const simulateTypingEffect = (data) => {
        const blocks = [
            `IImmediate Action: ${data.immediateAction || 'No information available.'}`,
            `MMajor Symptoms to Look For: ${data.majorSymptoms || 'No information available.'}`,
            `PPain Relief Suggestions: ${data.painRelief || 'No information available.'}`,
            `WWhen to Seek Medical Help: ${data.medicalAttention || 'No information available.'}`,
        ];

        const typingSpeed = 50; // Adjust typing speed here

        const typeBlock = (block, index) => {
            let charIndex = 0;
            setIsTyping(true);
            const typingInterval = setInterval(() => {
                setDisplayText((prev) => {
                    const newText = [...prev];
                    newText[index] = (newText[index] || '') + block[charIndex];
                    return newText;
                });
                charIndex++;

                if (charIndex >= block.length) {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                    if (index < blocks.length - 1) {
                        setTimeout(() => typeBlock(blocks[index + 1], index + 1), 500);
                    }
                }
            }, typingSpeed);
        };

        // Start typing the first block
        typeBlock(blocks[0], 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260] text-white flex flex-col">
            <Navbar />
            <div className="flex flex-grow items-center justify-center">
                <div className="container mx-auto px-6 py-16">
                    <h1 className="text-4xl font-bold text-center mb-8">Get Treatment Recommendations</h1>
                    <form onSubmit={handleSubmit} className="mb-12 flex justify-center space-x-2">
                        <input
                            type="text"
                            placeholder="Enter your symptom, e.g., I got stung by a bee."
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            className="w-full max-w-md p-4 rounded-lg text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00F260] transition duration-300"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-[#00F260] text-[#005C97] py-2 px-3 rounded-lg font-semibold w-32 hover:bg-[#005C97] hover:text-white transition duration-300 shadow-md transform hover:scale-105"
                            disabled={loading} 
                        >
                            {loading ? 'Loading...' : 'Get Treatment'}
                        </button>
                    </form>

                    {loading && <p className="text-center">Analyzing data...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {treatmentData && (
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="bg-[#005C97] text-white p-4 rounded-xl shadow-lg max-w-lg mx-auto">
                                    {displayText.map((text, index) => (
                                        <p key={index} className="mb-2">{text || 'No information available.'}</p>
                                    ))}
                                    {isTyping && <p className="animate-pulse">...</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GetTreatmentPage;
