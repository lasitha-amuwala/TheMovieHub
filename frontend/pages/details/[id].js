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
		const data = await res.json();
		return { props: data };
	} catch (e) {
		console.error(error);
		return { notFound: true };
	}
	/*
	let release_dates = data.release_dates.results.find(
		(elem) => elem.iso_3166_1 == 'US'
	);

	// filter thorugh the list of ratings and return the latest
	let rating = release_dates.release_dates.reduce((a, b) => {
		return new Date(a.release_date) > new Date(b.release_date) ? a : b;
	});

	// remove unnessesary data
	delete data.release_dates;
	delete data.production_companies;
	delete data.production_countries;
	delete data.spoken_languages;
	delete data.adult;

	data.rating = rating.certification;
*/
};

const Details = (data) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>error</div>;
	}

	return (
		<div>
			<div
				className='w-screen bg-cover'
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
				}}>
				<div className='flex bg-black bg-opacity-90 h-40vh 2xl:px-20%'>
					<div className='relative flex-none px-10 py-10'>
					<Image
							layout='fill'
							objectFit='cover'
							objectPosition=''
							className='h-full rounded-xl'
							src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
							alt={`${data.title}-poster`}
						/>
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
