import axios from 'axios';
import React, { useState } from 'react';

function SignUp() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const signUpHandler = async (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<div>
			<form onSubmit={signUpHandler} className="flex flex-col">
				<label htmlFor="id">아이디 *</label>
				<input
					id="id"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					data-testid="email-input"
					type="email"
				/>
				<label htmlFor="password">비밀번호 *</label>
				<input
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					data-testid="password-input"
					minLength={8}
				/>
				<button
					disabled={Boolean(!email.includes('@') || password.length < 8)}
					type="submit"
					data-testid="signup-button"
				>
					회원가입
				</button>
			</form>
		</div>
	);
}

export default SignUp;
