'use client'

import { forwardRef } from 'react'

import { SystemFilterBlackIcon } from '@/generated/icons/MyIcons'
import { ButtonProps } from '@/types/button'

/**
 * 필터 아이콘 버튼 컴포넌트
 * SheetTrigger와 함께 사용되어 ref를 전달받을 수 있습니다.
 * - 1. Ref를 전달해야 하는 이유는 shadcn/ui의 SheetTrigger가 내부적으로 자식 컴포넌트를 제어하기 위해서입니다.
 * - 2. asChild가 있으면 SheetTrigger는 새로운 버튼을 생성하지 않고 대신 자식 컴포넌트(여기서는 FilterIconBtn)에 필요한 prop들을 전달합니다
 *
 * * @error Warning: Function components cannot be given refs.
 * Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
 *
 * @example
 * // ❌ 잘못된 사용
 * <SheetTrigger asChild>
 *   <FilterIconBtn />
 * </SheetTrigger>
 *
 * // ✅ 올바른 사용 - forwardRef 적용 필요
 * const FilterIconBtn = forwardRef((props, ref) => {
 *   return (
 *     <button ref={ref} {...props}>
 *       <SystemFilterBlackIcon />
 *     </button>
 *   )
 * })
 *
 */
export const FilterIconBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button ref={ref} className="ml-auto flex items-center" {...props}>
        <SystemFilterBlackIcon />
      </button>
    )
  },
)

FilterIconBtn.displayName = 'FilterIconBtn'
