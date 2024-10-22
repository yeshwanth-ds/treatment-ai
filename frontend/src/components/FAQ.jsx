import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is Treatment AI?",
            answer: "Treatment AI is an AI-powered platform that helps streamline medical treatments, ensuring personalized care and efficiency."
        },
        {
            question: "How does AI improve patient care?",
            answer: "AI assists in diagnosing, predicting patient needs, and optimizing treatment plans, resulting in better outcomes and improved decision-making."
        },
        {
            question: "Is this platform for healthcare providers?",
            answer: "Yes, the platform is designed to support healthcare providers by simplifying complex processes."
        }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                    <h3
                        className="text-lg font-semibold cursor-pointer hover:text-[#00F260] transition duration-300"
                        onClick={() => toggleQuestion(index)}
                    >
                        {faq.question}
                    </h3>
                    {activeIndex === index && (
                        <p className="mt-2 text-base text-gray-300">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
