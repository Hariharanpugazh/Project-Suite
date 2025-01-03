import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin"); // Default to "admin"
    const [college, setCollege] = useState("");
    const [department, setDepartment] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/projects/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role, college, department }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage(data.error || "Registration failed.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="admin">Admin</option>
                            <option value="superadmin">SuperAdmin</option>
                        </select>
                    </div>
                    {role === "admin" && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">College Name</label>
                                <select
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select College</option>
                                    <option value="SNS ACADEMY - A FINGERPRINT INTERNATIONAL CBSE SCHOOL">SNS ACADEMY - A FINGERPRINT INTERNATIONAL CBSE SCHOOL</option>
                                    <option value="DR. SNS RAJALAKSHMI COLLEGE OF ARTS AND SCIENCE">DR. SNS RAJALAKSHMI COLLEGE OF ARTS AND SCIENCE</option>
                                    <option value="SNS COLLEGE OF TECHNOLOGY">SNS COLLEGE OF TECHNOLOGY</option>
                                    <option value="SNS COLLEGE OF ENGINEERING">SNS COLLEGE OF ENGINEERING</option>
                                    <option value="SNS COLLEGE OF PHARMACY AND HEALTH SCIENCES">SNS COLLEGE OF PHARMACY AND HEALTH SCIENCES</option>
                                    <option value="SNS COLLEGE OF ALLIED HEALTH SCIENCES">SNS COLLEGE OF ALLIED HEALTH SCIENCES</option>
                                    <option value="DR. SNS COLLEGE OF EDUCATION">DR. SNS COLLEGE OF EDUCATION</option>
                                    <option value="SNS COLLEGE OF PHYSIOTHERAPY">SNS COLLEGE OF PHYSIOTHERAPY</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Department</label>
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    >
                        Register
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default RegisterPage;
