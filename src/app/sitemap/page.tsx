import { Metadata } from 'next'
import { Container, Typography, Grid, Link as MuiLink } from '@mui/material'

export const metadata: Metadata = {
  title: 'Карта сайта - все страницы SravniPay',
  description: 'Полная карта сайта SravniPay. Навигация по всем разделам: займы, кредитные карты, МФО, статьи, отзывы и FAQ.',
  openGraph: {
    title: 'Карта сайта SravniPay',
    description: 'Полная навигация по сайту микрозаймов',
    type: 'website',
    url: 'https://sravnipay.ru/sitemap',
    siteName: 'SravniPay',
  },
}

export default function SitemapPage() {
  const mainPages = [
    { name: 'Главная', url: 'https://sravnipay.ru' },
    { name: 'Займы онлайн', url: 'https://sravnipay.ru/zajmy-online' },
    { name: 'Все МФО', url: 'https://sravnipay.ru/allmfo' },
    { name: 'Кредитные карты', url: 'https://sravnipay.ru/cards' },
    { name: 'Заявка на займ', url: 'https://sravnipay.ru/zaim' },
    { name: 'Отзывы', url: 'https://sravnipay.ru/reviews' },
    { name: 'Статьи', url: 'https://sravnipay.ru/articles' },
    { name: 'FAQ', url: 'https://sravnipay.ru/faq' },
    { name: 'О нас', url: 'https://sravnipay.ru/about' },
    { name: 'Карта МФО', url: 'https://sravnipay.ru/map' },
  ]

  const legalPages = [
    { name: 'Политика конфиденциальности', url: 'https://sravnipay.ru/privacy' },
    { name: 'Пользовательское соглашение', url: 'https://sravnipay.ru/terms' },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 800 }}>
        Карта сайта
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Полная навигация по сайту SravniPay
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Основные страницы
          </Typography>
          {mainPages.map((page) => (
            <Typography key={page.url} variant="body1" sx={{ mb: 1 }}>
              <MuiLink href={page.url} underline="hover" color="primary">
                {page.name}
              </MuiLink>
            </Typography>
          ))}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Информационные страницы
          </Typography>
          {legalPages.map((page) => (
            <Typography key={page.url} variant="body1" sx={{ mb: 1 }}>
              <MuiLink href={page.url} underline="hover" color="primary">
                {page.name}
              </MuiLink>
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}
