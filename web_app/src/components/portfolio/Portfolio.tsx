import React from 'react'
import { useChain } from '@/context/ChainContext'
import ICPBalanceAndAllocation from './icp/ICPbalanceAndAllocation'
import SolDevbalanceAndAllocation from './sol_dev/SolDevbalanceAndAllocation'
import Preformance from './preformance'

export default function Portfolio() {
    const { chain } = useChain();

    console.log(chain)

    return (
        <div className='flex flex-col space-y-4'>
            {chain === 'icp' && <ICPBalanceAndAllocation />}
            {chain === 'sol_dev' && <SolDevbalanceAndAllocation />}
            <Preformance />
        </div>
    )
}
