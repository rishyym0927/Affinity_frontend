import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';

const Login = () => {
    const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(e);
    };

    const backgroundVariants = {
        animate: {
            backgroundPosition: ['0% 0%', '100% 100%'],
            transition: {
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse'
            }
        }
    };

    return (
        <motion.div 
            className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden p-4"
            variants={backgroundVariants}
            animate="animate"
            style={{
                backgroundImage: 'radial-gradient(circle, #1a1a1a 10%, transparent 10%)',
                backgroundSize: '50px 50px',
                backgroundColor: 'black'
            }}
        >
            <motion.div 
                className="bg-neutral-900 p-8 rounded-2xl shadow-2xl h-auto max-h-[90vh] flex max-w-4xl w-full relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-1/2 pr-8 border-r border-gray-700"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                    <h2 className="text-4xl font-extrabold mb-2 text-[#ff0059]">Welcome Back</h2>
                    <p className="text-gray-400 mb-8">Log in to continue your journey</p>
                    <p className='text-neutral-400 font-bold mb-14'>Not Registered Yet ? <span className='text-yellow-500'><Link to="/register">Register</Link></span></p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={loginInfo.email || ''}
                                onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                                className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0059] text-gray-200 transition duration-300"
                            />
                        </motion.div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={loginInfo.password || ''}
                                onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                                className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0059] text-gray-200 transition duration-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-[#ff0059] hover:bg-red-500 rounded-md text-white font-bold transition duration-300"
                        >
                            {isLoginLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {loginError?.error && (
                        <div className="p-3 mt-4 rounded-md bg-red-500 text-white text-center text-sm">
                            <p>{loginError?.message}</p>
                        </div>
                    )}
                </motion.div>
                <div className="w-1/2 h-64">
                    <Carousel />
                </div>
                <motion.svg
                    width="50"
                    height="50"
                    viewBox="0 0 100 100"
                    className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 opacity-20"
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <path
                        d="M50 90 C75 65, 95 33, 50 10 C5 33, 25 65, 50 90Z"
                        fill="#ff0059"
                    />
                </motion.svg>
            </motion.div>
        </motion.div>
    );
};

export default Login;