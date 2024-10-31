'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  EXHIBITIONS_API_QUERY_KEY,
  useUpdateExhibitionFilterMutation,
} from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  SystemXiconMBlackIcon,
  SystemXiconSGray4Icon,
  VerticalArrowOpenLIcon,
} from '@/generated/icons/MyIcons'

import {
  AREA_NAME_MAP,
  CITIES,
  REVERSE_AREA_NAME_MAP,
} from '../../constants/map'
import { useMapFilter } from '../../hooks/useMapFilter'
import { useRecentLocationsStorage } from '../../store/recentLocationStorage'

const FormSchema = z.object({
  city: z.string().min(1),
  // district: z.string().min(1),
})

type LocationSettingFormProps = {
  actions: (isUpdating: boolean) => React.ReactNode
}

export default function LocationSettingForm({
  actions,
}: LocationSettingFormProps) {
  const queryClient = useQueryClient()

  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false)

  const recentLocations = useRecentLocationsStorage((state) => state.locations)
  const setRecentLocations = useRecentLocationsStorage((state) => state.set)

  const { area, updateFilter } = useMapFilter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: REVERSE_AREA_NAME_MAP[area] ?? '',
      // district: '마포구',
    },
  })

  const selectedCity = form.watch('city')

  const { mutate: updateFilterMutation, isPending } =
    useUpdateExhibitionFilterMutation({
      options: {
        onSuccess: (data, variables) => {
          queryClient.setQueryData(
            EXHIBITIONS_API_QUERY_KEY.UPDATE_EXHIBITIONS_WITH_AREA({
              area: variables?.area,
            }),
            data,
          )
        },
        onError: (error) => {
          console.log(error)
        },
      },
    })

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    // 필터 업데이트 (url)
    updateFilter({ newArea: AREA_NAME_MAP[formData.city] })

    // 필터 업데이트 (api)
    updateFilterMutation({ area: AREA_NAME_MAP[formData.city] })

    // 최근 지역 추가
    setRecentLocations((state) => {
      // 중복 제거
      state.locations = state.locations.filter(
        (loc) => loc.area !== formData.city,
      )

      // 새 위치 추가
      state.locations.unshift({
        area: formData.city,
      })

      // 최대 개수 유지
      if (state.locations.length > state.maxItems) {
        state.locations.pop()
      }

      return state
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full max-w-screen-sm"
        >
          <div className="flex flex-col gap-2">
            {/* 도시 선택 */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex h-[40px] items-center rounded-full border px-4">
                  <FormControl>
                    <button
                      type="button"
                      className="flex w-full justify-between"
                      onClick={() => setIsCityDialogOpen(true)}
                    >
                      <span className="mobile-text text-grayscale_black">
                        {field.value || '-'}
                      </span>
                      <VerticalArrowOpenLIcon width={24} height={24} />
                    </button>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 구 선택 */}
            {/* <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="flex h-[40px] items-center rounded-full border px-4">
                  <FormControl>
                    <button
                      type="button"
                      className="flex w-full justify-between"
                      onClick={() => setIsCityDialogOpen(true)}
                    >
                      <span className="mobile-text text-grayscale_black">
                        {field.value}
                      </span>
                      <VerticalArrowOpenLIcon width={24} height={24} />
                    </button>
                  </FormControl>
                </FormItem>
              )}
            /> */}

            {/* 최근 지역 */}
            <div className="py-7">
              <FormLabel className="mobile-title-small font-bold">
                최근 지역
              </FormLabel>
              <div className="flex gap-2 pt-[10px]">
                {recentLocations.map((location) => (
                  <button
                    key={location.area}
                    type="button"
                    className="mobile-text-small inline-flex items-center gap-[10px] rounded-full border border-grayscale_gray2 px-3 py-1 text-grayscale_gray4"
                    onClick={() => {
                      setRecentLocations((state) => ({
                        ...state,
                        locations: state.locations.filter(
                          (loc) => loc.area !== location.area,
                        ),
                      }))
                    }}
                  >
                    <span>{location.area}</span>{' '}
                    <SystemXiconSGray4Icon width={10} height={10} />
                  </button>
                ))}
              </div>
            </div>
            {actions(isPending)}
          </div>
        </form>
      </Form>

      <Dialog open={isCityDialogOpen} onOpenChange={setIsCityDialogOpen}>
        <DialogContent
          hideCloseButton
          aria-describedby="dialog-description"
          className="h-screen w-full max-w-screen-sm sm:rounded-none"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>도시 선택</DialogTitle>
            <DialogDescription>
              도시를 선택하여 위치를 설정할 수 있습니다
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center border-b p-2">
            <button type="button" onClick={() => setIsCityDialogOpen(false)}>
              <SystemXiconMBlackIcon width={32} height={32} />
            </button>
          </div>

          <div className="hide-scrollbar overflow-auto">
            {CITIES.map((city) => (
              <button
                key={city}
                type="button"
                className={`w-full border-b p-4 text-left ${
                  selectedCity === city ? 'bg-gray-50' : ''
                }`}
                onClick={() => {
                  form.setValue('city', city)
                  setIsCityDialogOpen(false)
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
