'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const ExhibitionListType = {
  전체: { value: 'ALL', label: '전체' },
  좋아요: { value: 'LIKED', label: '좋아요 한 전시' },
  방문: { value: 'VISITED', label: '다녀 온 전시' },
} as const

const FormSchema = z.object({
  status: z.boolean().default(false).optional(),
  type: z.enum(['ALL', 'LIKED', 'VISITED']),
})

type FilterSettingFormProps = {
  actions: React.ReactNode
}

export default function FilterSettingForm({ actions }: FilterSettingFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: true,
      type: 'ALL',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, 'data')
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
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
                  className="item-center flex flex-col gap-4"
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
          {actions}
        </div>
      </form>
    </Form>
  )
}
