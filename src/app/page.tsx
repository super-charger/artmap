import { redirect } from 'next/navigation'

// now 페이지로 리다이렉트
export default function RootPage() {
  redirect('/home/now')
}
