import client from 'app.modules/api/client';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const signInHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const {
				data: { access_token },
			} = await client.post('/auth/signin', {
				email,
				password,
			});
			client.defaults.headers['Authorization'] = `Bearer ${access_token}`;
			// 로그인이 성공적으로 처리되었다면 /todo 경로로 이동합니다.
			navigate(SERVICE_URL.todo);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<form onSubmit={signInHandler} className="flex flex-col">
				<label htmlFor="email-signin">아이디</label>
				<input
					id="email-signin"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					data-testid="email"
					type="email"
				/>
				<label htmlFor="password-signin">비밀번호</label>
				<input
					id="password-signin"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					data-testid="password"
				/>
				<button disabled={Boolean(!email.trim() || !password.trim())} type="submit" data-testid="signin-button">
					로그인
				</button>
			</form>
		</div>
	);
}

export default SignIn;
