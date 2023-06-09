import { Sidebar } from '@/components';

import { Dashboard } from '@/sections';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className={`${inter.className}`}>
			<div className='flex flex-row justify-between'>
				<Sidebar />
				<Dashboard />
			</div>
		</main>
	);
}
