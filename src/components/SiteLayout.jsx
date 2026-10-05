import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { motion } from 'framer-motion'
import store from '../data/store.json'
import { buildWhatsAppUrl } from '../utils/catalog.js'

const MapSection = lazy(() => import('./MapSection.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

const navigation = [
  ['Produits', '/produits'],
  ['Catégories', '/categories'],
  ['À propos', '/a-propos'],
  ['Contact', '/contact'],
]

export default function SiteLayout() {

  const [menuOpen, setMenuOpen] = useState(false)
  const whatsapp = buildWhatsAppUrl('Bonjour MK Quincaillerie, je souhaite obtenir des renseignements.')

  return (
    <>
      <ScrollToTop />
      <div className="topline">{store.tagline}<span>CASABLANCA · MAROC</span></div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand-logo" to="/" aria-label="MK Quincaillerie, accueil">
            <img src="/images/logo-mk-dark.jpg" alt="MK Quincaillerie" className="header-logo-img" />
          </Link>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            {navigation.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
            <Link className="mobile-quote" to="/devis" onClick={() => setMenuOpen(false)}>Demander un devis <ArrowUpRight size={16} /></Link>
          </nav>
          <div className="header-actions">
            <Link to="/produits" className="search-shortcut" aria-label="Rechercher un produit"><Search size={19} /></Link>
            {whatsapp && <a className="header-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}
            <Link className="button button-orange header-quote" to="/devis">Demander un devis <ArrowUpRight size={16} /></Link>
            <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </header>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.24 }}><Outlet /></motion.main>
      <footer className="site-footer">
        <div className="footer-main wrap">
          <div className="footer-brand-block">
            <Link className="brand-logo" to="/" aria-label="MK Quincaillerie">
              <img src="/images/logo-mk.jpg" alt="MK Quincaillerie" className="footer-logo-img" />
            </Link>
            <p>{store.tagline}</p>
          </div>
          <div className="footer-column"><h2>Explorer</h2><Link to="/produits">Produits</Link><Link to="/categories">Catégories</Link><Link to="/a-propos">À propos</Link><Link to="/contact">Contact</Link></div>
          <div className="footer-column"><h2>Nous contacter</h2><span>{store.phone || 'Téléphone à renseigner'}</span><span>{store.email || 'E-mail à renseigner'}</span><span>{store.address}, {store.city}</span><Link to="/devis" className="footer-cta">Parler de votre besoin <ArrowUpRight size={15} /></Link></div>
          <Suspense fallback={<div className="footer-map-loading" role="status">Chargement de la carte…</div>}><MapSection compact /></Suspense>
        </div>
        <div className="footer-bottom wrap"><span>© 2026 MK QUINCAILLERIE</span><Link to="/mentions-legales">Mentions légales</Link><span>Catalogue professionnel</span></div>
      </footer>
      {whatsapp && <a className="floating-contact" href={whatsapp} aria-label="Contacter MK Quincaillerie sur WhatsApp" target="_blank" rel="noreferrer"><span className="whatsapp-glyph">W</span><span>Parler à l'équipe</span></a>}
    </>
  )
}