import Input from "../components/input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-[#005C97] to-[#00F260]'>
			<div className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#005C97] to-[#00F260]'>
						Create Account
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='border-gray-400 focus:border-[#00F260] transition-colors duration-200'
						/>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='border-gray-400 focus:border-[#00F260] transition-colors duration-200'
						/>
						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='border-gray-400 focus:border-[#00F260] transition-colors duration-200'
						/>
						{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
						<PasswordStrengthMeter password={password} />

						<button
							className='mt-5 w-full py-3 px-4 bg-[#005C97] text-white font-bold rounded-lg shadow-lg
							hover:bg-[#00F260] transition duration-200 focus:outline-none focus:ring-2 
							focus:ring-[#00F260] focus:ring-offset-2 focus:ring-offset-white'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
						</button>
					</form>
				</div>
				<div className='px-8 py-4 bg-white bg-opacity-50 flex justify-center'>
					<p className='text-sm text-gray-500'>
						Already have an account?{" "}
						<Link
							to={"/login"}
							className='text-[#00F260] hover:text-[#005C97] transition-colors duration-200 hover:underline'
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
