/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import React, { useState, useEffect } from 'react'
import { useChain } from '@/context/ChainContext'
import { useICPWallet } from '@/context/ICPWalletContext'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import ICPLogo from '@/assets/wallet/icp-logo.svg'
import SOLLogo from '@/assets/wallet/solana-logo.svg'
import PlugImg from '@/assets/wallet/plug.svg'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { ArrowLeft, WalletMinimal, Loader2 } from 'lucide-react'

const containerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariantsLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const cardVariantsRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const icpWallets = [
    { name: 'Plug', img: PlugImg }
];

export default function WalletBtn() {
    const [open, setOpen] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [selectedChain, setSelectedChain] = useState<'icp' | 'sol_dev' | null>(null);

    const { isICPConnected, connectICPWallet, disconnectICPWallet } = useICPWallet();
    const { select: SOLSelect, wallets: SOLWallets, disconnect: disconnectSOLWallet, connected: isSOLConnected } = useWallet();

    const { chain, setChain } = useChain();

    useEffect(() => {
        if (isSOLConnected) {
            setChain('sol_dev');
        } else if (isICPConnected) {
            setChain('icp');
        } else {
            setChain(undefined);
        }
    }, [isICPConnected, isSOLConnected, setChain]);

    const handleDisconnect = async () => {
        switch (chain) {
            case 'icp':
                disconnectICPWallet();
            case 'sol_dev':
                await disconnectSOLWallet();
                setChain(undefined);
        }
    };

    const handleChainSelect = (chain: 'icp' | 'sol_dev') => {
        setSelectedChain(chain);
    };

    const handleBack = () => {
        setSelectedChain(null);
    };

    const renderChainContent = () => {
        switch (selectedChain) {
            case 'icp':
                const handleICPWalletSelect = async () => {
                    setIsConnecting(true);
                    setOpen(false);
                    await connectICPWallet();
                    handleBack();
                    setIsConnecting(false);
                };

                return (
                    <div className='flex flex-col justify-between space-y-2 h-[22rem] md:h-72'>
                        <motion.div initial='hidden' whileInView='visible' variants={containerVariants} className='grid md:grid-cols-2 gap-2 items-center overflow-x-hidden'>
                            {icpWallets.map(({ name, img }) => (
                                // @ts-expect-error
                                <motion.div variants={cardVariantsRight} key={name}>
                                    <Button variant='outline' className='flex flex-row w-full md:py-6 justify-center items-center dark:border-white' onClick={handleICPWalletSelect}>
                                        <Image height={30} width={30} src={img} alt={name} className='rounded' />
                                        <div className='text-lg md:text-xl overflow-hidden'>{name}</div>
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                        <p className='text-center'>By connecting a wallet, you agree to BIT10&apos;s <a href='/tos' target='_blank'><span className='underline'>Terms of Service</span></a>, and consent to its <a href='/privacy' target='_blank'><span className='underline'>Privacy Policy</span></a>.</p>
                    </div>
                );
            case 'sol_dev':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const handleSOLWalletSelect = async (walletName: any) => {
                    if (walletName) {
                        try {
                            SOLSelect(walletName);
                            handleBack();
                            if (isSOLConnected) {
                                setChain('sol_dev');
                                setOpen(false);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (error) {
                            toast.error('An error occurred while connecting your wallet. Please try again!');
                        }
                    }
                };

                return (
                    <div className='flex flex-col justify-between space-y-2 h-[22rem] md:h-72'>
                        {!SOLWallets.some((wallet) => wallet.readyState === 'Installed') ? (
                            <motion.div initial='hidden' whileInView='visible' variants={containerVariants}>
                                <div className='flex flex-col space-y-2 items-center justify-center'>
                                    {/* @ts-expect-error */}
                                    <motion.h1 variants={cardVariantsRight} className='text-xl md:text-2xl tracking-wide text-center'>You&apos;ll need a wallet on Solana to continue</motion.h1>
                                    {/* @ts-expect-error */}
                                    <motion.div variants={cardVariantsRight} className='p-4 rounded-full border-2'>
                                        <WalletMinimal strokeWidth={1} className='h-16 w-16 font-light' />
                                    </motion.div>
                                    {/* @ts-expect-error */}
                                    <motion.div variants={cardVariantsRight} className='flex flex-row justify-center py-2'>
                                        <a href='https://phantom.app' target='_blank'>
                                            <Button className='w-full px-20'>Get a Wallet</Button>
                                        </a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div initial='hidden' whileInView='visible' variants={containerVariants} className='grid md:grid-cols-2 gap-2 items-center overflow-x-hidden'>
                                {SOLWallets.map((wallet) => (
                                    // @ts-expect-error
                                    <motion.div variants={cardVariantsRight} key={wallet.adapter.name}>
                                        <Button variant='outline' className='flex flex-row w-full md:py-6 justify-center items-center dark:border-white' onClick={() => handleSOLWalletSelect(wallet.adapter.name)}>
                                            <Image height={30} width={30} src={wallet.adapter.icon} alt={wallet.adapter.name} className='rounded' />
                                            <div className='text-lg md:text-xl overflow-hidden'>{wallet.adapter.name}</div>
                                        </Button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        <p className='text-center'>By connecting a wallet, you agree to BIT10&apos;s <a href='/tos' target='_blank'><span className='underline'>Terms of Service</span></a>, and consent to its <a href='/privacy' target='_blank'><span className='underline'>Privacy Policy</span></a>.</p>
                    </div>
                );
            default:
                return (
                    <motion.div initial='hidden' whileInView='visible' variants={containerVariants} className='flex flex-col space-y-2'>
                        {/* @ts-expect-error */}
                        <motion.div variants={cardVariantsLeft}
                            className='rounded-md border hover:border-primary hover:text-primary p-4 flex flex-row items-center space-x-2 cursor-pointer'
                            onClick={() => handleChainSelect('icp')}
                        >
                            <Image src={ICPLogo} alt='ICP' className='rounded' height='26' width='26' />
                            <div className='text-lg'>Internet Computer</div>
                        </motion.div>

                        {/* @ts-expect-error */}
                        <motion.div variants={cardVariantsLeft}
                            className='rounded-md border hover:border-primary hover:text-primary p-4 flex flex-row items-center space-x-2 cursor-pointer'
                            onClick={() => handleChainSelect('sol_dev')}
                        >
                            <Image src={SOLLogo} alt='Solana' className='rounded' height='26' width='26' />
                            <div className='text-lg'>Solana Devnet</div>
                        </motion.div>
                    </motion.div>
                );
        }
    };

    return (
        <div>
            {isICPConnected || isSOLConnected ? (
                <Button variant='destructive' onClick={handleDisconnect} className='w-full'>Disconnect wallet</Button>
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={isConnecting} className='w-full cursor-pointer'>
                            {isConnecting && <Loader2 className='animate-spin mr-2' size={15} />}
                            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-[90vw] md:max-w-[600px]'>
                        <DialogHeader>
                            <DialogTitle className='tracking-wide pt-2 md:pt-0'>
                                {selectedChain ? (
                                    <div className='flex flex-col items-start space-y-2'>
                                        <div>Connect your wallet to get started</div>
                                        <Button variant='ghost' size='sm' onClick={handleBack}>
                                            <ArrowLeft /> Select different chain
                                        </Button>
                                    </div>
                                ) : (
                                    'Select a Network or Use Email (Recommended for Beginners)'
                                )}
                            </DialogTitle>
                        </DialogHeader>
                        {renderChainContent()}
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
