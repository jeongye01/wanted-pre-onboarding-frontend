import client from 'app.modules/api/client';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const signUpHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await client.post('/auth/signup', {
				email,
				password,
			});
			console.log(response);
			// 회원가입이 성공적으로 처리되었다면 /signin 경로로 이동합니다.
			navigate(SERVICE_URL.signIn);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<form onSubmit={signUpHandler} className="flex flex-col">
				<label htmlFor="email-signup">이메일 *</label>
				<input
					id="email-signup"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					data-testid="email-input"
					type="email"
				/>
				<label htmlFor="password-signup">비밀번호 *</label>
				<input
					id="password-signup"
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
