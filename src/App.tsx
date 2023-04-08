import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SERVICE_URL } from './app.modules/constants/ServiceUrl';
// import Login from './pages/login';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import TodoPage from './pages/Todo';

function App() {
	return (
		<div className="App">
			<Router>
				<Suspense fallback={<div>Loading..</div>}>
					<Routes>
						<Route path={SERVICE_URL.signIn} element={<SignInPage />} />
						<Route path={SERVICE_URL.signUp} element={<SignUpPage />} />
						<Route path={SERVICE_URL.todo} element={<TodoPage />} />
						<Route path="*" element={<div />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
