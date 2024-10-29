'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import '@radix-ui/react-dialog'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetExhibitionsWithAreaQuery } from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
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

const areaCenterPosition: Record<
  string,
  { latitude: number; longitude: number }
> = {
  서울특별시: { latitude: 37.5665, longitude: 126.978 },
  강원도: { latitude: 37.8228, longitude: 128.1555 },
  경기도: { latitude: 37.2636, longitude: 127.0286 },
  경상남도: { latitude: 35.4606, longitude: 128.2132 },
  경상북도: { latitude: 36.576, longitude: 128.505 },
  광주광역시: { latitude: 35.1595, longitude: 126.8526 },
  대구광역시: { latitude: 35.8714, longitude: 128.6014 },
  대전광역시: { latitude: 36.3504, longitude: 127.3845 },
  부산광역시: { latitude: 35.1796, longitude: 129.0756 },
  세종특별자치시: { latitude: 36.48, longitude: 127.289 },
  울산광역시: { latitude: 35.5384, longitude: 129.3114 },
  인천광역시: { latitude: 37.4563, longitude: 126.7052 },
  전라남도: { latitude: 34.8679, longitude: 126.991 },
  전라북도: { latitude: 35.7175, longitude: 127.153 },
  제주특별자치도: { latitude: 33.489, longitude: 126.4983 },
  충청남도: { latitude: 36.6588, longitude: 126.6728 },
  충청북도: { latitude: 36.6357, longitude: 127.4914 },
} as const

// 도시 데이터
const CITIES = [
  '서울특별시',
  '강원도',
  '경기도',
  '경상남도',
  '경상북도',
  '광주광역시',
  '대구광역시',
  '대전광역시',
  '부산광역시',
  '세종특별자치시',
  '울산광역시',
  '인천광역시',
  '전라남도',
  '전라북도',
  '제주특별자치도',
  '충청남도',
  '충청북도',
] as const

const FormSchema = z.object({
  city: z.string().min(1),
  // district: z.string().min(1),
})

type LocationSettingFormProps = {
  actions: React.ReactNode
}

export default function LocationSettingForm({
  actions,
}: LocationSettingFormProps) {
  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false)

  const visibleAreas = useMapStateContext((state) => state.visibleAreas)

  const set = useMapStateContext((state) => state.set)

  // 현재 보고 있는 위치를 저장해야함
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: visibleAreas[0],
      // district: '마포구',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const centerPosition = areaCenterPosition[data.city]
    if (centerPosition) {
      set('center', centerPosition)
    }
  }

  const selectedCity = form.watch('city')

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
                        {field.value}
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
                <span className="mobile-text-small inline-flex items-center gap-[10px] rounded-full border border-grayscale_gray2 px-3 py-1 text-grayscale_gray4">
                  제주 서귀포시 <SystemXiconSGray4Icon width={10} height={10} />
                </span>
                <span className="mobile-text-small inline-flex items-center gap-[10px] rounded-full border border-grayscale_gray2 px-3 py-1 text-grayscale_gray4">
                  서울 종로구 <SystemXiconSGray4Icon width={10} height={10} />
                </span>
              </div>
            </div>
            {actions}
          </div>
        </form>
      </Form>

      {/* 도시 선택 다이얼로그 */}
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
