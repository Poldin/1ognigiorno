"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import ImageUpload from "../components/ImageUpload";
import { Tables } from "@/app/lib/database.types";

type Category = Tables<'products_categories'>;
type CategoryItem = Tables<'products_categories_items'>;

interface CategoryWithItems extends Category {
  items: CategoryItem[];
}

interface CategoryForm {
  id?: string;
  name: string;
  is_public: boolean;
}

interface CategoryItemForm {
  id?: string;
  name: string;
  image_url: string | null;
  is_public: boolean;
  category_id: string;
  description: string;
}

export default function CategoriesManagePage() {
  const [categories, setCategories] = useState<CategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'category' | 'item'>('category');
  const [editingCategory, setEditingCategory] = useState<CategoryForm | null>(null);
  const [editingItem, setEditingItem] = useState<CategoryItemForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [initializedDesktopExpand, setInitializedDesktopExpand] = useState(false);

  // Fetch categories with items
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/categories');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch categories');
      }

      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // On desktop only, expand all categories by default on first load
  useEffect(() => {
    if (initializedDesktopExpand || categories.length === 0) return;
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop) {
      setExpandedCategories(new Set(categories.map((c) => c.id)));
    }
    setInitializedDesktopExpand(true);
  }, [initializedDesktopExpand, categories]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Auto-size description textarea when the modal opens or text changes
  useEffect(() => {
    if (isModalOpen && modalType === 'item' && descriptionRef.current) {
      const el = descriptionRef.current;
      // Reset then grow up to 60% of viewport height
      el.style.height = 'auto';
      const maxPx = Math.floor(window.innerHeight * 0.6);
      el.style.height = `${Math.min(el.scrollHeight, maxPx)}px`;
    }
  }, [isModalOpen, modalType, editingItem?.description]);

  // Category management
  const handleAddCategory = () => {
    setEditingCategory({
      name: '',
      is_public: true,
    });
    setModalType('category');
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory({
      id: category.id,
      name: category.name || '',
      is_public: category.is_public ?? true,
    });
    setModalType('category');
    setIsModalOpen(true);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      alert('Nome è richiesto');
      return;
    }

    setSaving(true);
    try {
      const url = '/api/admin/categories';
      const method = editingCategory.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save category');
      }

      await fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (err) {
      console.error('Error saving category:', err);
      alert(err instanceof Error ? err.message : 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa categoria e tutti i suoi prodotti?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }

      await fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete category');
    }
  };

  const handleToggleCategoryPublic = async (category: Category) => {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: category.id,
          is_public: !category.is_public,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update category');
      }

      // Update only the specific category in state
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === category.id 
            ? { ...cat, is_public: !cat.is_public }
            : cat
        )
      );
    } catch (err) {
      console.error('Error toggling category public status:', err);
      alert(err instanceof Error ? err.message : 'Failed to update category');
    }
  };

  // Category item management
  const handleAddItem = (categoryId: string) => {
    setEditingItem({
      name: '',
      image_url: null,
      is_public: true,
      category_id: categoryId,
      description: '',
    });
    setModalType('item');
    setIsModalOpen(true);
  };

  const handleEditItem = (item: CategoryItem) => {
    setEditingItem({
      id: item.id,
      name: item.name || '',
      image_url: item.image_url,
      is_public: item.is_public ?? true,
      category_id: item.category_id || '',
      description: item.description || '',
    });
    setModalType('item');
    setIsModalOpen(true);
  };

  const handleSaveItem = async () => {
    if (!editingItem || !editingItem.name.trim()) {
      alert('Nome è richiesto');
      return;
    }

    setSaving(true);
    try {
      const url = '/api/admin/category-items';
      const method = editingItem.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save item');
      }

      await fetchCategories();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving item:', err);
      alert(err instanceof Error ? err.message : 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/category-items?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete item');
      }

      await fetchCategories();
    } catch (err) {
      console.error('Error deleting item:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  const handleToggleItemPublic = async (item: CategoryItem) => {
    try {
      const response = await fetch('/api/admin/category-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          is_public: !item.is_public,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update item');
      }

      // Update only the specific item in the specific category
      setCategories(prevCategories => 
        prevCategories.map(category => ({
          ...category,
          items: category.items.map(categoryItem => 
            categoryItem.id === item.id 
              ? { ...categoryItem, is_public: !categoryItem.is_public }
              : categoryItem
          )
        }))
      );
    } catch (err) {
      console.error('Error toggling item public status:', err);
      alert(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestisci Categorie</h1>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse">
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="border rounded-lg">
                      <div className="aspect-[3/4] bg-gray-200"></div>
                      <div className="p-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
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
          onClick={fetchCategories}
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
        <h1 className="text-2xl font-bold text-gray-900">Gestisci Categorie</h1>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Aggiungi Categoria
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border">
            {/* Category Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedCategories.has(category.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                  
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name || 'Senza nome'}
                  </h3>
                  
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      category.is_public
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.is_public ? 'Pubblico' : 'Privato'}
                  </span>
                  
                  <span className="text-sm text-gray-500">
                    ({category.items.length} prodotti)
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleCategoryPublic(category)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      category.is_public
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.is_public ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Items */}
            {expandedCategories.has(category.id) && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Prodotti</h4>
                  <button
                    onClick={() => handleAddItem(category.id)}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Aggiungi Prodotto
                  </button>
                </div>

                {category.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.items.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        {/* Item Image */}
                        <div className="aspect-[3/4] bg-gray-100 relative">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.name || 'Product'}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
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

                        {/* Item Content */}
                        <div className="p-3">
                          <h5 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                            {item.name || 'Senza nome'}
                          </h5>
                          
                          {/* Item Actions */}
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleToggleItemPublic(item)}
                              className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                                item.is_public
                                  ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {item.is_public ? <Eye className="h-3 w-3 mx-auto" /> : <EyeOff className="h-3 w-3 mx-auto" />}
                            </button>
                            
                            <button
                              onClick={() => handleEditItem(item)}
                              className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-2">Nessun prodotto in questa categoria</p>
                    <button
                      onClick={() => handleAddItem(category.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Aggiungi il primo prodotto
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nessuna categoria trovata</p>
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Aggiungi la prima categoria
          </button>
        </div>
      )}

      {/* Modal for Category */}
      {isModalOpen && modalType === 'category' && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingCategory.id ? 'Modifica Categoria' : 'Nuova Categoria'}
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
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Inserisci il nome della categoria"
                />
              </div>

              {/* Public Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Stato di pubblicazione
                </label>
                <button
                  type="button"
                  onClick={() => setEditingCategory({ ...editingCategory, is_public: !editingCategory.is_public })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    editingCategory.is_public ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingCategory.is_public ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Status Text */}
              <p className="text-sm text-gray-600">
                {editingCategory.is_public 
                  ? 'Questa categoria sarà visibile sul sito' 
                  : 'Questa categoria sarà nascosta dal sito'
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
                onClick={handleSaveCategory}
                disabled={saving || !editingCategory.name.trim()}
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

      {/* Modal for Category Item */}
      {isModalOpen && modalType === 'item' && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingItem.id ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 max-w-2xl"
                  placeholder="Inserisci il nome del prodotto"
                />
              </div>

              {/* Image Upload */}
              <ImageUpload
                currentImageUrl={editingItem.image_url}
                onImageChange={(imageUrl) => setEditingItem({ ...editingItem, image_url: imageUrl })}
                disabled={saving}
              />

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrizione
                </label>
                <textarea
                  ref={descriptionRef}
                  value={editingItem.description}
                  onChange={(e) => {
                    setEditingItem({ ...editingItem, description: e.target.value });
                    // Auto-grow height while typing
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    const maxPx = Math.floor(window.innerHeight * 0.6);
                    el.style.height = `${Math.min(el.scrollHeight, maxPx)}px`;
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none min-h-28 max-h-[60vh] overflow-auto"
                  placeholder="Inserisci la descrizione del prodotto (opzionale)"
                />
              </div>

              {/* Public Toggle */}
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">
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
                  ? 'Questo prodotto è visibile sul sito' 
                  : 'Questo prodotto è nascosto dal sito'
                }
              </p>

              {/* Footer */}
              <div className="flex gap-3 pt-6 border-t mt-6">
              <button
                onClick={handleCloseModal}
                disabled={saving}
                className="w-fit px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveItem}
                disabled={saving || !editingItem.name.trim()}
                className="w-fit flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <Save className="h-4 w-4" />
                {saving ? 'Salvando...' : 'Salva'}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}