# 📊 Sistema Analytics - Documentazione Tecnica

## 🏗️ Architettura

Il sistema di analytics è composto da 3 file principali:

### 1. `gtag.ts` - Core Analytics
Gestisce la configurazione e gli eventi di Google Analytics.

**Funzioni principali:**
- `pageview()` - Traccia visualizzazioni pagina
- `event()` - Invia eventi personalizzati
- `trackButtonClick()` - Traccia click sui bottoni
- `trackModalOpen/Close()` - Traccia apertura/chiusura modal
- `trackFormSubmission()` - Traccia submit form
- `trackSocialShare()` - Traccia condivisioni social
- `trackSubscription()` - Traccia conversioni iscrizione

### 2. `useAnalytics.ts` - Hooks Personalizzati
Fornisce hook React per tracking avanzato.

**Hook disponibili:**
- `useScrollTracking()` - Traccia scroll depth e tempo su pagina
- `useSectionTracking()` - Traccia quando le sezioni entrano nel viewport
- `usePageTracking()` - Traccia navigazione e tempo per pagina

### 3. `layout.tsx` - Configurazione Globale
Carica Google Analytics in modo ottimizzato usando `next/script`.

## 🎯 Eventi Tracciati

### Button Clicks
```typescript
trackButtonClick(buttonName: string, location: string)
```

**Esempi:**
- `"Scopri il prodotto di oggi"` da `"Hero Section"`
- `"Come funziona"` da `"Header Desktop"`
- `"Iscriviti gratuitamente"` da `"CTA Section"`

### Modal Events
```typescript
trackModalOpen(modalType: string)
trackModalClose(modalType: string)
```

**Tipi:** `"subscribe"`, `"share"`

### Form Tracking
```typescript
trackFormSubmission(formType: string, success: boolean)
trackSubscription(method: 'email' | 'phone' | 'both')
```

### Social Sharing
```typescript
trackSocialShare(platform: string)
```

**Piattaforme:** WhatsApp, Telegram, Facebook, Twitter, LinkedIn, Email, Copy Link

### Engagement
```typescript
// Automatico con useScrollTracking()
event('scroll', 'engagement', '25%', 25)  // Milestone scroll
event('time_on_page', 'engagement', 'seconds', 120)  // Tempo speso
```

### Section Views
```typescript
// Automatico con useSectionTracking()
trackPageSection(sectionName: string)
```

**Sezioni tracciati:**
- `"hero"`, `"features"`, `"how-it-works"`, `"showcase"`, `"cta"`

## 📈 Struttura Dati GA4

### Eventi Standard
```json
{
  "event_name": "click",
  "event_category": "button", 
  "event_label": "Scopri il prodotto di oggi - Hero Section",
  "page_location": "https://1ognigiorno.com/",
  "page_title": "1OgniGiorno"
}
```

### Conversioni
```json
{
  "event_name": "subscribe",
  "event_category": "conversion",
  "event_label": "email",
  "value": 1
}
```

### Engagement
```json
{
  "event_name": "scroll",
  "event_category": "engagement", 
  "event_label": "50%",
  "value": 50
}
```

## 🔧 Implementazione nei Componenti

### Pages (Homepage, How)
```typescript
"use client";

import { useScrollTracking, useSectionTracking, usePageTracking } from "./lib/useAnalytics";

export default function Page() {
  // Analytics tracking
  useScrollTracking();
  usePageTracking('homepage');
  
  const heroRef = useSectionTracking('hero');
  const featuresRef = useSectionTracking('features');
  
  return (
    <div>
      <section ref={heroRef}>...</section>
      <section ref={featuresRef}>...</section>
    </div>
  );
}
```

### Components (Header, Buttons)
```typescript
import { trackButtonClick, trackModalOpen } from "../lib/gtag";

const handleClick = () => {
  trackButtonClick('Button Name', 'Location');
  // ... resto della logica
};

const openModal = () => {
  trackModalOpen('modal-type');
  setIsModalOpen(true);
};
```

## ⚡ Performance e Ottimizzazioni

### Lazy Loading
Google Analytics viene caricato con `strategy="afterInteractive"` per non bloccare il rendering iniziale.

### Debouncing
Lo scroll tracking usa `passive: true` per performance ottimali.

### Memory Management
Gli observer vengono disconnessi dopo il primo trigger per evitare memory leaks.

### Error Handling
Tutti gli eventi sono wrapped in `try/catch` e verificano `window.gtag`.

## 🧪 Testing e Debug

### Debug Mode
Per testare in development:

```javascript
// Nel browser console
window.gtag('config', 'GA_TRACKING_ID', {
  debug_mode: true
});
```

### Real-Time Testing
1. Vai su GA4 → **Realtime** → **Events**
2. Interagisci con il sito
3. Verifica che gli eventi appaiano in tempo reale

### Event Validation
```javascript
// Nel browser console per vedere tutti gli eventi
window.dataLayer
```

## 🚀 Estensioni Future

### Heatmaps
Il sistema è pronto per integrare:
- **Hotjar** per heatmaps visive
- **Microsoft Clarity** per session recordings

### A/B Testing
Struttura pronta per:
```typescript
trackEvent('ab_test', 'variant_a', 'hero_button_color');
```

### Enhanced E-commerce
Per tracking vendite future:
```typescript
trackPurchase(productId: string, value: number, currency: string)
```

### Custom Dimensions
```typescript
// User properties
gtag('config', GA_TRACKING_ID, {
  custom_map: {
    'user_type': 'dimension1',
    'signup_method': 'dimension2'
  }
});
```

## 📊 Metriche Chiave da Monitorare

### Conversion Funnel
1. **Page View** → **Hero View** (95%+)
2. **Hero View** → **CTA Click** (5-15%)
3. **CTA Click** → **Modal Open** (80%+)
4. **Modal Open** → **Form Submit** (30-50%)
5. **Form Submit** → **Success** (95%+)

### Engagement Metrics
- **Average Scroll Depth**: target > 60%
- **Time on Page**: target > 90 secondi
- **Bounce Rate**: target < 60%
- **Pages per Session**: target > 1.3

### Performance Indicators
- **Real Users Metrics (RUM)**
- **Core Web Vitals**
- **Page Load Times**

---

**Sistema completo e production-ready per analytics avanzati! 🚀** 