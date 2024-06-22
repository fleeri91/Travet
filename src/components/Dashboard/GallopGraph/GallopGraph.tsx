import { useThemeStore } from '@/store/useTheme'
import { RecordResult } from '@/types/ATG/Record'
import { getGallopResults, getTotalPositionCount } from '@/utils/dashboardFilter'
import { ProgressCircle, Text } from '@tremor/react'

interface GallopGraphProps {
  position: number | null
  records: RecordResult[]
  startMethod?: string | null
}

const GallopGraph = ({ position, records, startMethod }: GallopGraphProps) => {
  const { theme } = useThemeStore()

  const gallopCount = getGallopResults(records, position, startMethod)

  return (
    <div className="rounded-lg bg-slate-50 px-2 py-6 shadow-md">
      {records && position && startMethod && (
        <>
          <Text className="text-center text-base font-semibold capitalize">{`Startspår gallopper ( ${startMethod} )`}</Text>
          <Text className="mb-4 text-center text-base font-semibold capitalize">{`Antal lopp - ${getTotalPositionCount(records, position, startMethod)}`}</Text>
          <div className="flex flex-col items-center justify-center">
            <ProgressCircle
              size="lg"
              color={gallopCount == 0 ? 'green' : 'red'}
              value={gallopCount}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default GallopGraph
