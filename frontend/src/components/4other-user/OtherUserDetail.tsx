import React from 'react'
import { BaseLayout } from 'layouts'
import { LinkButton } from 'templates'
import Detail from 'templates/detail/Detail'

const OtherUserDetail = () => {
   return (
      <BaseLayout subtitle="other-user-ddetail">
      <Detail/>
      <LinkButton to='/top' sx={{ display: 'flex', justifyContent: 'center' }}>参加申請</LinkButton>
      </BaseLayout>
   )
}

export default OtherUserDetail
