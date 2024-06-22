import { Flex, Text } from '@tremor/react'

const DashboardLoading = (): JSX.Element => (
  <Flex justifyContent="center" alignItems="center" className="absolute inset-0 h-full">
    <Text className="text-xl">Laddar...</Text>
  </Flex>
)

export default DashboardLoading
