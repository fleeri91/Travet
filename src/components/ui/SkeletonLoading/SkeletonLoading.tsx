import { Card, Flex } from '@tremor/react'

const SkeletonLoading = (): JSX.Element | null => (
  <Flex flexDirection="col" role="status" className="w-full gap-2">
    <Card className="p-2">
      <Flex className="gap-2">
        <div className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-36 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Flex>
    </Card>
    <Card>
      <Flex flexDirection="col" className="gap-2" alignItems="start">
        <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-96 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
      </Flex>
    </Card>
    <Card>
      <Flex className="mb-4 mt-6 gap-2">
        <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Flex>
      <Flex flexDirection="col" className="gap-2">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Flex>
    </Card>
    <span className="sr-only">Loading...</span>
  </Flex>
)

export default SkeletonLoading
