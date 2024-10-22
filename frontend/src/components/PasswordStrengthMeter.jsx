import React from "react";
import { Check, X } from "lucide-react"; 


const PasswordCriteria = ({ password }) => {
	const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div className='mt-2 space-y-1'>
			{criteria.map((item) => (
				<div key={item.label} className='flex items-center text-xs'>
					{item.met ? (
						<Check className='w-4 h-4 text-[#00F260] mr-2' /> 
					) : (
						<X className='w-4 h-4 text-[#005C97] mr-2' /> 
					)}
					<span className={item.met ? "text-[#00F260]" : "text-[#005C97]"}>
						{item.label}
					</span>
				</div>
			))}
		</div>
	);
};

const PasswordStrengthMeter = ({ password }) => {
	
	const getStrength = (pass) => {
		let strength = 0;
		if (pass.length >= 6) strength++; // Check for minimum length
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++; // Check for both cases
		if (pass.match(/\d/)) strength++; // Check for numbers
		if (pass.match(/[^a-zA-Z\d]/)) strength++; // Check for special characters
		return strength;
	};

	const strength = getStrength(password);

	
	const getColor = (strength) => {
		if (strength === 0) return "bg-gradient-to-r from-[#005C97] to-[#005C97]"; // Very Weak (blue)
		if (strength === 1) return "bg-gradient-to-r from-[#007B9F] to-[#009DAE]"; // Weak (light blue)
		if (strength === 2) return "bg-gradient-to-r from-[#00A887] to-[#00C697]"; // Fair (light green)
		if (strength === 3) return "bg-gradient-to-r from-[#00D26A] to-[#00F260]"; // Good (green)
		return "bg-gradient-to-r from-[#00F260] to-[#00FF80]"; // Strong (bright green)
	};

	// Function to get the strength text
	const getStrengthText = (strength) => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

	return (
		<div className='mt-4'>
			<div className='flex justify-between items-center mb-1'>
				<span className='text-xs text-[#005C97]'>Password strength</span>
				<span className='text-xs text-[#005C97]'>{getStrengthText(strength)}</span>
			</div>

			{/* Strength bar */}
			<div className='flex space-x-1'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className={`h-1 w-1/4 rounded-full transition-colors duration-300
                ${index < strength ? getColor(strength) : "bg-gray-600"}`}
					/>
				))}
			</div>

			{/* Display password criteria */}
			<PasswordCriteria password={password} />
		</div>
	);
};

export default PasswordStrengthMeter;
