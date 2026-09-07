import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './platform-ai.css'

const assets = '/platform-ai/assets/'
const features = [
  ['channels', 'Чаты и каналы', 'Открытые, закрытые и гостевые каналы для любого сценария', 300],
  ['calls', 'Звонки и встречи', 'Планирование прямо из чата. Запись и расшифровка остаются на вашем сервере', 435],
  [null, 'Задачи', 'Из сообщения получается задача с ответственным и сроком в CRM или отдельном канале', 421],
  [null, 'Админка', 'Сотрудник ушёл, доступ закрыли, переписка осталась\nв компании. Права видно на одном экране.', 482],
]
const assistants = [
  ['Итоги встречи', 'Кто что сказал, что решили, кто что делает дальше.'],
  ['Поиск по переписке', 'Находит обсуждение, когда помните только «где-то был файл».', 286],
  ['Утренняя сводка', 'Где вас упомянули и что с вас ждут сегодня.'],
  ['Работа с CRM', 'Заводит лид и задачу из чата, отвечает по сделке.'],
  ['Проверка перед отправкой', 'Смотрит текст и вложение, пока они ещё не ушли не туда.', 251],
  ['Свои агенты', 'Под ваш процесс: сметы, заявки, регламенты'],
]
const useCases = [
  ['Юридическая фирма', 'Дело не уходит\nвместе с юристом', 'Переписка с клиентом и сканы лежат в канале проекта, а не в личном телефоне партнёра.'],
  ['Производство', 'Цех и офис в\nодном канале', 'Смена скидывает фото брака, снабжение видит в чате. Итоги планёрки ассистент раскладывает по людям.'],
  ['Клиника', 'Снимки пациентов\nне покидают клинику', 'Врачи советуются внутри контура. Требования 152-ФЗ выполняются'],
  ['Стройка', 'Подрядчик видит\nтолько свой объект', 'Гостевой доступ в один канал. Работы закончились, канал закрыли.'],
  ['Продажи', 'История сделки\nсобирается сама', 'Звонки, договорённости и задачи в карточке клиента. Новый менеджер входит в дело за вечер.'],
  ['Холдинг', 'Отдельный контур на\nодин отдел', 'Служба безопасности или сделки M&A работают в стороне от общего мессенджера.'],
]
const dataFeatures = [
  ['imgFileShield02', 'Дело не уходит\nвместе с юристом', 216],
  ['imgLock02', 'Шифрование переписки,\nфайлов и звонков', 304],
  ['imgKey01', 'Ключи и резервные\nкопии на вашей стороне', 246],
  ['imgDotHorizontal', 'Отдельный PIN на случай\nпринуждения', 261],
  ['imgClock01', 'Журнал действий\nадминистратора', 286],
  ['imgUsersProfiles03', 'Роли и права: кто что видит и\nкого приглашает', 311],
]
const installations = [
  ['Своё железо', 'Сервер в вашей серверной, если данные не должны выходить из офиса физически.', 'Обсудить требования'],
  ['Частное облако', 'Ваш арендованный контур. Быстрее\nстартовать, если своей серверной нет.', 'Обсудить установку'],
  ['Готовый комплекс', 'Привозим собранным. Включили в сеть, завели людей, работаете.', 'Подобрать конфигурацию'],
]
const process = [
  ['Разговор', 'Смотрим, что у вас уже стоит и чего требует безопасность.', 216],
  ['Демо у вас', 'Ставим на ваш стенд, а не показываем на нашем.', 236],
  ['Пилот', 'Один отдел, реальные чаты, бесплатно.', 163],
  ['Вся компания', 'Типовая установка силами одного инженера', 236],
]
const included = ['Один сервер', 'Ядро', 'Ассистент', 'Лицензия на установку', 'Разовый запуск', 'Поддержка в год, по SLA', 'Архив', 'DLP', 'Гостевой доступ - по выбору']
const comparison = [
  ['Где переписка', 'На чужих серверах', 'У вас', 'У вас'],
  ['При увольнении', 'Уходит с человеком', 'Остаётся', 'Остаётся, доступ закрывается'],
  ['Кто отвечает за работу', 'Никто', 'Ваш админ', 'Мы, по SLA'],
  ['Срок запуска', 'Сразу', 'Месяцы', '[СРОК]'],
  ['Стоимость входа', 'Ноль', 'Скрытая, в людях', 'По договору'],
]
const questions = ['Вы видите нашу переписку?', 'Что нужно из железа?', 'У нас нет своего админа', 'Можно перенести историю?', 'А если мы решим уйти?', 'Есть бесплатный период?']
// Only the first answer exists in the supplied design. No product promises are invented.
const answers = ['Нет. Установка работает в вашем контуре, ключи у вас. Прочитать содержимое мы технически не можем.']

function setupScrollAnimations() {
  const root = document.querySelector('.pa-page')
  if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const hero = root.querySelector('.pa-hero')
  const heroImage = root.querySelector('.pa-hero-image')
  const header = root.querySelector('.pa-header')
  const revealItems = []

  function syncHeaderOffset() {
    if (header) root.style.setProperty('--pa-header-offset', `${Math.ceil(header.getBoundingClientRect().height)}px`)
  }
  syncHeaderOffset()
  const headerResizeObserver = header && 'ResizeObserver' in window ? new ResizeObserver(syncHeaderOffset) : null
  if (headerResizeObserver) headerResizeObserver.observe(header)

  function mark(selector, options = {}) {
    const { stagger = false, media = false, parallax = false, delayStep = 75 } = options
    Array.from(root.querySelectorAll(selector)).forEach((element, index) => {
      element.classList.add('pa-reveal')
      if (media) element.classList.add('pa-media-reveal')
      if (parallax) element.classList.add('pa-parallax-target')
      if (stagger) element.style.setProperty('--pa-delay', `${Math.min(index * delayStep, 420)}ms`)
      revealItems.push(element)
    })
  }

  mark('.pa-hero-copy h1, .pa-hero-copy p, .pa-hero-actions', { stagger: true, delayStep: 90 })
  mark('.pa-hero-image', { media: true, parallax: true })
  mark('.pa-integrations .pa-section-heading, .pa-integrations-logos', { media: true })
  mark('#features .pa-section-heading, #features .pa-feature-card', { stagger: true })
  mark('#features .pa-feature-illustration', { media: true, delayStep: 50 })
  mark('#assistant .pa-section-heading, #assistant .pa-assistant-list article, #assistant .pa-assistant-illustration', { stagger: true })
  mark('#assistant .pa-assistant-illustration', { media: true })
  mark('#examples .pa-section-heading, #examples .pa-use-cases article, #examples .pa-use-cases-image', { stagger: true })
  mark('#examples .pa-use-cases-image', { media: true })
  mark('#data .pa-section-heading, #data .pa-data-grid article', { stagger: true })
  mark('#installation .pa-section-heading, #installation .pa-installation-cards article, #installation .pa-process', { stagger: true })
  mark('#installation .pa-process-grid article', { stagger: true, delayStep: 65 })
  mark('#pricing .pa-section-heading, #pricing .pa-pricing-grid > *', { stagger: true })
  mark('#comparison .pa-section-heading, #comparison .pa-comparison', { media: true })
  mark('#faq .pa-faq-layout > *', { stagger: true })
  mark('#demo .pa-demo-layout > *', { stagger: true })
  mark('.pa-footer-top, .pa-footer-bottom', { stagger: true })

  root.classList.add('pa-motion-ready')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' })
  revealItems.forEach(element => observer.observe(element))

  let frame = 0
  function updateParallax() {
    frame = 0
    if (!hero || !heroImage) return
    const bounds = hero.getBoundingClientRect()
    const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(bounds.height * 0.9, 1)))
    heroImage.style.setProperty('--pa-parallax-y', `${Math.round(progress * 54)}px`)
  }
  function onScroll() {
    if (!frame) frame = requestAnimationFrame(updateParallax)
  }
  updateParallax()
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    observer.disconnect()
    headerResizeObserver?.disconnect()
    window.removeEventListener('scroll', onScroll)
    if (frame) cancelAnimationFrame(frame)
    root.classList.remove('pa-motion-ready')
    root.style.removeProperty('--pa-header-offset')
    revealItems.forEach(element => {
      element.classList.remove('pa-reveal', 'pa-media-reveal', 'pa-parallax-target', 'is-visible')
      element.style.removeProperty('--pa-delay')
    })
  }
}

function Button({ children, href = '#demo', secondary = false, className = '', onClick }) {
  const cls = `pa-button ${secondary ? 'pa-button-secondary' : ''} ${className}`
  return onClick ? <button className={cls} onClick={onClick} type="button">{children}</button> : <a className={cls} href={href}>{children}</a>
}
function SectionHeading({ title, description, small = false, centered = false, action, descriptionWidth }) {
  return <div className={`pa-section-heading ${small ? 'pa-heading-small' : ''} ${centered ? 'pa-heading-centered' : ''}`}>
    <div><h2>{title}</h2>{description && <p style={{ maxWidth: descriptionWidth }}>{description}</p>}</div>{action}
  </div>
}
function Header({ showNotice }) {
  return <header className="pa-header" id="top"><div className="pa-container pa-header-inner">
    <a className="pa-brand" href="#top">MESSENGER</a>
    <nav aria-label="Навигация по странице"><a href="#features">Возможности</a><a href="#assistant">Ассистент</a><a href="#examples">Примеры</a><a href="#data">Данные</a><a href="#pricing">Цены</a></nav>
    <div className="pa-header-actions"><Button secondary onClick={() => showNotice('Войти')}>Войти</Button><Button>Демо</Button></div>
  </div></header>
}
function ProjectHero() {
  return <section className="pa-hero" aria-labelledby="pa-hero-title">
    <div className="pa-hero-copy"><h1 id="pa-hero-title">Защищенный<br />корпоративный<br />мессенджер</h1>
      <p>Переписка, звонки и файлы остаются в компании. Ассистент слушает встречи и пишет итоги</p>
      <div className="pa-hero-actions"><Button>Запросить демо</Button><Button secondary href="#pricing">Цены</Button></div>
    </div>
    <img className="pa-hero-image" src={`${assets}hero-interface.png`} width="1440" height="856" alt="Переписка в мессенджере и ИИ-помощник для делового ответа" fetchPriority="high" />
  </section>
}
function IntegrationsSection() {
  return <section className="pa-section pa-integrations"><div className="pa-container">
    <SectionHeading title={<>Интеграции с вашими<br />инструментами</>} description="Подключайте почту, календарь, CRM, 1С, DLP и другие корпоративные системы" descriptionWidth={334} small centered />
    <div className="pa-integrations-logos"><img src={`${assets}integrations.png`} width="1214" height="134" alt="amoCRM, RetailCRM, 1С, Outlook, Jira, Google Calendar, Exchange, Битрикс24, Gmail и корпоративная почта" /></div>
  </div></section>
}
function FeatureCard({ feature, index }) {
  const [image, title, description, width] = feature
  return <article className="pa-feature-card" id={`feature-${index}`}>
    <div className={`pa-feature-illustration ${!image ? 'pa-empty-illustration' : ''}`}>{image && <img src={`${assets}${image}.png`} width="579" height="458" alt={title} loading="lazy" />}</div>
    <h3>{title}</h3><p style={{ maxWidth: width }}>{description}</p>
  </article>
}
function FeaturesSection() {
  return <section className="pa-section" id="features"><div className="pa-container">
    <SectionHeading title="Что внутри" description="Чаты, звонки и задачи в одном окне. Отдельный сервис для созвонов не нужен" descriptionWidth={368} small action={<Button secondary>Запросить демо</Button>} />
    <div className="pa-feature-grid">{features.map((feature, i) => <FeatureCard key={feature[1]} feature={feature} index={i} />)}</div>
  </div></section>
}
function AssistantSection() {
  return <section className="pa-section" id="assistant"><div className="pa-container">
    <SectionHeading title="ИИ ассистенты" description="Модели стоят на вашем железе. Ни один вопрос и ни один файл не уходит во внешний сервис." descriptionWidth={396} small action={<Button secondary>Запросить демо</Button>} />
    <div className="pa-assistant-layout"><div className="pa-assistant-list">{assistants.map(([title, description, width], i) => <article className={i === 0 ? 'pa-assistant-active' : ''} key={title}><h3>{title}</h3><p style={{ maxWidth: width }}>{description}</p></article>)}</div>
      <div className="pa-assistant-illustration"><img src={`${assets}assistant.png`} width="728" height="814" alt="ИИ-ассистент подводит итоги встречи в чате" loading="lazy" /></div>
    </div>
  </div></section>
}
function UseCasesSection() {
  return <section className="pa-section" id="examples"><div className="pa-container">
    <SectionHeading title="Как этим пользоваться" description="Шесть ситуаций, с которыми к нам приходят чаще всего." centered />
    <div className="pa-use-cases">{useCases.map(([label, title, description]) => <article key={label}><p className="pa-mono">{label}</p><h3>{title}</h3><p>{description}</p></article>)}</div>
    <img className="pa-use-cases-image" src={`${assets}use-cases.png`} width="1160" height="750" alt="Канал стройки в настольном и мобильном мессенджере" loading="lazy" />
  </div></section>
}
function DataSection({ showNotice }) {
  return <section className="pa-section" id="data"><div className="pa-container">
    <SectionHeading title="Где лежат данные" description="На вашем сервере. Мы не храним содержимое, не пропускаем трафик через себя и не заходим к вам удалённо." descriptionWidth={497} action={<Button secondary onClick={() => showNotice('Спецификация для вашей ИБ, PDF')}>Спецификация для вашей ИБ, PDF</Button>} />
    <div className="pa-data-grid">{dataFeatures.map(([icon, title, width]) => <article key={icon}><div className="pa-icon-tile"><img src={`${assets}${icon}.svg`} width="24" height="24" alt="" /></div><h3 style={{ maxWidth: width }}>{title}</h3></article>)}</div>
  </div></section>
}
function InstallationSection() {
  return <section className="pa-section" id="installation"><div className="pa-container">
    <SectionHeading title="Как установить" centered />
    <div className="pa-installation-cards">{installations.map(([title, description, action]) => <article key={title}><h3>{title}</h3><p>{description}</p><a href="#demo" className="pa-mono">{action}<img src={`${assets}imgArrowUpRight.svg`} width="20" height="20" alt="" /></a></article>)}</div>
    <div className="pa-process"><p className="pa-mono">Как проходит процесс</p><div className="pa-process-grid">{process.map(([title, description, width], i) => <article key={title}><span className="pa-mono">0{i + 1}</span><h3>{title}</h3><p style={{ maxWidth: width }}>{description}</p></article>)}</div></div>
  </div></section>
}
function PricingSection({ employees, setEmployees }) {
  const progress = employees <= 25 ? (employees - 10) / 15 * 18 : 18 + (employees - 25) / 475 * 82
  function updateEmployees(event) {
    const value = Number(event.target.value)
    setEmployees(Math.round(value <= 18 ? 10 + value / 18 * 15 : 25 + (value - 18) / 82 * 475))
  }
  return <section className="pa-section" id="pricing"><div className="pa-container">
    <SectionHeading title="Сколько стоит" description="Считаем за установку. Наняли пятерых — счёт не вырос, пересчёт по местам только на продлении." />
    <div className="pa-pricing-grid"><div className="pa-included"><p className="pa-mono">На {employees} сотрудников</p><ul>{included.map(item => <li key={item}><img src={`${assets}imgCheck01.svg`} width="24" height="24" alt="" />{item}</li>)}</ul></div>
      <div className="pa-calculator"><h3>Пришлем расчет</h3><p className="pa-calculator-description">Укажите примерное количество сотрудников. После короткого разговора обсудим текст........</p>
        <div className="pa-slider" style={{ '--progress': `${progress}%` }}><output htmlFor="pa-employees">{employees === 500 ? '500+' : employees}</output><input id="pa-employees" aria-label="Количество сотрудников для расчёта" type="range" min="0" max="100" step="0.1" value={progress} onChange={updateEmployees} /><div className="pa-slider-labels pa-mono"><span>10</span><span>500+</span></div></div>
        <div className="pa-estimate"><p>Ориентировочно</p><strong>от 1 900 ₽</strong></div>
        <div className="pa-calculator-action"><Button>Получить расчет<img src={`${assets}imgArrowUpRight.svg`} width="18" height="18" alt="" /></Button><p>Точный расчет после короткого разговора</p></div>
      </div>
    </div>
  </div></section>
}
function ComparisonSection() {
  return <section className="pa-section" id="comparison"><div className="pa-container"><SectionHeading title="Почему мы?" />
    <div className="pa-comparison"><table><thead><tr><td /><th scope="col">Обычный мессенджер</th><th scope="col">Собрать самим</th><th scope="col">Наше решение</th></tr></thead><tbody>{comparison.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
  </div></section>
}
function FAQSection() {
  return <section className="pa-section" id="faq"><div className="pa-container pa-faq-layout"><h2>Вопросы<br />и ответы</h2><div className="pa-faq-list">{questions.map((question, i) => <details key={question} open={i === 0 ? true : undefined}><summary>{question}<span className="pa-chevron" aria-hidden="true" /></summary><p>{answers[i] || <>Обсудим этот вопрос на <a href="#demo">демо в вашем контуре</a>.</>}</p></details>)}</div></div></section>
}
function DemoSection({ employees, showNotice }) {
  const [count, setCount] = useState('')
  return <section className="pa-demo" id="demo"><div className="pa-container pa-demo-layout"><div><h2>Покажем на<br />вашем сервере</h2><p>Развернём демо в вашем контуре и ответим на вопросы безопасности. Без презентации на сорок слайдов.</p></div>
    <form onSubmit={event => { event.preventDefault(); showNotice('Заявка на демо', 'Это демонстрационная страница дизайна. Данные не отправлены: сервис приёма заявок ещё не подключён.') }}>
      <div className="pa-form-fields"><div className="pa-form-row"><input name="name" aria-label="Имя" placeholder="Имя" autoComplete="given-name" required /><input name="company" aria-label="Компания" placeholder="Компания" autoComplete="organization" required /></div>
      <input type="email" name="email" aria-label="Почта" placeholder="Почта" autoComplete="email" required />
      <div className="pa-form-count"><input type="number" name="employees" aria-label="Количество сотрудников" placeholder="Количество сотрудников" min="1" value={count} onChange={e => setCount(e.target.value)} /><div><button type="button" aria-label="Уменьшить количество сотрудников" onClick={() => setCount(Math.max(1, Number(count || employees) - 1))}>−</button><button type="button" aria-label="Увеличить количество сотрудников" onClick={() => setCount(Number(count || employees) + 1)}>+</button></div></div>
      <textarea name="message" aria-label="Что хотите закрыть внедрением" placeholder="Что хотите закрыть внедрением" rows="3" /></div>
      <label className="pa-consent"><input type="checkbox" required name="consent" /><span>Согласен с политикой обработки персональных данных</span></label>
      <button className="pa-button pa-submit" type="submit">Отправить</button>
    </form>
  </div></section>
}
function Footer({ showNotice }) {
  const columns = [
    ['Продукт', [['Чаты и каналы', '#feature-0'], ['Звонки', '#feature-1'], ['Задачи', '#feature-2'], ['Ассистент', '#assistant'], ['Админка', '#feature-3']]],
    ['Примеры', ['Юристам', 'Производству', 'Клиникам', 'Стройке', 'Холдингам'].map(x => [x, '#examples'])],
    ['Документы', [['Спецификация для ИБ'], ['Требования к железу', '#installation'], ['Документация'], ['Реестр российского ПО']]],
    ['Контакты', [['Запросить демо', '#demo'], ['Интеграторам', '#demo'], ['Почта, телефон'], ['Вакансии']]],
  ]
  return <footer className="pa-footer"><div className="pa-container"><div className="pa-footer-inner"><div className="pa-footer-top"><div className="pa-footer-brand"><a href="#top">MESSENGER</a><p>Корпоративный мессенджер ассистентом. Работает на вашем сервере, для компаний любого размера.</p><button className="pa-store-link" type="button" onClick={() => showNotice('Приложения')} aria-label="Приложения в RuStore и App Store"><img src={`${assets}app-stores.png`} width="92" height="40" alt="RuStore и App Store" /></button></div>
    <div className="pa-footer-columns">{columns.map(([title, links]) => <div key={title}><p className="pa-mono">{title}</p>{links.map(([label, href]) => href ? <a key={label} href={href}>{label}</a> : <button key={label} type="button" onClick={() => showNotice(label)}>{label}</button>)}</div>)}</div></div>
    <div className="pa-footer-bottom"><span>Юрлицо, ИНН · 2026</span><div><button type="button" onClick={() => showNotice('Политика обработки персональных данных')}>Политика обработки персональных данных</button><button type="button" onClick={() => showNotice('Пользовательское соглашение')}>Пользовательское соглашение</button></div></div>
    </div></div></footer>
}
function PlatformAIPage() {
  const [employees, setEmployees] = useState(25)
  const [notice, setNotice] = useState({ title: '', text: '' })
  const dialog = useRef(null)
  useEffect(() => setupScrollAnimations(), [])
  function showNotice(title, text = 'Это презентация дизайна. Этот раздел продукта пока не подключён.') { setNotice({ title, text }); dialog.current.showModal() }
  return <div className="pa-page"><Header showNotice={showNotice} /><main><ProjectHero /><IntegrationsSection /><FeaturesSection /><AssistantSection /><UseCasesSection /><DataSection showNotice={showNotice} /><InstallationSection /><PricingSection employees={employees} setEmployees={setEmployees} /><ComparisonSection /><FAQSection /><DemoSection employees={employees} showNotice={showNotice} /></main><Footer showNotice={showNotice} />
    <dialog ref={dialog} className="pa-notice" aria-labelledby="pa-notice-title" onClick={e => { if (e.target === dialog.current) dialog.current.close() }}><h3 id="pa-notice-title">{notice.title}</h3><p>{notice.text}</p><form method="dialog"><button className="pa-button">Понятно</button></form></dialog>
  </div>
}
createRoot(document.getElementById('root')).render(<StrictMode><PlatformAIPage /></StrictMode>)
