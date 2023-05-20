import React, { useEffect, useState } from 'react';

function Home() {
	const [count, setCount] = useState(0);
	const test = () => {
		const arr = [];

		while (true) {
			const res = prompt('숫자를 입력');
			console.log(res);
			// eslint-disable-next-line no-restricted-globals
			if (!Number(res) || res === null) break;

			arr.push(+res);
		}

		let answer = 0;
		// eslint-disable-next-line no-restricted-syntax, prefer-const
		for (let x of arr) {
			answer += x;
		}
		console.log(answer);
	};
	useEffect(() => {
		const arr = ['HTML', 'JavaScript', 'CSS'];
		const copy = arr.slice();
		copy.sort((a, b) => a.localeCompare(b));
		console.log(copy);
		const s = '-webkit-transition';
		const sArr = s.split('-');
		let ns = sArr[0];
		// eslint-disable-next-line no-restricted-syntax, prefer-const
		for (let x of sArr.slice(1)) {
			ns += x[0].toUpperCase() + x.slice(1);
		}
		console.log(ns);
	}, []);

	/*
	useEffect(() => {
		const timeoutId = setInterval(() => {
			setCount((prevCount) => prevCount + 1);
		}, 1000);
		if (count === 15) {
			clearInterval(timeoutId);
		}
		return () => clearInterval(timeoutId);
	}, [count]);
*/
	return (
		<div>
			<button onClick={test}>클릭</button>
			<h1>Count: {count}</h1>
		</div>
	);
}

export default Home;
