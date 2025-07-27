# 🚀 Guida Completa Analytics per 1OgniGiorno

## 📊 Sistema di Analytics Implementato

Ho implementato un sistema completo di **Google Analytics 4 (GA4)** che traccia tutte le interazioni importanti del tuo sito.

## 🔧 Setup Iniziale

### 1. Creare un Account Google Analytics

1. Vai su [Google Analytics](https://analytics.google.com)
2. Clicca "Inizia gratuitamente"
3. Configura il tuo account:
   - **Nome account**: "1OgniGiorno"
   - **Nome proprietà**: "1OgniGiorno Website"
   - **Settore**: "E-commerce" o "Media e intrattenimento"
   - **Paese**: Italia

### 2. Configurare la Proprietà

1. Seleziona **GA4** (Google Analytics 4)
2. Crea un **Data Stream** per il sito web
3. Inserisci il tuo dominio (es. `1ognigiorno.com`)
4. Copia il **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 3. Configurare le Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Sostituisci `G-XXXXXXXXXX` con il tuo vero Measurement ID.

## 📈 Cosa Viene Tracciato

### 🎯 **Eventi Principali**

| Evento | Cosa Traccia | Dove |
|--------|--------------|------|
| **Button Clicks** | Tutti i click sui CTA | Hero, CTA sections, Header |
| **Modal Events** | Apertura/chiusura modal | Modal iscrizione e condivisione |
| **Form Submissions** | Iscrizioni email/telefono | Form di iscrizione |
| **Social Shares** | Condivisioni social | WhatsApp, Telegram, Facebook, ecc. |
| **Page Navigation** | Navigazione tra pagine | Home ↔ How |
| **Section Views** | Visualizzazione sezioni | Hero, Features, CTA, ecc. |
| **Scroll Depth** | Quanto l'utente scrolla | 25%, 50%, 75%, 90% |
| **Time on Page** | Tempo speso su ogni pagina | Tutte le pagine |

### 🔍 **Metriche Dettagliate**

#### Conversioni
- **Iscrizioni via email** 📧
- **Iscrizioni via telefono** 📱
- **Iscrizioni multiple** (email + telefono)

#### Engagement
- **Scroll depth** per capire quanto leggono
- **Tempo su ogni sezione**
- **Interazioni con i modal**
- **Click sui social share**

#### User Journey
- **Flusso di navigazione** Home → How → Home
- **Punti di abbandono**
- **Sezioni più visualizzate**

## 🚀 Come Analizzare i Dati

### 1. Dashboard Principali in GA4

#### **Real-Time Report**
- Vedi utenti attivi in tempo reale
- Cosa stanno facendo ora
- Da dove vengono

#### **Acquisition Report**
- Come gli utenti arrivano al sito
- Canali di traffico (organico, diretto, social)
- Performance delle campagne

#### **Engagement Report**
- Pagine più visualizzate
- Tempo medio per sessione
- Eventi più frequenti

#### **Conversions Report**
- Iscrizioni completate
- Tasso di conversione
- Funnel di conversione

### 2. Eventi Personalizzati da Monitorare

Vai in **Events** → **All events** per vedere:

```
🎯 button_click - Click sui CTA
📧 subscribe - Iscrizioni completate  
📱 modal_open - Apertura modal
🔗 social_share - Condivisioni social
👀 section_view - Visualizzazione sezioni
📊 scroll - Milestone di scroll
⏱️ time_on_page - Tempo speso
```

### 3. Creare Conversioni Personalizzate

1. Vai in **Configure** → **Conversions**
2. Clicca **"Create conversion event"**
3. Aggiungi questi eventi come conversioni:
   - `subscribe` (iscrizione completata)
   - `form_submit_success` (form completato con successo)

## 📊 Dashboard Consigliati

### **Dashboard Principale - Performance Generale**
- **Utenti attivi** giornalieri/settimanali
- **Visualizzazioni pagina** (Home vs How)
- **Tasso di conversione** (iscrizioni)
- **Fonti di traffico** principali

### **Dashboard Engagement**
- **Scroll depth** medio per pagina
- **Tempo medio** su ogni sezione
- **Eventi più frequenti**
- **Modal più aperti**

### **Dashboard Conversioni**
- **Funnel iscrizioni**: click CTA → apertura modal → compilazione → submit
- **Canali che convertono** di più
- **Orari migliori** per conversioni

## 🔧 Configurazioni Avanzate

### 1. Audience Personalizzate

Crea audience per:
- **Utenti Engaged**: scroll > 75% + tempo > 2 minuti
- **Interessati**: hanno aperto modal ma non si sono iscritti
- **Convertiti**: hanno completato iscrizione

### 2. Obiettivi e KPI

Monitora:
- **Tasso di conversione** target: 2-5%
- **Tempo medio** target: > 2 minuti
- **Scroll depth** target: > 50%
- **Engagement rate** target: > 30%

### 3. Alert Personalizzati

Configura alert per:
- **Calo improvviso** del traffico
- **Spike** nelle conversioni
- **Errori** nel form di iscrizione

## 📱 Utilizzo Pratico

### Per Ottimizzare il Marketing:
1. **Identifica** i canali che portano più conversioni
2. **Analizza** quali CTA performano meglio
3. **Ottimizza** le sezioni meno visualizzate
4. **A/B test** basati sui dati scroll

### Per Migliorare l'UX:
1. **Vedi** dove gli utenti abbandonano
2. **Ottimizza** sezioni con basso engagement
3. **Migliora** il funnel di iscrizione
4. **Testa** nuovi contenuti

### Per Content Strategy:
1. **Capire** quali sezioni interessano di più
2. **Identificare** gap nel contenuto
3. **Ottimizzare** per engagement
4. **Personalizzare** based on user behavior

## 🚀 Prossimi Passi

1. **Configura** Google Analytics con il tuo Measurement ID
2. **Testa** il tracking in modalità debug
3. **Crea** dashboard personalizzati
4. **Configura** conversioni e obiettivi
5. **Analizza** i primi dati dopo 1 settimana

## 🔥 Funzionalità Avanzate Incluse

- ✅ **Automatic page tracking**
- ✅ **Custom event tracking**
- ✅ **Scroll depth analysis**
- ✅ **Form conversion tracking**
- ✅ **Social sharing metrics**
- ✅ **User journey mapping**
- ✅ **Real-time engagement**
- ✅ **Performance optimization ready**

---

**Il tuo sistema di analytics è ora pronto per darti insights dettagliati su ogni aspetto del comportamento degli utenti su 1OgniGiorno! 🚀📊** 