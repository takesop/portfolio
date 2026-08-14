import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import portrait from './assets/portrait.png'
import genixGallery from './assets/genix-gallery.png'
import logo from './assets/logo.svg'
import telegram from './assets/telegram.svg'
import genixLogo from './assets/genix-logo.png'
import wellpinLogo from './assets/wellpin-logo.png'
import wellpinGallery from './assets/wellpin-gallery.png'
import atomicbotLogo from './assets/atomicbot-logo.png'
import atomicbotGallery from './assets/atomicbot-gallery.png'
import minuteslinkLogo from './assets/minuteslink-logo.png'
import minuteslinkGallery from './assets/minuteslink-gallery.png'
import cloudusLogo from './assets/cloudus-logo.png'
import cloudusGallery from './assets/cloudus-gallery.png'
import lockIcon from './assets/lock-icon.svg'
import externalLinkIcon from './assets/external-link-icon.svg'
import ctaFlower from './assets/cta-flower.png'
import ctaGrass from './assets/cta-grass.png'
import picture01 from './assets/picture-01.png'
import picture02 from './assets/picture-02.png'
import picture03 from './assets/picture-03.png'
import picture04 from './assets/picture-04.png'
import picture05 from './assets/picture-05.png'
import picture06 from './assets/picture-06.png'
import picture07 from './assets/picture-07.png'
import picture08 from './assets/picture-08.png'
import picture09 from './assets/picture-09.png'
import picture10 from './assets/picture-10.png'
import picture11 from './assets/picture-11.png'
import picture12 from './assets/picture-12.png'
import picture13 from './assets/picture-13.png'
import './styles.css'

const pictures = [picture01, picture02, picture03, picture04, picture05, picture06, picture07, picture08, picture09, picture10, picture11, picture12, picture13]

function ContactButton({ compact = false }) {
  return (
    <a className={`contact-button ${compact ? 'contact-button--compact' : ''}`} href="https://t.me/yolips" target="_blank" rel="noreferrer">
      <img src={telegram} alt="" aria-hidden="true" />
      <span>{compact ? 'Написать' : 'Написать мне'}</span>
    </a>
  )
}

function Header() {
  return (
    <header className="site-header">
      <nav aria-label="Основная навигация">
        <div className="nav-links">
          <a className="brand" href="/" aria-label="На главную"><img src={logo} alt="" /></a>
          <span className="nav-divider" aria-hidden="true" />
          <a href="/#projects">Проекты</a>
          <a href="/pictures">Картинки</a>
        </div>
        <ContactButton compact />
      </nav>
    </header>
  )
}

function Project() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Проекты</h2>
      <div className="projects-list">
        <article className="project-card">
          <div className="project-meta">
            <div className="project-title-row">
              <img className="project-logo" src={genixLogo} alt="Логотип Genix" />
              <div>
                <h3>Мобильное приложение для AI-генерации изображений</h3>
                <p><span>Genix</span><i>•</i><span>2025-2026</span></p>
              </div>
            </div>
            <button className="project-action" type="button">
              <img src={lockIcon} alt="" aria-hidden="true" />
              <span>Кейс скоро</span>
            </button>
          </div>
          <div className="gallery" id="pictures">
            <img src={genixGallery} alt="Экраны мобильного приложения Genix для генерации изображений" />
          </div>
        </article>
        <article className="project-card">
          <div className="project-meta">
            <div className="project-title-row">
              <img className="project-logo" src={wellpinLogo} alt="Логотип WellPin" />
              <div>
                <h3>Сервис онлайн-бронирования встреч</h3>
                <p><span>WellPin</span><i>•</i><span>2026</span></p>
              </div>
            </div>
            <a className="project-action project-action--site" href="https://wellpin.io" target="_blank" rel="noreferrer">
              <span>Сайт</span>
              <img src={externalLinkIcon} alt="" aria-hidden="true" />
            </a>
          </div>
          <div className="gallery">
            <img src={wellpinGallery} alt="Интерфейсы сервиса WellPin для онлайн-бронирования встреч" />
          </div>
        </article>
        <article className="project-card">
          <div className="project-meta">
            <div className="project-title-row">
              <img className="project-logo" src={atomicbotLogo} alt="Логотип AtomicBot" />
              <div>
                <h3>Сервис для запуска и управления AI-агентом</h3>
                <p><span>AtomicBot</span><i>•</i><span>2026</span></p>
              </div>
            </div>
            <a className="project-action project-action--site" href="https://atomicbot.ai" target="_blank" rel="noreferrer">
              <span>Сайт</span>
              <img src={externalLinkIcon} alt="" aria-hidden="true" />
            </a>
          </div>
          <div className="gallery">
            <img src={atomicbotGallery} alt="Интерфейсы сервиса AtomicBot для управления AI-агентом" />
          </div>
        </article>
        <article className="project-card">
          <div className="project-meta">
            <div className="project-title-row">
              <img className="project-logo" src={minuteslinkLogo} alt="Логотип MinutesLink" />
              <div>
                <h3>Сервис AI-саммари онлайн-встреч</h3>
                <p><span>MinutesLink</span><i>•</i><span>2026</span></p>
              </div>
            </div>
            <a className="project-action project-action--site" href="https://minuteslink.com" target="_blank" rel="noreferrer">
              <span>Сайт</span>
              <img src={externalLinkIcon} alt="" aria-hidden="true" />
            </a>
          </div>
          <div className="gallery">
            <img src={minuteslinkGallery} alt="Интерфейс сервиса MinutesLink для AI-саммари встреч" />
          </div>
        </article>
        <article className="project-card">
          <div className="project-meta">
            <div className="project-title-row">
              <img className="project-logo" src={cloudusLogo} alt="Логотип Cloudus" />
              <div>
                <h3>Хостинг игровых серверов</h3>
                <p><span>Cloudus</span><i>•</i><span>2024-2025</span></p>
              </div>
            </div>
            <a className="project-action project-action--site" href="https://www.behance.net/gallery/222146245/dizajn-igrovogo-hostinga" target="_blank" rel="noreferrer">
              <span>Сайт</span>
              <img src={externalLinkIcon} alt="" aria-hidden="true" />
            </a>
          </div>
          <div className="gallery">
            <img src={cloudusGallery} alt="Интерфейс хостинга игровых серверов Cloudus" />
          </div>
        </article>
      </div>
    </section>
  )
}

function App() {
  const isPicturesPage = window.location.pathname.replace(/\/$/, '') === '/pictures'

  return isPicturesPage ? <PicturesPage /> : <HomePage />
}

function Footer() {
  return (
    <footer>
      <span>@2026, Yolips</span><i>•</i><a href="https://t.me/Yolips" target="_blank" rel="noreferrer">Telegram</a><i>•</i><a href="mailto:yolipses@gmail.com">yolipses@gmail.com</a>
    </footer>
  )
}

function PicturesPage() {
  return (
    <main id="top" className="pictures-page">
      <Header />
      <div className="pictures-shell">
        <section className="pictures-intro" aria-labelledby="pictures-title">
          <img src={logo} alt="" aria-hidden="true" />
          <h1 id="pictures-title">Малая часть моих коммерческих<br />и личных работ с проектов</h1>
        </section>
        <section className="pictures-grid" aria-label="Галерея работ">
          {pictures.map((picture, index) => (
            <div className={`picture-card ${index === 2 ? 'picture-card--wide' : ''}`} key={picture}>
              <img src={picture} alt={`Работа ${index + 1}`} />
            </div>
          ))}
        </section>
        <Footer />
      </div>
    </main>
  )
}

function HomePage() {
  return (
    <main id="top">
      <div className="page-shell">
        <section className="intro" aria-labelledby="intro-title">
          <Header />
          <div className="hero-content">
            <img className="portrait" src={portrait} alt="Портрет Рафаэля" />
            <div className="hero-copy">
              <p className="eyebrow">Привет, я Рафаэль</p>
              <h1 id="intro-title"><span>UX/UI дизайнер</span>{' '}<span>для&nbsp;ваших проектов</span></h1>
              <p className="lead">Работаю с сайтами, интерфейсами и приложениями. Делаю упор на простоту, удобство и ощутимую пользу для вашего бизнеса</p>
            </div>
            <ContactButton />
          </div>
        </section>
        <Project />
        <section className="contact-section" aria-labelledby="contact-title">
          <img className="contact-flower" src={ctaFlower} alt="" aria-hidden="true" />
          <div className="contact-copy">
            <h2 id="contact-title">Обсудим проект?</h2>
            <p>Я открыт для сотрудничества.<br />Давайте обсудим ваши идеи!</p>
          </div>
          <ContactButton />
          <img className="contact-grass" src={ctaGrass} alt="" aria-hidden="true" />
        </section>
        <Footer />
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
