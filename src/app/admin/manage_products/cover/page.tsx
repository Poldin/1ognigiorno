"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import Image from "next/image";
import ImageUpload from "../components/ImageUpload";
import { Tables } from "@/app/lib/database.types";

type CoverItem = Tables<'products_cover_items'>;

interface CoverItemForm {
  id?: string;
  name: string;
  image_url: string | null;
  is_public: boolean;
}

export default function CoverManagePage() {
  const [coverItems, setCoverItems] = useState<CoverItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CoverItemForm | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch cover items
  const fetchCoverItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/cover-items');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch cover items');
      }

      setCoverItems(data.coverItems || []);
    } catch (err) {
      console.error('Error fetching cover items:', err);
      setError(err instanceof Error ? err.message : 'Failed to load cover items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverItems();
  }, []);

  // Open modal for new item
  const handleAddNew = () => {
    setEditingItem({
      name: '',
      image_url: null,
      is_public: true,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (item: CoverItem) => {
    setEditingItem({
      id: item.id,
      name: item.name || '',
      image_url: item.image_url,
      is_public: item.is_public ?? true,
    });
    setIsModalOpen(true);
  };

  // Save item (create or update)
  const handleSave = async () => {
    if (!editingItem || !editingItem.name.trim()) {
      alert('Nome è richiesto');
      return;
    }

    setSaving(true);
    try {
      const url = '/api/admin/cover-items';
      const method = editingItem.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save cover item');
      }

      await fetchCoverItems();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving cover item:', err);
      alert(err instanceof Error ? err.message : 'Failed to save cover item');
    } finally {
      setSaving(false);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo elemento?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/cover-items?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete cover item');
      }

      await fetchCoverItems();
    } catch (err) {
      console.error('Error deleting cover item:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete cover item');
    }
  };

  // Toggle public status
  const handleTogglePublic = async (item: CoverItem) => {
    try {
      const response = await fetch('/api/admin/cover-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          is_public: !item.is_public,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update cover item');
      }

      await fetchCoverItems();
    } catch (err) {
      console.error('Error toggling public status:', err);
      alert(err instanceof Error ? err.message : 'Failed to update cover item');
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestisci Cover</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse">
              <div className="aspect-[3/4] bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchCoverItems}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestisci Cover</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Aggiungi Cover
        </button>
      </div>

      {/* Cover Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coverItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Image */}
            <div className="aspect-[3/4] bg-gray-100 relative">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name || 'Cover item'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Nessuna immagine
                </div>
              )}
              
              {/* Public/Private indicator */}
              <div className="absolute top-2 left-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.is_public
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.is_public ? 'Pubblico' : 'Privato'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.name || 'Senza nome'}
              </h3>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleTogglePublic(item)}
                  className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    item.is_public
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.is_public ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  {item.is_public ? 'Pubblico' : 'Privato'}
                </button>
                
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {coverItems.length === 0 && (
        <div className="text-center py-12">
          <Image 
            src="/placeholder-image.svg" 
            alt="No items" 
            width={120} 
            height={120} 
            className="mx-auto mb-4 opacity-50"
          />
          <p className="text-gray-500 mb-4">Nessun elemento cover trovato</p>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Aggiungi il primo elemento
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingItem.id ? 'Modifica Cover' : 'Nuova Cover'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Inserisci il nome del cover"
                />
              </div>

              {/* Image Upload */}
              <ImageUpload
                currentImageUrl={editingItem.image_url}
                onImageChange={(imageUrl) => setEditingItem({ ...editingItem, image_url: imageUrl })}
                disabled={saving}
              />

              {/* Public Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Stato di pubblicazione
                </label>
                <button
                  type="button"
                  onClick={() => setEditingItem({ ...editingItem, is_public: !editingItem.is_public })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    editingItem.is_public ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingItem.is_public ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Status Text */}
              <p className="text-sm text-gray-600">
                {editingItem.is_public 
                  ? 'Questo elemento sarà visibile sul sito' 
                  : 'Questo elemento sarà nascosto dal sito'
                }
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 bg-gray-50 border-t">
              <button
                onClick={handleCloseModal}
                disabled={saving}
                className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Annulla
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingItem.name.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <Save className="h-4 w-4" />
                {saving ? 'Salvando...' : 'Salva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}