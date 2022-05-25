import { BaseLayout } from 'layouts'
import React from 'react'
import Detail from 'templates/detail/Detail'

const PendingDetail = () => {
   return (
      <BaseLayout subtitle="pastDetail">
         <Detail/>
      </BaseLayout>
   )
}

export default PendingDetail
