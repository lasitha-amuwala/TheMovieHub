import { useEffect, useRef } from 'react';

// custome hook created by Dan Abramov
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useInterval = (callback, delay) => {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};
