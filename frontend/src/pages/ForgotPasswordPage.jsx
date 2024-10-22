import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260]'>
			<div className='max-w-md w-full bg-[#005C97] bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#00F260] to-[#005C97] text-transparent bg-clip-text'>
						Forgot Password
					</h2>

					{!isSubmitted ? (
						<form onSubmit={handleSubmit}>
							<p className='text-gray-300 mb-6 text-center'>
								Enter your email address and we'll send you a link to reset your password.
							</p>
							<Input
								icon={Mail}
								type='email'
								placeholder='Email Address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<button
								className='w-full py-3 px-4 bg-[#00F260] text-white font-bold rounded-lg shadow-lg hover:bg-[#005C97] focus:outline-none focus:ring-2 focus:ring-[#00F260] focus:ring-offset-2 focus:ring-offset-[#005C97] transition duration-200'
								type='submit'
							>
								{isLoading ? (
									<span className='loader' /> // Placeholder for loading spinner if needed
								) : (
									"Send Reset Link"
								)}
							</button>
						</form>
					) : (
						<div className='text-center'>
							<div className='w-16 h-16 bg-[#00F260] rounded-full flex items-center justify-center mx-auto mb-4'>
								<Mail className='h-8 w-8 text-white' />
							</div>
							<p className='text-gray-300 mb-6'>
								If an account exists for {email}, you will receive a password reset link shortly.
							</p>
						</div>
					)}
				</div>

				<div className='px-8 py-4 bg-[#005C97] bg-opacity-90 flex justify-center'>
					<Link to={"/login"} className='text-sm text-[#00F260] hover:underline flex items-center'>
						<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
