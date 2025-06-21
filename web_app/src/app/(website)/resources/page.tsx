"use client"

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { type StaticImageData } from 'next/image'
import ResourceImg from '@/assets/resources/resources.svg'
import Preloader from '@/components/Preloader'

type Project = {
    image_url: StaticImageData;
    title: string;
    description: string;
    link: string;
};

const projects: Project[] = [
    {
        image_url: ResourceImg,
        title: 'Getting Started with BIT10: A Beginner\'s Guide',
        description: 'A step-by-step guide for new users on how to start investing with BIT10.',
        link: 'https://x.com/bit10startup/status/1801646449605607622',
    },
    {
        image_url: ResourceImg,
        title: 'Understanding BIT10: The S&P 500 of crypto',
        description: 'Learn about the concept and benefits of BIT10 as an index tracking the top crypto assets.',
        link: 'https://x.com/bit10startup/status/1840830560949973177',
    },
    {
        image_url: ResourceImg,
        title: 'Top 5 Benefits of Investing in BIT10',
        description: 'Highlight the key advantages of investing in BIT10 for both novice and experienced investors.',
        link: 'https://x.com/bit10startup/status/1839317835744780506',
    },
    {
        image_url: ResourceImg,
        title: 'The Rise of DeFi: How BIT10 is Revolutionizing Crypto Investments',
        description: 'Explore how BIT10 is transforming the decentralized finance landscape by offering a diversified investment option.',
        link: 'https://x.com/bit10startup/status/1848379327290966519',
    },
    {
        image_url: ResourceImg,
        title: 'Why Diversification Matters: A Deep Dive into BIT10\'s Strategy',
        description: 'Understand the importance of diversification and how BIT10 helps mitigate risks in the volatile crypto market.',
        link: 'https://x.com/bit10startup/status/1845841836994163178',
    },
    {
        image_url: ResourceImg,
        title: 'The Technology Behind BIT10: An Overview of ICP and Canisters',
        description: 'Dive into the technical infrastructure that powers BIT10, including Internet Computer Protocol and canister smart contracts.',
        link: 'https://x.com/bit10startup/status/1808399164193042641',
    },
];

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: filteredProjects = [], isLoading } = useQuery({
        queryKey: ['projects', searchQuery],
        queryFn: () => {
            return projects.filter(project =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        },
        enabled: true,
    });

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <MaxWidthWrapper>
            <div className='flex items-center justify-center space-x-2 py-4 max-w-[100vw]'>
                <h1 className='text-2xl font-semibold leading-tight text-center tracking-wider lg:text-4xl md:whitespace-nowrap'>BIT10 Knowledge Hub</h1>
            </div>

            <div className='flex items-center md:items-start justify-center py-4 px-2'>
                <div className='flex w-full items-center'>
                    <div className='w-10 z-20 pl-1 text-center pointer-events-none flex items-center justify-center'>
                        <Search height={20} width={20} />
                    </div>
                    <Input
                        className='w-full md:max-w-md -mx-10 pl-10 pr-8 py-2 z-10 dark:border-white'
                        placeholder='Search by title or description...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div onClick={clearSearch} className='ml-2 z-20 cursor-pointer'>
                        <X />
                    </div>
                </div>
            </div>

            <div>
                {isLoading ? (
                    <Preloader />
                ) : (
                    <HoverEffect items={filteredProjects} />
                )}
            </div>
        </MaxWidthWrapper>
    );
}
