import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);

    return (
        <form onSubmit={loginUser} style={styles.form}>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="email"
                        value={loginInfo.email || ''}
                        onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={loginInfo.password || ''}
                        onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        {isLoginLoading ? 'Loading...' : 'Login'}
                    </button>

                    {loginError?.error && (
                        <div style={styles.alert}>
                            <p>{loginError?.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

const styles = {
    form: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
        margin: 0,
    },
    container: {
        width: '100%',
        maxWidth: '600px',
    },
    card: {
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    input: {
        display: 'block',
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
    alert: {
        padding: '10px',
        marginTop: '10px',
        borderRadius: '4px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
    },
};

export default Login;
