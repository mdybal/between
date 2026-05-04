import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ActualPlaysPage from '@/pages/ActualPlaysPage'
import SessionDetailPage from '@/pages/SessionDetailPage'
import { Analytics } from '@vercel/analytics/react'
import CharactersPage from '@/pages/CharactersPage'
import CharacterDetailPage from '@/pages/CharacterDetailPage'
import ThreatsPage from '@/pages/ThreatsPage'
import ThreatDetailPage from '@/pages/ThreatDetailPage'
import MapPage from '@/pages/MapPage'
import DownloadPage from '@/pages/DownloadPage'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { useLanguage } from '@/i18n/LanguageContext'
import type { Lang } from '@/i18n/translations'

function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-serif text-6xl font-bold text-amber-900/40">404</p>
      <p className="mt-4 font-serif text-lg text-stone-500">
        {t.notFound.message}
      </p>
    </div>
  )
}

function AppRoutes() {
  const urlLang = (new URLSearchParams(window.location.search).get('lang')) as Lang | null
  
  return (
    <LanguageProvider urlLang={urlLang === 'en' || urlLang === 'pl' ? urlLang : undefined}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/actual-plays" element={<ActualPlaysPage />} />
          <Route path="/actual-plays/:id" element={<SessionDetailPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/threats" element={<ThreatsPage />} />
          <Route path="/threats/:id" element={<ThreatDetailPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/download" element={<DownloadPage />} />
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <AppRoutes />
    </BrowserRouter>
  )
}
