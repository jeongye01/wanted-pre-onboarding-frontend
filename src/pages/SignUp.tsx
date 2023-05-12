import AuthLayout from 'app.features/auth/components/AuthLayout';
import client from 'app.modules/api/client';
import { AccessToken } from 'app.modules/constants/AccessToken';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React, { useEffect, useState } from 'react';
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
			alert('오류 발생');
		}
	};
	useEffect(() => {
		if (localStorage.getItem(AccessToken)) {
			navigate(SERVICE_URL.todo);
		}
	}, []);
	return (
		<AuthLayout title="회원가입">
			<form onSubmit={signUpHandler} className="flex flex-col space-y-[0.8rem] text-body2">
				<label htmlFor="email-signup">이메일 *</label>
				<input
					id="email-signup"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					data-testid="email-input"
					type="email"
					className="input-common"
				/>
				<label htmlFor="password-signup">비밀번호 *</label>
				<input
					id="password-signup"
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					data-testid="password-input"
					minLength={8}
					className="input-common"
				/>
				<button
					disabled={Boolean(!email.includes('@') || password.length < 8)}
					type="submit"
					data-testid="signup-button"
					className="button-auth"
				>
					회원가입
				</button>
			</form>
		</AuthLayout>
	);
}

export default SignUp;
