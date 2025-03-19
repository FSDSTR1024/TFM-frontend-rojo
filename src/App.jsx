import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { AgeConfirmationModal } from "/src/components/modals"
import { Header } from "/src/components/atoms/Header"
import { Footer } from "/src/components/atoms/Footer"

import { HomePage } from "/src/pages/Home"
import { LoginPage } from "/src/pages/Login"
import { RegisterPage } from "/src/pages/Register"
import { WinesPage } from "/src/pages/Wines"
import { WinePage } from "/src/pages/Wine"
import { RegionsPage } from "/src/pages/Regions"
import { NewsPage } from "/src/pages/News"
import { ConsumerProfilePage, WineryProfilePage } from "/src/pages/Profile"
import { WinesManagementPage } from "/src/pages/WinesManagement"
import { AboutPage } from "/src/pages/AboutPage"
import { ContactPage } from "/src/pages/Contact"
import { TermsPage } from "/src/pages/TermsPage"
import { AccessDeniedPage } from "/src/pages/AccessDenied"

export const AppContent = () => {
  const { user } = useContext(AuthContext)
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false)
  const [isAgeDenied, setIsAgeDenied] = useState(false)

  const navigate = useNavigate()
  const location = useLocation() 

  const handleAgeConfirm = (confirmed) => {
    if (confirmed) {
      setIsAgeConfirmed(true)
    } else {
      alert("Debes ser mayor de 18 años para acceder a la aplicación.")
      setIsAgeDenied(true)
      navigate("/access-denied")
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "WineAppTheme")
  }, [])

  const isAccessDeniedPage = location.pathname === "/access-denied"

  return (
    <>
      {(!user && !isAgeConfirmed && !isAgeDenied) && (
        <AgeConfirmationModal onConfirm={handleAgeConfirm} />
      )}

      <div className="flex flex-col min-h-screen">
        {!isAccessDeniedPage && <Header />} 
        <main className="flex-grow mb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/wines" element={<WinesPage />} />
            <Route path="/wines/:id" element={<WinePage />} />
            <Route path="/regions" element={<RegionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/profile/consumer" element={<ConsumerProfilePage />} />
            <Route path="/profile/winery" element={<WineryProfilePage />} />
            <Route path="/wines/manage" element={<WinesManagementPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="*" element={<h2>Add here the not-found page</h2>} />
          </Routes>
        </main>
        {!isAccessDeniedPage && <Footer />} 
      </div>
    </>
  )
}

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
