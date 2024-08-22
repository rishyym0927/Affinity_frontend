import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';

const Login = () => {
    const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);

    return (
        <div className="bg-black text-gray-200 w-full h-screen flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-2xl shadow-2xl h-[27rem] flex max-w-4xl w-full">
                <motion.div
                    className="w-1/2 pr-8 border-r border-gray-700"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="text-4xl font-extrabold mb-2 text-[#ff0059]">Welcome Back</h2>
                    <p className="text-gray-400 mb-8">Log in to continue your journey</p>
                    <form onSubmit={loginUser} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={loginInfo.email || ''}
                                onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0059] text-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={loginInfo.password || ''}
                                onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0059] text-gray-200"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full px-4 py-2 bg-[#ff0059] hover:bg-red-500 rounded-md text-white font-bold transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLoginLoading ? 'Logging in...' : 'Login'}
                        </motion.button>
                    </form>
                    {loginError?.error && (
                        <motion.div
                            className="p-4 mt-4 rounded-md bg-red-500 text-white text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>{loginError?.message}</p>
                        </motion.div>
                    )}
                </motion.div>
                <motion.div
                    className="w-1/2 pl-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                    <Carousel />
                </motion.div>
            </div>
        </div>
    );
};

export default Login;