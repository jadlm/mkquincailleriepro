import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// ─── All showcase images from dossier "peintures" and dossier "1" ───────────
const CAROUSEL_ITEMS = [
  // Dossier image1 (WhatsApp — produits divers du magasin)
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.39.jpeg', label: 'Produit en magasin', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40.jpeg', label: 'Matériel professionnel', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (1).jpeg', label: 'Équipement de chantier', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (2).jpeg', label: 'Outillage & fournitures', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (3).jpeg', label: 'Produit en magasin', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (4).jpeg', label: 'Matériel professionnel', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (5).jpeg', label: 'Équipement de chantier', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (6).jpeg', label: 'Outillage & fournitures', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.40 (7).jpeg', label: 'Produit en magasin', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.41.jpeg', label: 'Matériel professionnel', category: 'STOCK DISPONIBLE', link: '/produits' },
  { src: '/images/products/divers/WhatsApp Image 2026-09-30 at 01.25.41 (1).jpeg', label: 'Équipement de chantier', category: 'STOCK DISPONIBLE', link: '/produits' },
  // Dossier peintures
  { src: '/images/products/peintures/brosse-professionnelle-12.png', label: 'Brosse professionnelle 12mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/brosse-professionnelle-51.png', label: 'Brosse professionnelle 51mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/brosse-professionnelle-76.png', label: 'Brosse professionnelle 76mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/jeu-de-4-spatules.png', label: 'Jeu de 4 spatules', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/pinceau-professionnel-25.png', label: 'Pinceau professionnel 25mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/set-de-9-mini-rouleaux.png', label: 'Set de 9 mini-rouleaux', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/spatule-rigide-100mm.png', label: 'Spatule rigide 100mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/spatule-rigide-25mm.png', label: 'Spatule rigide 25mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/spatule-rigide-50mm.png', label: 'Spatule rigide 50mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
  { src: '/images/products/peintures/spatule-rigide-76mm.png', label: 'Spatule rigide 76mm', category: 'PEINTURE', link: '/produits?categorie=peinture-decoration' },
]

function getVisibleCount() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth < 560) return 1
  if (window.innerWidth < 820) return 2
  if (window.innerWidth < 1080) return 3
  return 4
}

export function FeaturedCarousel() {
  const total = CAROUSEL_ITEMS.length
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(getVisibleCount)
  const [paused, setPaused] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    function onResize() { setVisible(getVisibleCount()) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const maxIndex = Math.max(0, total - visible)

  const goTo = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(Math.max(0, Math.min(index, maxIndex)))
    setTimeout(() => setIsAnimating(false), 420)
  }, [isAnimating, maxIndex])

  const prev = useCallback(() => goTo(current <= 0 ? maxIndex : current - 1), [current, goTo, maxIndex])
  const next = useCallback(() => goTo(current >= maxIndex ? 0 : current + 1), [current, goTo, maxIndex])

  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(next, 3500)
    return () => clearInterval(intervalRef.current)
  }, [paused, next])

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) { delta > 0 ? next() : prev() }
    touchStartX.current = null
  }

  const cardWidthPct = 100 / visible
  const translateX = current * cardWidthPct

  return (
    <div
      className="fc-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Produits vedettes"
    >
      <div className="fc-viewport" aria-live="polite">
        <div
          className="fc-track"
          style={{
            transform: `translateX(-${translateX}%)`,
            transition: isAnimating ? 'transform 0.42s cubic-bezier(.4,0,.2,1)' : 'none',
          }}
        >
          {CAROUSEL_ITEMS.map((item, i) => (
            <div
              key={i}
              className="fc-slide"
              style={{ flex: `0 0 ${cardWidthPct}%` }}
              aria-roledescription="slide"
              aria-label={`${i + 1} sur ${total}`}
            >
              <Link to={item.link} className="fc-card">
                <div className="fc-img-wrap">
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <span className="fc-badge">{item.category}</span>
                </div>
                <div className="fc-info">
                  <span className="fc-label">{item.label}</span>
                  <span className="fc-arrow">&#8594;</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button className="fc-btn fc-btn-prev" onClick={prev} aria-label="Produit précédent">
        <ChevronLeft size={20} />
      </button>
      <button className="fc-btn fc-btn-next" onClick={next} aria-label="Produit suivant">
        <ChevronRight size={20} />
      </button>

      <div className="fc-dots" role="tablist" aria-label="Navigation du carousel">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={current === i}
            aria-label={`Groupe ${i + 1}`}
            className={'fc-dot' + (current === i ? ' fc-dot-active' : '')}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
