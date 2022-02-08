import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Details = (data) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>error</div>;
	}
	const poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
	
	const formatRuntime = (mins) => {
		let min = mins % 60;
		let h = (mins - min) / 60;
		return `${h}h ${min}m`;
	};

	return (
		<div>
			<div>
				<div
					className='bg-cover'
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
					}}>
					<div className='h-full bg-black bg-opacity-80 2xl:px-20%'>
						<div className='flex flex-col md:flex-row p-10 gap-16'>
							<div className='relative self-center h-96 w-26%h flex-none border-2 border-cyan-200 rounded-xl'>
								<Image
									width={11}
									height={17}
									layout='responsive'
									className='rounded-xl '
									src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
									alt={`${data.title}-poster`}
									placeholder='blur'
									blurDataURL={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
								/>
							</div>
							<div className='flex flex-col text-4xl text-white gap-4'>
								<div className='flex gap-4 flex-wrap'>
									<div className='font-bold'>{data.title}</div>
									<div className='font-light'>
										{`(${data.release_date.split('-')[0]})`}
									</div>
								</div>
								<div className='flex gap-4'>
									{data.rating && (
										<div className='text-sm border p-1 px-2 border-gray-400 text-gray-400 inline'>
											{data.rating}
										</div>
									)}
									<div className='text-base'>{formatRuntime(data.runtime)}</div>
								</div>
								<div className='font-normal text-base md:text-lg'>
									{data.overview}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='h-screen'></div>
		</div>
	);
};

export default Details;

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
