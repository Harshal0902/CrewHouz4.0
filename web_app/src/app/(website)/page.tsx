/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import Image from 'next/image'
import DefinityDevImg from '@/assets/home/DFINITYDev.svg'
import EasyaAppImg from '@/assets/home/easya_app.svg'
import ICPImg from '@/assets/home/ICP.svg'
import BSLImg from '@/assets/home/bsl.svg'
import EasyAImg from '@/assets/home/EasyA.svg'

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
};

const testimonials = [
  {
    x_link: 'https://x.com/DFINITYDev/status/1808724918177312925',
    tweet: '@bit10startup is bringing the #Bitcoin ecosystem together for a pool party this #ChainFusionSummer⛱️ BIT10 is a #DeFi asset manager built using #ICP that offers an index tracking major #tokens, #ordinals, and #BRC20s on:🟧 ICP @dfinity, 🟧 @Stacks, 🟧 @MapProtocol, 🟧 @SovrynBTC, 🟧 @BadgerDAO, 🟧 @ALEXLabBTC, and more!',
    profile_pic: DefinityDevImg,
    name: 'DFINITY Developers',
    username: 'DFINITYDev'
  },
  {
    x_link: 'https://x.com/easya_app/status/1803087458663383383',
    tweet: 'Congrats to the gigabrains at BIT 10 Smart Assets! 👏 First started building at our EasyA x @Stacks hackathon in London, accepted into @btcstartuplab and now gearing up to launch their testnet! 🚀',
    profile_pic: EasyaAppImg,
    name: 'EasyA',
    username: 'easya_app'
  }
];

const parterners = [
  {
    name: 'ICP',
    logo: ICPImg,
  },
  {
    name: 'BSL',
    logo: BSLImg,
  },
  {
    name: 'EasyA',
    logo: EasyAImg,
  }
]

export default function Page() {
  return (
    <div>
      <AuroraBackground>
        <div className='relative flex flex-col gap-4 items-center justify-center md:px-4'>
          <div className='p-4 max-w-7xl mx-auto relative z-10 w-full pt-8 md:pt-0'>
            <motion.h1
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
              className='text-4xl md:text-6xl font-bold text-center bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50 pb-2'>
              BIT10 <br /> <span className='italic'>Crypto Index Funds</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
              className='flex flex-row space-x-2 py-2 items-center justify-center'>
              <Button className='px-6 md:px-10' asChild>
                <Link href='/swap'>
                  Launch App
                </Link>
              </Button>
              <a href='https://gitbook.bit10.app' target='_blank' rel='noreferrer noopener'>
                <Button variant='outline' className='tracking-wider dark:border-white dark:text-white'>
                  Read GitBook <ExternalLink className='h-4 w-4' />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </AuroraBackground>

      <MaxWidthWrapper className='flex flex-col space-y-8 py-8'>
        <div className='flex flex-col items-center space-y-2'>
          <motion.h1
            initial={{ opacity: 0.0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
            className='text-3xl md:text-3xl text-center font-semibold z-[1]'>
            Discover how<br />
            <span className='text-4xl md:text-[5rem] font-bold mt-1 leading-none'>
              BIT10 works
            </span>
          </motion.h1>

          <motion.iframe
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
            src='https://www.youtube.com/embed/XBAx1-Py9Oo'
            // height={1720}
            // width={1400}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='mx-auto rounded-2xl object-cover w-full md:w-3/4 h-56 md:h-[36rem] z-[2]'
          ></motion.iframe>
        </div>

        <div className='flex flex-col antialiased items-center justify-center relative overflow-hidden'>
          <div className='my-8 text-center'>
            <motion.h1
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
              className='text-4xl font-bold leading-10 sm:text-5xl sm:leading-none md:text-6xl'>Our Partners</motion.h1>
          </div>

          <InfiniteMovingCards
            items={testimonials}
            direction='right'
            speed='slow'
          />

          <motion.div initial='hidden' whileInView='visible' variants={containerVariants} className='flex flex-col md:flex-row items-center justify-evenly w-full space-y-3 md:space-y-0'>
            {parterners.map((partner, index) => (
              // @ts-expect-error
              <motion.div variants={cardVariants} key={index} className={`p-2 border-2 border-accent rounded-lg ${partner.name === 'BSL' ? 'bg-black' : 'bg-white dark:bg-gray-100'}`}>
                <Image src={partner.logo} height={50} width={400} quality={100} alt={partner.name} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
