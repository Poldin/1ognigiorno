/**
 * Calcola il numero del giorno da mostrare nell'applicazione
 * 
 * Attualmente restituisce il giorno del mese corrente,
 * ma può essere esteso per implementare una logica di pianificazione personalizzata
 */
export function getDayNumber(): number {
  return new Date().getDate();
} 