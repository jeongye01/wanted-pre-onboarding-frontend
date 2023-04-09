import AuthLayout from 'app.features/auth/components/AuthLayout';
import client from 'app.modules/api/client';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React, { useEffect, useState } from 'react';
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
			localStorage.setItem('ACCESS_TOKEN', access_token);
			// 로그인이 성공적으로 처리되었다면 /todo 경로로 이동합니다.
			navigate(SERVICE_URL.todo);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (localStorage.getItem('ACCESS_TOKEN')) {
			navigate(SERVICE_URL.todo);
		}
	}, []);
	return (
		<AuthLayout title="로그인">
			<form onSubmit={signInHandler} className="flex flex-col space-y-[0.8rem] text-body2">
				<label htmlFor="email-signin">아이디</label>
				<input
					id="email-signin"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					data-testid="email-input"
					type="email"
					className="input-common"
				/>
				<label htmlFor="password-signin">비밀번호</label>
				<input
					id="password-signin"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					data-testid="password-input"
					className="input-common"
				/>
				<button
					disabled={Boolean(!email.trim() || !password.trim())}
					type="submit"
					data-testid="signin-button"
					className="button-auth"
				>
					로그인
				</button>
			</form>
		</AuthLayout>
	);
}

export default SignIn;
