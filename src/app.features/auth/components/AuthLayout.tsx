import React from 'react';
interface Props {
	title: '로그인' | '회원가입';
	children: React.ReactNode;
}
function AuthLayout({ title, children }: Props) {
	return (
		<main className="py-[2.4rem] space-y-[1.6rem]">
			<h1 className="text-title2">{title}</h1>
			{children}
		</main>
	);
}

export default AuthLayout;
