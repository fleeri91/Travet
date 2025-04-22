import { Card, Flex } from '@tremor/react'

const SkeletonLoading = (): JSX.Element | null => (
  <Flex flexDirection="col" role="status" className="w-full gap-6">
    <Card className="flex justify-between px-4 py-2">
      <div className="h-10 w-96 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      <Flex justifyContent="end" className="gap-2">
        <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Flex>
    </Card>
    <Card className="flex flex-col gap-10">
      <Flex>
        <div className="h-16 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Flex>
      <Flex dir="row">
        <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Flex>
      <Flex className="flex-col gap-4">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
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
