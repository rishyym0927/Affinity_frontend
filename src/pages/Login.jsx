import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
const Login = () => {
    const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);

    return (
        <div className="bg-black text-gray-200 gap-4 w-full h-screen flex flex-row items-center justify-center">
            <div className='bg-red-200 h-[25rem]'>
                <Carousel />
            </div>
            <motion.div 
                className="bg-neutral-800 p-8 h-[25rem] rounded-lg shadow-lg max-w-sm w-full"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="text-3xl font-extrabold text-center mb-6 text-stone-200">Login</h2>
                <form onSubmit={loginUser} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={loginInfo.email || ''}
                        onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-md bg-stone-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0059] text-gray-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginInfo.password || ''}
                        onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                        className="w-full px-4 py-2 rounded-md bg-stone-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0059] text-gray-200"
                    />
                    <motion.button 
                        type="submit"
                        className="w-full px-4 py-2 bg-[#ff0059] hover:bg-red-500 rounded-md text-white font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {isLoginLoading ? 'Loading...' : 'Login'}
                    </motion.button>
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
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
