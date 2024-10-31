'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  EXHIBITIONS_API_QUERY_KEY,
  useUpdateExhibitionFilterMutation,
} from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
import { ExhibitionStatus } from '@/apis/exhibitions/types/model/map'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

import { useMapFilter } from '../../hooks/useMapFilter'

const ExhibitionListType = {
  전체: { value: 'ALL', label: '전체' },
  좋아요: { value: 'LIKED', label: '좋아요 한 전시' },
  방문: { value: 'VISITED', label: '다녀 온 전시' },
} as const

const FormSchema = z.object({
  status: z.enum([ExhibitionStatus.ONGOING, ExhibitionStatus.ENDED]),
  type: z.enum(['ALL', 'LIKED', 'VISITED']),
})

type FilterSettingFormProps = {
  actions: React.ReactNode
}

export default function FilterSettingForm({ actions }: FilterSettingFormProps) {
  const queryClient = useQueryClient()

  const { status, updateFilter } = useMapFilter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: status ?? ExhibitionStatus.ONGOING,
      type: 'ALL',
    },
  })

  const {
    mutate: updateFilterMutation,
    isPending,
    isError,
  } = useUpdateExhibitionFilterMutation({
    options: {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          EXHIBITIONS_API_QUERY_KEY.UPDATE_EXHIBITIONS_WITH_AREA({
            status: variables?.status,
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
    // Url 업데이트
    updateFilter({
      newStatus: formData.status as ExhibitionStatus,
    })

    // 서버에 필터 업데이트 요청
    updateFilterMutation({
      status: formData.status as ExhibitionStatus,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full max-w-screen-sm"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between border-b px-4 py-5">
              <FormLabel className="form-label">전시중</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value === ExhibitionStatus.ONGOING}
                  onCheckedChange={(checked) => {
                    field.onChange(
                      checked ?
                        ExhibitionStatus.ONGOING
                      : ExhibitionStatus.ENDED,
                    )
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-4 px-4 py-5">
              <FormLabel className="form-label">전시리스트</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                >
                  {Object.entries(ExhibitionListType).map(
                    ([key, { value, label }]) => (
                      <FormItem
                        key={key}
                        className="flex h-[28px] items-center justify-between space-y-0"
                      >
                        <FormLabel
                          className={cn('text-grayscale_gray5 sm:mobile-text', {
                            'text-primary': field.value === value,
                          })}
                        >
                          {label}
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem
                            value={value}
                            className="custom-radio"
                          />
                        </FormControl>
                      </FormItem>
                    ),
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="h-[70px]"></div>
        <div className="fixed bottom-0 flex h-[70px] w-full max-w-screen-sm items-center px-4 pb-2">
          <div className="w-full">
            {isError && (
              <p className="mb-2 text-sm text-destructive">
                필터 적용 중 오류가 발생했습니다
              </p>
            )}
            <div className={cn({ 'opacity-50': isPending })}>{actions}</div>
          </div>
        </div>
      </form>
    </Form>
  )
}
