import React from 'react';
interface Props {
	children: React.ReactNode;
}
function Layout({ children }: Props) {
	return <div className="h-screen max-w-[50rem] mx-auto px-[2rem] bg-w">{children}</div>;
}

export default Layout;
