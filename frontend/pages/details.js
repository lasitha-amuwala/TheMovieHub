import React, { useEffect, useState } from 'react';

const Details = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	useEffect(() => getMovie(id).then((res) => setData(res)), [id]);

	if (!Object.keys(data).length) return <div></div>;

	const {
		backdrop_path,
		poster_path,
		title,
		release_date,
		overview,
		rating,
		runtime,
	} = data;

	return (
		<div>
			<div
				className='w-screen bg-cover'
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
				}}>
				<div className='flex bg-black bg-opacity-90 h-40vh 2xl:px-20%'>
					<div className='flex-none px-10 py-10'>
						<img
							className='h-full rounded-xl'
							src={`https://image.tmdb.org/t/p/w500/${poster_path}`}></img>
					</div>
					<div className='p-10 flex flex-col flex-1 gap-5 text-4xl text-white'>
						<div className='font-bold'>
							{title}
							<span className='font-light pl-4'>{`(${
								release_date.split('-')[0]
							})`}</span>
						</div>
						<div className='flex gap-3 items-center'>
							<div className='text-sm border p-1 px-2 border-gray-400 text-gray-400 inline'>
								{rating}
							</div>
							<div className='text-base'>{formatRuntime(runtime)}</div>
						</div>
						<div className='font-normal text-lg'>{overview}</div>
					</div>
				</div>
			</div>
			<div className='h-screen'></div>
		</div>
	);
};

const formatRuntime = (mins) => {
	let min = mins % 60;
	let h = (mins - min) / 60;
	return `${h}h ${min}m`;
};

export default Details;
