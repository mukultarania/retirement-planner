import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const { login } = useAuth();
	const nav = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submit = () => {
		login(email, password);
		nav("/dashboard");
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow w-96">
				<h1 className="text-2xl font-bold text-center mb-1">Hackton</h1>
				<h2 className="text-xl font-bold mb-4 text-gray-700">Login</h2>

				<input
					className="border p-2 w-full mb-3"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					className="border p-2 w-full mb-3"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button
					onClick={submit}
					className="bg-black text-white w-full p-2 rounded"
				>
					Login
				</button>
			</div>
		</div>
	);
}
