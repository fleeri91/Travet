import { useThemeStore } from '@/store/useTheme'
import { RecordResult } from '@/types/ATG/Record'
import { getPositionResults, getTotalPositionCount } from '@/utils/dashboardFilter'
import { BarList, Text } from '@tremor/react'

interface PositionGraphProps {
  position?: number | null
  records?: RecordResult[]
  startMethod?: string | null
}

const PositionGraph = ({ position, records, startMethod }: PositionGraphProps) => {
  const { theme } = useThemeStore()

  return (
    <div className="rounded-lg bg-slate-50 px-2 py-6 shadow-md">
      {records && position && startMethod && (
        <>
          <Text className="text-center text-base font-semibold capitalize">{`startspår topp 3 ( ${startMethod} )`}</Text>
          <Text className="mb-4 text-center text-base font-semibold capitalize">{`Antal lopp - ${getTotalPositionCount(records, position, startMethod)}`}</Text>
          <div className="flex flex-col items-center justify-center gap-4">
            <BarList
              color={theme}
              data={getPositionResults(records, position, startMethod)}
              className="mx-auto w-full max-w-sm"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default PositionGraph
