import React from 'react'
import Head from 'next/head'

import Controls from '../components/Controls'
import Grid from '../components/Grid'

export default function Home() {
  return (
    <>
      <Head>
        <title>React-Ag-Grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen p-2 bg-gray-700 flex flex-col gap-2">
        <Controls />
        <Grid />
      </div>
    </>
  )
}
