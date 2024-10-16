import React from 'react'
import { Helmet } from 'react-helmet-async'

const PageTitle = ({ title = 'Trinder ChatApp', description = 'Trinder is a medium to your Loved Ones ' }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
        </>
    )
}

export default PageTitle
