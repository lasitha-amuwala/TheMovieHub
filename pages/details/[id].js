import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
	return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	const baseURL = 'https://api.themoviedb.org/3';
	const API_KEY = process.env.TMDB_API_KEY;
	const req = `${baseURL}/movie/${id}?api_key=${API_KEY}&append_to_response=release_dates`;

	try {
		const res = await fetch(req);
		let data = await res.json();

		let release_dates = data.release_dates.results.find(
			(elem) => elem.iso_3166_1 == 'US'
		);

		// filter thorugh the list of ratings and return the latest
		let rating = release_dates.release_dates.reduce((a, b) => {
			return new Date(a.release_date) > new Date(b.release_date) ? a : b;
		});

		delete data.release_dates;
		delete data.production_companies;
		delete data.production_countries;
		delete data.spoken_languages;
		delete data.adult;

		data.rating = rating.certification;

		return { props: data };
	} catch (e) {
		console.error(e);
		return { notFound: true };
	}
};

const Details = (data) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>error</div>;
	}

	return (
		<div>
			<div
				className='bg-cover'
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
				}}>
				<div className='flex flex-wrap flex-col md:flex-row bg-black bg-opacity-90 min-h-40vh  2xl:px-20%'>
					<div className='self-center flex-none pt-10 md:p-5 w-2/3 md:w-1/4 grow-0'>
						<Image
							width={500}
							height={700}
							className='rounded-xl min-w-1/3'
							src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
							alt={`${data.title}-poster`}
						/>
					</div>
					<div className='p-10 flex flex-col flex-1 gap-5 text-4xl text-white grow'>
						<div className='flex flex-row flex-wrap'>
							<div className='font-bold pr-4'>{data.title}</div>
							<div className='font-light '>
								{`(${data.release_date.split('-')[0]})`}
							</div>
						</div>
						<div className='flex gap-3 items-center'>
							<div className='text-sm border p-1 px-2 border-gray-400 text-gray-400 inline'>
								{data.rating}
							</div>
							<div className='text-base'>{formatRuntime(data.runtime)}</div>
						</div>
						<div className='font-normal text-lg'>{data.overview}</div>
					</div>
				</div>
			</div>
			<div className='h-screen'></div>
		</div>
	);
};

export default Details;

const formatRuntime = (mins) => {
	let min = mins % 60;
	let h = (mins - min) / 60;
	return `${h}h ${min}m`;
};
