import React from 'react'
import Layout from '../component/AppLayout/Layout'
import Otpverify from '../component/specific/Otpverify';

const Home = () => {
  return (
    <div>
      Homepage
      <Otpverify />
    </div>
  )
}

export default Layout()(Home);