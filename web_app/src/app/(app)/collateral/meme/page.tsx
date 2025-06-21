import React, { Suspense } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Preloader from '@/components/Preloader'
import RebalanceHistory from '@/components/collateral/rebalanceHistory/RebalanceHistory'

export default function Page() {
    const index_fund = 'meme';

    return (
        <MaxWidthWrapper>
            <Suspense fallback={<Preloader />}>
                <RebalanceHistory index_fund={index_fund} />
            </Suspense>
        </MaxWidthWrapper>
    )
}
