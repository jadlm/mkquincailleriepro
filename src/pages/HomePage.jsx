import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, Hammer, MessageSquareText, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import categories from '../data/categories.json'
import reviews from '../data/reviews.json'
import { ProductGrid, SectionHeading, TrustLine } from '../components/Storefront.jsx'
import { FeaturedCarousel } from '../components/FeaturedCarousel.jsx'
import { useSeo } from '../utils/seo.js'

export function HomePage() {
  useSeo('Outillage, quincaillerie & équipement à Casablanca', 'Outillage, quincaillerie et équipements pour vos chantiers. Découvrez le catalogue MK Quincaillerie et demandez votre devis.')
  const [reviewIndex, setReviewIndex] = useState(0)
  const featured = products.filter((product) => product.featured).slice(-4)
  const featuredCategories = categories.filter((category) => category.featured)
  const review = reviews[reviewIndex]

  return (
    <>
      <section className="hero-section">
        <img className="hero-photo" src="/images/hero/atelier.jpg" alt="Outils et matériel dans un atelier professionnel" fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="hero-content wrap">
          <span className="eyebrow eyebrow-light"><span /> L'OUTILLAGE AU SERVICE DU TERRAIN</span>
          <h1>Tout ce qu'il faut<br />pour vos <em>chantiers.</em></h1>
          <p>Outillage, quincaillerie, équipements et solutions pour les professionnels et les particuliers.</p>
          <div className="hero-actions"><Link className="button button-orange" to="/devis">Demander un devis <ArrowUpRight size={17} /></Link><Link className="hero-secondary" to="/produits">Explorer le catalogue <ArrowRight size={17} /></Link></div>
          <div className="hero-index"><span>01</span><span className="hero-index-line" /><span>MK / CASABLANCA</span></div>
        </div>
        <a href="#univers" className="hero-scroll" aria-label="Découvrir nos catégories"><ArrowDown size={17} /></a>
      </section>
      <div className="trust-band wrap"><TrustLine /></div>

      <section id="univers" className="carousel-section">
        <div className="carousel-section-inner wrap">
          <SectionHeading
            eyebrow="PRODUITS VEDETTES"
            title={<>Nos produits,<br /><em>en images.</em></>}
            text="Découvrez notre sélection de produits disponibles en magasin — peinture, outillage et bien plus."
            link="/produits"
            linkLabel="Voir tout le catalogue"
          />
        </div>
        <div className="carousel-section-track wrap">
          <FeaturedCarousel />
        </div>
      </section>

      <section className="featured-section">
        <div className="wrap section-block">
          <SectionHeading eyebrow="LE CATALOGUE" title="À retrouver en magasin." text="Les références et disponibilités se confirment directement auprès de notre équipe." link="/produits" linkLabel="Tout le catalogue" />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="service-section wrap">
        <div className="service-title"><span className="eyebrow">UN BESOIN PRÉCIS ?</span><h2>Parlons de votre<br />prochain chantier.</h2><Link className="button button-dark" to="/devis">Décrire mon besoin <ArrowUpRight size={16} /></Link></div>
        <div className="service-points"><div><span className="service-icon"><Wrench size={20} /></span><div><h3>Le bon matériel</h3><p>Partagez votre besoin, nous vous orientons vers les références adaptées.</p></div></div><div><span className="service-icon"><Hammer size={20} /></span><div><h3>Pour tous les travaux</h3><p>Outillage, quincaillerie et fournitures autour du chantier et de l'atelier.</p></div></div><div><span className="service-icon"><MessageSquareText size={20} /></span><div><h3>Un devis clair</h3><p>Les prix et disponibilités sont communiqués sur demande, sans prix inventés.</p></div></div></div>
      </section>

      <section className="reviews-section"><div className="wrap reviews-inner"><div><span className="eyebrow eyebrow-light">PAROLES DE CLIENTS</span><h2>Le service se construit<br />avec vous.</h2></div>{review ? <div className="review-carousel" aria-live="polite"><div className="review-carousel-controls"><span>{String(reviewIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span><button type="button" aria-label="Avis précédent" disabled={reviews.length < 2} onClick={() => setReviewIndex((index) => (index - 1 + reviews.length) % reviews.length)}><ChevronLeft size={17} /></button><button type="button" aria-label="Avis suivant" disabled={reviews.length < 2} onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)}><ChevronRight size={17} /></button></div><article className="review-item" key={review.id}><div className="review-stars" aria-label={`${review.rating} sur 5`}>{'★'.repeat(review.rating)}</div><p>“{review.comment}”</p><strong>{review.name}{review.verified && <BadgeCheck size={15} />}</strong><time>{new Date(review.date).toLocaleDateString('fr-FR')}</time></article></div> : <div className="reviews-empty"><span className="review-mark">—</span><p>Les avis clients seront publiés ici après validation.</p><small>Aucun avis n'a encore été ajouté.</small></div>}</div></section>
    </>
  )
}