'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import useSWR from 'swr'

import Modal from '@/components/Modal'
import { RecordRoot } from '@/types/ATG/Record'
import { Grid, Title } from '@tremor/react'
import PositionGraph from './PositionGraph'
import DashboardLoading from './DashboardLoading'
import GallopGraph from './GallopGraph'

const Dashboard = () => {
  const params = useSearchParams()
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)

  const [raceId, setRaceId] = useState<string | null>(null)
  const [start, setStart] = useState<string | null>(null)
  const [position, setPosition] = useState<number | null>(null)
  const [method, setMethod] = useState<string | null>(null)

  const { data, isLoading, isValidating } = useSWR<RecordRoot>(
    raceId && start ? `race/${raceId}/start/${start}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  )

  const onClose = () => {
    const currentPath = window.location.pathname
    router.push(currentPath)
    setOpen(false)
  }

  useEffect(() => {
    let paramId = params.get('id')
    let paramStart = params.get('start')
    let paramPos = params.get('pos')
    let paramMethod = params.get('method')

    if (paramId && paramStart) {
      setRaceId(paramId)
      setStart(paramStart)
      setPosition(paramPos !== null ? parseInt(paramPos) : null)
      setMethod(paramMethod)
      setOpen(true)
    }
  }, [params])

  useEffect(() => {
    data && console.log(data)
  }, [data])

  return (
    <Modal isOpen={open} onClose={onClose} fullWidth>
      {isLoading ? (
        <DashboardLoading />
      ) : (
        <div className="flex flex-col">
          <Title className="mb-12 text-center text-4xl">{data?.horse.name}</Title>
          <Grid numItems={1} numItemsMd={3} className="w-full gap-4">
            <Grid>
              {data?.horse.results.records && (
                <PositionGraph
                  position={position}
                  records={data?.horse.results.records}
                  startMethod={method}
                />
              )}
            </Grid>
            <Grid>
              {data?.horse.results.records && (
                <GallopGraph
                  position={position}
                  records={data?.horse.results.records}
                  startMethod={method}
                />
              )}
            </Grid>
            <Grid>Grid</Grid>
          </Grid>
        </div>
      )}
    </Modal>
  )
}

export default Dashboard
