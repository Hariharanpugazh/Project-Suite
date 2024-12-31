import React, { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { Sun, Moon, Eye, EyeOff } from "lucide-react";

    const LoginPage = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [message, setMessage] = useState("");
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        const [hoveredInput, setHoveredInput] = useState(null);
        const [showPassword, setShowPassword] = useState(false);
        const [theme, setTheme] = useState(() => {
            return localStorage.getItem('theme') || 'light';
        });
        const navigate = useNavigate();

        useEffect(() => {
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, [theme]);

        useEffect(() => {
            const handleMouseMove = (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                setMousePosition({ x, y });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, []);

        const handleLogin = async (e) => {
            e.preventDefault();
            setMessage("");
    
            try {
                const response = await fetch("http://127.0.0.1:8000/api/projects/login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();
                if (response.ok) {
                    setMessage(data.message);
                    localStorage.setItem("staff_id", data.staff_id); // Store staff_id in local storage
                    setTimeout(() => navigate(`/${data.staff_id}`), 2000); 
                } else {
                    setMessage(data.error || "Login failed.");
                }
            } catch (error) {
                setMessage("An error occurred. Please try again.");
                console.error(error);
            }
        };

        const toggleTheme = () => {
            setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
        };

        const isDarkMode = theme === 'dark';

        // Calculate grid offset based on hovered input and mouse position
        const getGridOffset = () => {
            if (!hoveredInput) return { x: mousePosition.x / 40, y: mousePosition.y / 40 };
            
            const intensity = 2; // Increased effect intensity when hovering over inputs
            return {
                x: mousePosition.x / (40 / intensity),
                y: mousePosition.y / (40 / intensity)
            };
        };

        const gridOffset = getGridOffset();

        return (
            <div className={`min-h-screen flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                        isDarkMode 
                            ? 'bg-gray-800 text-[#ffcc00] hover:bg-gray-700' 
                            : 'bg-white text-gray-800 hover:bg-gray-100'
                    } shadow-lg z-50`}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Enhanced Base Grid with hover-sensitive movement */}
                <div 
                    className="absolute inset-0 transition-transform duration-200 ease-out"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, ${isDarkMode ? '#2c2c2c' : '#e5e7eb'} 1px, transparent 1px),
                            linear-gradient(to bottom, ${isDarkMode ? '#2c2c2c' : '#e5e7eb'} 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)`,
                    }}
                />

                {/* Enhanced Accent Grid with hover-sensitive movement */}
                <div 
                    className="absolute inset-0 transition-transform duration-200 ease-out"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 204, 0, ${isDarkMode ? '0.15' : '0.1'}) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 204, 0, ${isDarkMode ? '0.15' : '0.1'}) 1px, transparent 1px)
                        `,
                        backgroundSize: '100px 100px',
                        transform: `translate(${gridOffset.x * -1.5}px, ${gridOffset.y * -1.5}px)`,
                    }}
                />

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute w-64 h-64 rounded-full blur-3xl -top-32 -left-32 animate-pulse ${
                        isDarkMode ? 'bg-[#ffcc00]/10' : 'bg-[#ffcc00]/5'
                    }`} />
                    <div className={`absolute w-64 h-64 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000 ${
                        isDarkMode ? 'bg-[#fecc00]/10' : 'bg-[#fecc00]/5'
                    }`} />
                </div>

                {/* Login Container */}
                <div className="w-full max-w-md p-8 relative z-10">
                    <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-8 border transition-all duration-300 ${
                        isDarkMode 
                            ? 'bg-gray-800/80 border-gray-700 text-white' 
                            : 'bg-white/80 border-gray-200'
                    }`}>
                        <div className="relative mb-8">
                            <h2 className={`text-3xl font-bold text-center ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>Welcome Back</h2>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#ffcc00]"></div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className={`block text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onMouseEnter={() => setHoveredInput('email')}
                                    onMouseLeave={() => setHoveredInput(null)}
                                    className={`w-full px-4 py-3 rounded-lg focus:border-[#ffcc00] focus:ring-2 focus:ring-[#ffcc00]/20 focus:outline-none transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                            : 'bg-white border-gray-200 placeholder-gray-500'
                                    } ${hoveredInput === 'email' ? 'ring-2 ring-[#ffcc00]/20' : ''}`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-medium ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onMouseEnter={() => setHoveredInput('password')}
                                        onMouseLeave={() => setHoveredInput(null)}
                                        className={`w-full px-4 py-3 rounded-lg focus:border-[#ffcc00] focus:ring-2 focus:ring-[#ffcc00]/20 focus:outline-none transition-all duration-300 ${
                                            isDarkMode 
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                                : 'bg-white border-gray-200 placeholder-gray-500'
                                        } ${hoveredInput === 'password' ? 'ring-2 ring-[#ffcc00]/20' : ''}`}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#ffcc00] text-black py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#fecc00] transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Sign In
                            </button>
                        </form>

                        {message && (
                            <div className="mt-6 text-center">
                                <p className={`px-4 py-2 rounded-lg animate-fadeIn ${
                                    isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-500'
                                }`}>
                                    {message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    export default LoginPage;