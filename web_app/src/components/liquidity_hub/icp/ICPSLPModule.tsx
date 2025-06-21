/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react'
import * as z from 'zod'
import { useICPWallet } from '@/context/ICPWalletContext'
import { Principal } from '@dfinity/principal'
import { idlFactory } from '@/lib/bit10.did'
import { idlFactory as idlFactory2 } from '@/lib/liquidity_hub.did'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronsUpDown, Check, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image, { type StaticImageData } from 'next/image'
import BIT10Img from '@/assets/swap/bit10.svg'

type ICRC2ActorType = {
    icrc2_approve: (args: {
        spender: { owner: Principal; subaccount: [] };
        fee: [];
        memo: [];
        from_subaccount: [];
        created_at_time: [];
        amount: bigint;
        expected_allowance: [];
        expires_at: [bigint];
    }) => Promise<{ Ok?: number; Err?: { InsufficientFunds?: null } }>;
};

const tickIn = [
    { label: 'BIT10.BTC', value: 'BIT10.BTC', img: BIT10Img as StaticImageData }
]

const FormSchema = z.object({
    // liquidity_chain: z.string({
    //     required_error: 'Please select a chain',
    // }),
    liquidity_token: z.string({
        required_error: 'Please select a token',
    }),
    liquidity_amount: z.preprocess((value) => parseFloat(value as string), z.number({
        required_error: 'Please enter the number of tokens.',
    })
        .positive('The amount must be a positive number')
        .refine(value => Number(value.toFixed(8)) === value, 'Amount cannot have more than 8 decimal places')),
    staking_duration: z.number({
        required_error: 'Please select the number of days to stake'
    }).min(1, { message: 'Staking duration must be at least 1 day' })
        .positive({ message: 'Staking duration must be a positive number' })
})

export default function ICPSLPModule() {
    const [processing, setProcessing] = useState<boolean>(false);

    const { ICPAddress } = useICPWallet();

    // const fetchSLPHistory = async () => {
    //     try {
    //         if (!ICPAddress) {
    //             toast.error('Please connect your wallet first');
    //             return [];
    //         }

    //         const response = await userStakedLiquidityHistory({ userAddress: ICPAddress });
    //         if (response === 'Error fetching user staked liquidity history') {
    //             toast.error('An error occurred while fetching user recent activity. Please try again!');
    //         } else {
    //             return response as SLPTableDataType[];
    //         }
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     } catch (error) {
    //         toast.error('Failed to fetch staking history. Please try again later.');
    //         return [];
    //     }
    // }

    // const bit10Queries = useQueries({
    //     queries: [
    //         {
    //             queryKey: ['bit10DEFITokenList'],
    //             queryFn: () => fetchSLPHistory()
    //         }
    //     ]
    // })

    // const isLoading = bit10Queries.some(query => query.isLoading);
    // const bit10SLPHistory = bit10Queries[0].data as [];

    const form = useForm<z.infer<typeof FormSchema>>({
        // @ts-ignore
        resolver: zodResolver(FormSchema),
        defaultValues: {
            liquidity_token: 'BIT10.BTC',
            liquidity_amount: 0.03,
            staking_duration: 1
        },
    });

    const liquidityTokenImg = (): StaticImageData => {
        const liquidityName = form.watch('liquidity_token');
        if (liquidityName === 'BIT10.BTC') {
            return BIT10Img as StaticImageData;
        } else {
            return BIT10Img as StaticImageData;
        }
    };

    const liquidityImg = liquidityTokenImg();

    const stakeDisabledConditions = processing;

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            setProcessing(true);
            const bit10BTCCanisterId = 'eegan-kqaaa-aaaap-qhmgq-cai'
            const teLiquidityHubCanisterId = 'jskxc-iiaaa-aaaap-qpwrq-cai'

            const hasAllowed = await window.ic.plug.requestConnect({
                whitelist: [bit10BTCCanisterId, teLiquidityHubCanisterId]
            });

            // @ts-ignore
            if (hasAllowed) {
                toast.info('Allow the transaction on your wallet to proceed.');

                const selectedCanisterId = bit10BTCCanisterId;

                const actor = await window.ic.plug.createActor({
                    canisterId: selectedCanisterId,
                    interfaceFactory: idlFactory,
                }) as ICRC2ActorType;

                const selectedAmount = values.liquidity_amount * 1.5; // More in case of sudden price change

                const price = selectedAmount;
                const amount = Math.round(price * 100000000).toFixed(0);
                const time = BigInt(Date.now()) * BigInt(1_000_000) + BigInt(300_000_000_000);

                const args = {
                    spender: {
                        owner: Principal.fromText(teLiquidityHubCanisterId),
                        subaccount: [] as []
                    },
                    fee: [] as [],
                    memo: [] as [],
                    from_subaccount: [] as [],
                    created_at_time: [] as [],
                    amount: BigInt(amount),
                    expected_allowance: [] as [],
                    expires_at: [time] as [bigint],
                }

                const approve = await actor.icrc2_approve(args);

                if (approve.Ok && ICPAddress) {
                    toast.success('Approval was successful! Proceeding with transfer...');

                    const actor2 = await window.ic.plug.createActor({
                        canisterId: teLiquidityHubCanisterId,
                        interfaceFactory: idlFactory2,
                    });

                    const tickInAmountNat = Math.round(values.liquidity_amount * 100000000).toFixed(0);

                    const args2 = {
                        tick_in_name: values.liquidity_token,
                        tick_in_amount: Number(tickInAmountNat),
                        duration: values.staking_duration,
                    }

                    const transfer = await actor2.te_slp(args2);

                    if (transfer.Ok) {
                        toast.success('Tokens staked successfully!');
                    } else if (transfer.Err) {
                        const errorMessage = String(transfer.Err);
                        if (errorMessage.includes('Insufficient withdrawable balance')) {
                            toast.error('Insufficient funds');
                        } else {
                            toast.error('An error occurred while processing your request. Please try again!');
                        }
                    }
                } else {
                    toast.error('Approval failed.');
                }
            } else {
                toast.error('Transfer failed.');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setProcessing(false);
            toast.error('An error occurred while processing your request. Please try again!');
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div>
            <div className={'pb-4'}>
                <div className={'flex flex-col py-4 items-center justify-center'}>
                    <Card className={'w-[300px] md:w-[500px]'}>
                        <CardHeader>
                            <CardTitle className='flex flex-row items-center justify-between'>
                                <div>Staked Liquidity Provider</div>
                            </CardTitle>
                            <CardDescription>Lock your assets for a fixed duration and earn boosted rewards from platform fees. The more you stake, the more rewards you receive. You can claim the rewards weekly.</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            {/* @ts-ignore */}
                            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
                                <CardContent>
                                    <div className='rounded-lg border-2 py-4 px-6 z-[1] flex flex-col space-y-3'>
                                        <div className='flex flex-col'>
                                            <div>Staking Token</div>
                                            <div className='grid grid-cols-5 items-center'>
                                                <div className='col-span-4 px-2 border-2 rounded-l-full z-10 w-full md:w-[105%]'>
                                                    <FormField
                                                        // @ts-ignore
                                                        control={form.control}
                                                        name='liquidity_token'
                                                        render={({ field }) => (
                                                            <FormItem className='w-full px-2'>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant='outline'
                                                                                role='combobox'
                                                                                className={cn(
                                                                                    'border-none justify-between px-1.5 w-full',
                                                                                    !field.value && 'text-muted-foreground'
                                                                                )}
                                                                            >
                                                                                {field.value
                                                                                    ? tickIn.find(
                                                                                        (tickIn) => tickIn.value === field.value
                                                                                    )?.label
                                                                                    : 'Select token'}
                                                                                <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className='w-[180px] md:w-72 p-0 ml-10'>
                                                                        <Command>
                                                                            <CommandInput placeholder='Search token...' />
                                                                            <CommandList>
                                                                                <CommandEmpty>No token found.</CommandEmpty>
                                                                                <CommandGroup>
                                                                                    {tickIn.map((tickIn) => (
                                                                                        <CommandItem
                                                                                            value={tickIn.label}
                                                                                            key={tickIn.label}
                                                                                            onSelect={() => {
                                                                                                form.setValue('liquidity_token', tickIn.value)
                                                                                            }}
                                                                                        >
                                                                                            <div className='flex flex-row items-center'>
                                                                                                <Image src={tickIn.img} alt={tickIn.label} width={15} height={15} className='rounded-full bg-white mr-1' />
                                                                                                {tickIn.label}
                                                                                            </div>
                                                                                            <Check
                                                                                                className={cn(
                                                                                                    'ml-auto',
                                                                                                    tickIn.value === field.value
                                                                                                        ? 'opacity-100'
                                                                                                        : 'opacity-0'
                                                                                                )}
                                                                                            />
                                                                                        </CommandItem>
                                                                                    ))}
                                                                                </CommandGroup>
                                                                            </CommandList>
                                                                        </Command>
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className='col-span-1 -ml-6 md:-ml-0 z-20'>
                                                    <Image src={liquidityImg} alt='BIT10' width={75} height={75} className='z-20 bg-white rounded-full' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                            <div>Token Amount</div>
                                            <div>
                                                <FormField
                                                    // @ts-ignore
                                                    control={form.control}
                                                    name='liquidity_amount'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} placeholder='Tokens to stake' className='dark:border-white' />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                            <div>Staking duration (in days)</div>
                                            <div>
                                                <FormField
                                                    // @ts-ignore
                                                    control={form.control}
                                                    name='staking_duration'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder='Token staking duration'
                                                                    className='dark:border-white'
                                                                    type='number'
                                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className='w-full mt-2' disabled={stakeDisabledConditions}>
                                        {processing && <Loader2 className='animate-spin mr-2' size={15} />}
                                        {processing ? 'Staking...' : 'Stake'}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}
