import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import {
	useRoom,
	usePeers,
	useAudio,
	useMeetingMachine,
} from '@huddle01/react/hooks';
import { Audio } from '@huddle01/react/components';
import { useAddress } from '@thirdweb-dev/react';
import { updatePeerId } from '@/services/graphql';

import { MeetingHeader, MeetingControls } from '@/components';
import { UserMeetingCard } from '@/components/cards';

import { Inter } from 'next/font/google';
import { HUDDLE_PROJECT_ID } from '@/utils';
import { Button } from '@nextui-org/react';
const inter = Inter({ subsets: ['latin'] });

const Meeting = () => {
	const router = useRouter();
	const address = useAddress();
	const { state } = useMeetingMachine();
	const { peers } = usePeers();
	const { stream } = useAudio();
	const { joinRoom, isLoading, isRoomJoined } = useRoom();
	const [loading, setLoading] = React.useState<boolean>(false);

	const meetingId = router?.query.slug as string;

	React.useEffect(() => {
		async function joinMeetingRoom() {
			try {
				setLoading(true);
				await joinRoom();
				const res = await updatePeerId({
					address: address!,
					peerId: state?.context.peerId,
				});
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		if (meetingId && address) {
			joinMeetingRoom();
		}
	}, [meetingId]);

	return (
		<main className={`${inter.className} mb-12 xl:mb-0`}>
			<MeetingHeader />
			{isRoomJoined && !isLoading && !loading && (
				<div>
					<div className='max-w-[90vw] w-full mx-auto flex flex-row h-[75dvh]'>
						<div className='basis-[100%] xl:basis-2/3 overflow-scroll no-scrollbar my-auto'>
							<div className='flex flex-row flex-wrap justify-evenly gap-8 border-2'>
								<UserMeetingCard
									peerId={state?.context.peerId}
									role={state?.context.role}
								/>
								{Object.values(peers)
									.filter((peer) => peer.peerId)
									.map((peer, index) => (
										<div key={index}>
											<Audio peerId={peer.peerId} />
											<UserMeetingCard {...peer} />
										</div>
									))}
							</div>
						</div>

						<div className='hidden xl:flex xl:basis-1/3 border-2'>Chat</div>
					</div>
					<div className='max-w-screen-sm w-full mx-auto mt-8 p-4'>
						<MeetingControls />
					</div>
				</div>
			)}
			<Toaster position='bottom-left' />
		</main>
	);
};

export default Meeting;
