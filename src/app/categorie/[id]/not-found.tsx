export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-center text-white">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Categoria non trovata</h2>
        <p className="text-gray-400">La categoria richiesta non esiste o non è pubblica.</p>
      </div>
    </div>
  );
}


