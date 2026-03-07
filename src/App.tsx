import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ActualPlaysPage from '@/pages/ActualPlaysPage'
import SessionDetailPage from '@/pages/SessionDetailPage'
import CharactersPage from '@/pages/CharactersPage'
import CharacterDetailPage from '@/pages/CharacterDetailPage'
import ThreatsPage from '@/pages/ThreatsPage'
import ThreatDetailPage from '@/pages/ThreatDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/actual-plays" element={<ActualPlaysPage />} />
          <Route path="/actual-plays/:id" element={<SessionDetailPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/threats" element={<ThreatsPage />} />
          <Route path="/threats/:id" element={<ThreatDetailPage />} />
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="font-serif text-6xl font-bold text-amber-900/40">404</p>
                <p className="mt-4 font-serif text-lg text-stone-500">
                  This page has been swallowed by the fog.
                </p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
