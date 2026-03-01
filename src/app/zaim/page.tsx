import { Metadata } from 'next'
import ZaimContent from './ZaimContent'

export const metadata: Metadata = {
  title: 'Заявка на займ онлайн: получите деньги за 5 минут с гарантией 99% | SravniPay',
  description: 'Оформите заявку на займ онлайн мгновенно. Первый займ под 0%, перевод на любую карту за 5 минут. Гарантия одобрения 99%!',
  openGraph: {
    title: 'Заявка на займ онлайн - получите деньги за 5 минут',
    description: 'Оформите заявку на займ онлайн мгновенно. Первый займ под 0%!',
    type: 'website',
    url: 'https://sravnipay.ru/zaim',
    siteName: 'SravniPay',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Заявка на займ' }],
  },
}

export default function ZaimPage() {
  return <ZaimContent />
}
