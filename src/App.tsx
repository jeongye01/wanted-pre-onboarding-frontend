import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from 'app.components/Layout';
import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
// import Login from './pages/login';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import TodoPage from './pages/Todo';
import HomePage from './pages/Home';

function App() {
	return (
		<div className="App">
			<Layout>
				<Router>
					<Suspense fallback={<div>Loading..</div>}>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path={SERVICE_URL.signIn} element={<SignInPage />} />
							<Route path={SERVICE_URL.signUp} element={<SignUpPage />} />
							<Route path={SERVICE_URL.todo} element={<TodoPage />} />
							<Route path="*" element={<div>404 Not Found</div>} />
						</Routes>
					</Suspense>
				</Router>
			</Layout>
		</div>
	);
}

export default App;
