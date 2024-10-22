import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-[#005C97] to-[#00F260]'>
            <div className='max-w-md w-full bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden'>
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#005C97] to-[#00F260] text-transparent bg-clip-text'>
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin}>
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='flex items-center mb-6'>
                            <Link to='/forgot-password' className='text-sm text-[#00F260] hover:underline'>
                                Forgot password?
                            </Link>
                        </div>
                        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

                        <button
                            className='w-full py-3 px-4 bg-gradient-to-r from-[#00F260] to-[#005C97] text-white font-bold rounded-lg shadow-lg hover:from-[#005C97] hover:to-[#00F260] transition duration-200'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
                        </button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-[#005C97] bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-white'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-[#00F260] hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
