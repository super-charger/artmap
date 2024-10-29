import { useQuery } from '@tanstack/react-query'

import { getExhibitionsWithArea } from '@/app/(has-navigation)/exhibitions/location/_source/actions/getExhibitionsWithArea'
import { UseQueryParams } from '@/types/module/react-query/use-query-params'

export const EXHIBITIONS_API_QUERY_KEY = {
  GET_EXHIBITIONS_WITH_AREA: () => ['exhibitions-with-area'],
}

export function useGetExhibitionsWithAreaQuery(
  params?: UseQueryParams<typeof getExhibitionsWithArea>,
) {
  const queryKey = EXHIBITIONS_API_QUERY_KEY.GET_EXHIBITIONS_WITH_AREA()
  return useQuery({
    queryKey,
    queryFn: () => getExhibitionsWithArea(),
    ...params?.options,
  })
}
