import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
	// custome hook created by Dan Abramov
	// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

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

export const usePrevious = (value) => {
	const ref = useRef(null);
	useEffect(() => (ref.current = value), [value]);
	return ref.current;
};
