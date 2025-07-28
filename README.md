# 1OgniGiorno 🚀

> **Trasforma ogni giorno in un successo** - La piattaforma che ogni giorno presenta un prodotto straordinario, lo racconta con passione e lo trasforma in un fenomeno virale.

## 📋 Cos'è 1OgniGiorno

1OgniGiorno è una piattaforma web innovativa che ogni giorno cambia completamente la sua interfaccia per presentare un nuovo prodotto o servizio. L'obiettivo è trasformare prodotti nascosti o sottovalutati in fenomeni virali attraverso storytelling coinvolgente e una community attiva.

### 🎯 Concept Principale

- **Un prodotto al giorno**: Every day at 10:00, a new product takes center stage
- **Interfaccia dinamica**: The homepage completely transforms to showcase the daily featured product
- **Storytelling virale**: Each product is presented through engaging content and authentic narratives
- **Community engagement**: A community of early adopters and influencers ready to discover and share

## 💼 Modello di Business

### Revenue Streams
1. **Featured Product Fees**: Companies pay to have their products featured as the "product of the day"
2. **Subscription Model**: Users subscribe to receive daily notifications and exclusive access
3. **Community Engagement**: Leveraging our engaged community for product validation and viral marketing

### Value Proposition
- **Per i Brand**: Trasformazione di prodotti in fenomeni virali attraverso esposizione mirata
- **Per gli Utenti**: Scoperta quotidiana di prodotti innovativi prima che diventino mainstream
- **Per la Community**: Accesso anticipato e influenza sui prossimi trend di mercato

## 🏗️ Struttura del Progetto

### Pagine Principali

#### `/` - Homepage (Pagina Core)
- **Funzione**: Landing page principale che cambia quotidianamente per presentare il prodotto del giorno
- **Sezioni**:
  - Hero Section con il prodotto featured
  - Features e benefici della piattaforma
  - Come funziona il processo
  - Product showcase
  - Call-to-action per iscrizioni

#### `/how` - Come Funziona
- **Funzione**: Pagina di supporto che spiega in dettaglio il processo e il modello della piattaforma
- **Obiettivo**: Educazione utenti e conversione

### Componenti Chiave
- **Header**: Navigazione principale
- **Footer**: Link utili e informazioni aziendali
- **Analytics Integration**: Tracking completo delle interazioni utente

## 🛠️ Stack Tecnologico

### Frontend
- **Next.js 14** - React framework con App Router
- **TypeScript** - Type safety e developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management e side effects

### Analytics & Tracking
- **Google Analytics 4** - Web analytics e user behavior tracking
- **Custom Analytics Hooks** - Scroll tracking, section tracking, page tracking
- **Event Tracking** - Button clicks e user interactions

### Deployment & Hosting
- **Vercel** - Hosting e continuous deployment
- **Git** - Version control

## 📁 Struttura File

```
1ognigiorno/
├── src/
│   └── app/
│       ├── components/          # Componenti riutilizzabili
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       ├── lib/                 # Utilities e configurazioni
│       │   ├── gtag.ts         # Google Analytics setup
│       │   └── useAnalytics.ts # Custom analytics hooks
│       ├── api/                # API routes
│       │   └── brevo/          # Email service integration
│       ├── how/                # Come funziona page
│       ├── page.tsx            # Homepage principale
│       ├── layout.tsx          # Root layout
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies
└── next.config.ts            # Next.js configuration
```

## 🚀 Getting Started

### Prerequisiti
- Node.js 18+
- npm o yarn

### Installazione
```bash
# Clona il repository
git clone [repository-url]

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

### Configurazione Analytics
1. Configura Google Analytics 4 in `src/app/lib/gtag.ts`
2. Aggiungi le variabili d'ambiente necessarie
3. Verifica il tracking nella Google Analytics dashboard

## 📈 Funzionalità Analytics

### Tracking Implementato
- **Page Views**: Tracciamento delle visualizzazioni di pagina
- **Scroll Tracking**: Monitoraggio dello scroll depth
- **Section Tracking**: Engagement per sezione della pagina
- **Button Clicks**: Tracking di tutte le CTA e interazioni
- **User Journey**: Mappatura del percorso utente

### Metriche Chiave
- Conversion rate delle iscrizioni
- Engagement rate per sezione
- Scroll depth medio
- Click-through rate sui CTA

## 🎨 Design System

### Principi di Design
- **Minimale e Pulito**: Focus sul prodotto del giorno
- **Responsive First**: Ottimizzato per tutti i dispositivi
- **Performance**: Caricamento veloce e smooth animations
- **Accessibilità**: Design inclusivo e accessibile

### Palette Colori
- **Primary**: Nero (#000000) per header e CTA principali
- **Secondary**: Gradients blue-to-purple per accenti
- **Background**: Bianco e grigi per leggibilità
- **Success**: Verde per conferme e check

## 🔄 Processo Quotidiano

1. **10:00 AM**: Nuovo prodotto va live
2. **Content Update**: Homepage si trasforma per il nuovo prodotto
3. **Community Notification**: Utenti iscritti ricevono notifica
4. **Engagement Tracking**: Monitoraggio real-time delle metriche
5. **Daily Report**: Analisi performance e preparazione prodotto successivo

## 📊 KPI e Metriche

### Metriche di Business
- Daily Active Users (DAU)
- Subscription conversion rate
- Product engagement rate
- Viral coefficient

### Metriche Tecniche
- Page load speed
- Mobile responsiveness score
- SEO performance
- Uptime e reliability

## 🤝 Contributing

Per contribuire al progetto:
1. Fork il repository
2. Crea un branch per la tua feature
3. Commit le modifiche
4. Push al branch
5. Crea una Pull Request

## 📞 Contatti

Per domande, collaborazioni o per far featured il tuo prodotto:
- Website: [1ognigiorno.com]
- Email: [contact@1ognigiorno.com]

---

**1OgniGiorno** - Dove ogni prodotto ha la sua giornata di gloria ✨
