import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Hourglass } from 'react-loader-spinner'

const Loading = () => {

    return (
        <Box component={'div'} height={'100%'} width={'100%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ marginTop: '20rem' }}>
                <Hourglass
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
            </Box>
        </Box>
    )
}

export default Loading
