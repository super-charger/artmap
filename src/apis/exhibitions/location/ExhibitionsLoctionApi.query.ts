import { useMutation, useQuery } from '@tanstack/react-query'

import { getExhibitionsWithArea } from '@/app/(has-navigation)/exhibitions/location/_source/actions/getExhibitionsWithArea'
import { UseMutationParams } from '@/types/module/react-query/use-mutation-params'
import { UseQueryParams } from '@/types/module/react-query/use-query-params'

import { ExhibitionStatus } from '../types/model/map'

export const EXHIBITIONS_API_QUERY_KEY = {
  GET_EXHIBITIONS_WITH_AREA: () => ['create-exhibitions-with-area'],
  UPDATE_EXHIBITIONS_WITH_AREA: (params?: {
    area?: string
    status?: ExhibitionStatus
  }) => ['update-exhibitions-with-area', params],
}

// Query: 자동으로 캐시되고 재사용된다.
export function useGetExhibitionsWithAreaQuery(
  queryParams?: UseQueryParams<typeof getExhibitionsWithArea>,
) {
  const queryKey = EXHIBITIONS_API_QUERY_KEY.GET_EXHIBITIONS_WITH_AREA()
  return useQuery({
    queryKey,
    queryFn: () => getExhibitionsWithArea(),
    ...queryParams?.options,
  })
}

// Mutation: 캐시되지 않음, 매번 새로운 요청을 보낸다.
export function useUpdateExhibitionFilterMutation(
  mutationParams?: UseMutationParams<typeof getExhibitionsWithArea>,
) {
  return useMutation({
    mutationFn: (params: Parameters<typeof getExhibitionsWithArea>[0]) =>
      getExhibitionsWithArea(params),
    ...mutationParams?.options,
  })
}
