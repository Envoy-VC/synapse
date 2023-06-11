import React from 'react';

import {
	Input,
	Button,
	Checkbox,
	Dropdown,
	Image,
	Card,
} from '@nextui-org/react';
import { CaretLeft, Plus, AddUser, Delete } from 'react-iconly';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { FormProps } from '..';

type CreateFormStepProps = 'basic' | 'settings';
type TokenType = 'ERC20' | 'ERC721' | 'ERC1155';
type ChainType = 'ETHEREUM' | 'POLYGON';

interface Props {
	step: CreateFormStepProps;
	setStep: React.Dispatch<React.SetStateAction<CreateFormStepProps>>;
	form: FormProps;
}

const AdminDetails = ({ step, setStep, form }: Props) => {
	const [isTokenGated, setIsTokenGated] = React.useState(false);
	const [selectedToken, setSelectedToken] = React.useState<TokenType>('ERC20');
	const [selectedChain, setSelectedChain] =
		React.useState<ChainType>('ETHEREUM');

	const [admins, setAdmins] = React.useState<string>('');
	const [adminList, setAdminList] = React.useState<string[]>([]);

	const handleAddAdmin = (address: string) => {
		if (adminList.includes(address)) {
			alert('Admin already added');
		} else {
			setAdminList([...adminList, address]);
		}
	};

	const handleRemoveAdmin = (address: string) => {
		const index = adminList.indexOf(address);
		const list = adminList;
		list.splice(index, 1);
		setAdminList([...list]);
	};

	return (
		<div
			className={`${inter.className} max-w-screen-md w-full flex flex-col justify-center gap-6`}
		>
			<div className=' text-4xl font-bold mb-16 text-center'>
				Admin Settings
			</div>
			<Input
				label='Admins'
				placeholder='0xBF4...3e1'
				required
				onChange={(e) => setAdmins(e.target.value)}
				contentRight={
					<Button
						color='primary'
						auto
						className='bg-[#0072F5] !w-fit rounded-l-[0px]'
						size='lg'
						icon={<AddUser set='bold' primaryColor='#fff' size={24} />}
						onPress={() => handleAddAdmin(admins)}
					>
						Add
					</Button>
				}
				contentRightStyling={false}
				size='xl'
				className='mt-4 max-w-[500px]'
			/>

			<div className='flex flex-col'>
				{adminList.map((admin, index) => (
					<Card
						key={index}
						css={{
							mw: '400px',
							margin: '2px',
							border: 'none',
							borderRadius: '8px',
						}}
					>
						<Card.Body className='flex flex-row justify-between items-center py-0 pl-4 pr-0'>
							<p>{admin}</p>
							<Button
								auto
								color='error'
								icon={<Delete set='bold' primaryColor='#F31260' size={22} />}
								light
								className='!w-fit py-2 px-2 rounded-l-[0px] ml-4'
								onPress={() => handleRemoveAdmin(admin)}
							/>
						</Card.Body>
					</Card>
				))}
			</div>

			<Checkbox
				isSelected={isTokenGated}
				color='primary'
				onChange={(isSelected: boolean) => {
					setIsTokenGated(isSelected);
					form.tokenGated = isSelected;
				}}
			>
				Token Gated
			</Checkbox>
			{isTokenGated && (
				<div className='flex flex-col xl:flex-row gap-6'>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-row justify-start gap-8'>
							<Dropdown>
								<Dropdown.Button
									color='primary'
									className='bg-[#0072F5] !w-fit'
								>
									{selectedChain}
								</Dropdown.Button>
								<Dropdown.Menu
									aria-label='Single selection actions'
									color='primary'
									disallowEmptySelection
									selectionMode='single'
									selectedKeys={selectedChain}
									onSelectionChange={(value: any) => {
										setSelectedChain(value.currentKey);
										form.chainType = value.currentKey;
									}}
								>
									<Dropdown.Item key='ETHEREUM'>ETHEREUM</Dropdown.Item>
									<Dropdown.Item key='POLYGON'>POLYGON</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown>
								<Dropdown.Button
									color='primary'
									className='bg-[#0072F5] !w-fit'
								>
									{'ERC-' + selectedToken.split('ERC')[1]}
								</Dropdown.Button>
								<Dropdown.Menu
									aria-label='Single selection actions'
									color='primary'
									disallowEmptySelection
									selectionMode='single'
									selectedKeys={selectedToken}
									onSelectionChange={(value: any) => {
										setSelectedToken(value.currentKey);
										form.tokenType = value.currentKey;
									}}
								>
									<Dropdown.Item key='ERC20'>ERC-20</Dropdown.Item>
									<Dropdown.Item key='ERC721'>ERC-721</Dropdown.Item>
									<Dropdown.Item key='ERC1155'>ERC-1155</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<Input
							label='Contract Address'
							placeholder='0xAe4..a32'
							required
							size='xl'
							clearable
							className='mt-4 max-w-[450px]'
							onChange={(e) => (form.tokenAddress = e.target.value)}
						/>
						{selectedToken === 'ERC1155' && (
							<Input
								label='Token Id'
								placeholder='4587'
								required
								size='xl'
								clearable
								className='mt-4 max-w-[450px]'
								onChange={(e) => (form.tokenId = e.target.value)}
							/>
						)}
					</div>
					<Image
						width={320}
						height={180}
						src='https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true'
						alt='Default Image'
						objectFit='cover'
					/>
				</div>
			)}
			<div className='flex justify-between'>
				<Button
					auto
					light
					icon={<CaretLeft set='bold' primaryColor='#fff' size={32} />}
					color='warning'
					size='lg'
					className='bg-[#F5A524] text-white mt-4 !w-fit'
					onPress={() => setStep('basic')}
				>
					Back
				</Button>
				<Button
					auto
					light
					icon={<Plus set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					className='bg-[#0072F5] text-white mt-4 !w-fit'
					onPress={() => console.log(form)}
				>
					Create
				</Button>
			</div>
		</div>
	);
};

export default AdminDetails;