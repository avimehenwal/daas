import React, { useState, useEffect } from 'react'
import { getClouds, ICloudItem } from '../../apis'
import { DataCard } from '../DataCard'
// api call
// display results in card
// filter results

export const Main = () => {
  const [results, setResults] = useState<ICloudItem[]>([])

  const nwCall = async () => {
    const results = await getClouds()
    setResults(results)
  }

  useEffect(() => {
    nwCall()
  }, [])

  return (
    <main>
      <div>Main Content</div>

      {results.map((item) => (
        <DataCard key={item.cloud_name} {...item} />
      ))}

      {/* <pre>{JSON.stringify(results, null, 4)}</pre> */}
    </main>
  )
}
