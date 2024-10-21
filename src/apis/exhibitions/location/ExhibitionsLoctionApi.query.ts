import { useQuery } from '@tanstack/react-query'

import { getGroupedByArea } from '@/app/(has-navigation)/exhibitions/location/_source/actions/getGroupedByArea'
import { UseQueryParams } from '@/types/module/react-query/use-query-params'

export const EXHIBITIONS_API_QUERY_KEY = {
  GET_GROUP_BY_AREA: () => ['exhibitions-group-by-area'],
}

export function useGetGroupByAreaQuery(
  params?: UseQueryParams<typeof getGroupedByArea>,
) {
  const queryKey = EXHIBITIONS_API_QUERY_KEY.GET_GROUP_BY_AREA()
  return useQuery({
    queryKey,
    queryFn: () => getGroupedByArea(),
    ...params?.options,
  })
}
