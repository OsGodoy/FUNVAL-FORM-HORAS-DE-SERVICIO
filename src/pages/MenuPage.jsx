import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, PlusCircle } from 'lucide-react'
import DataTable from '../components/shared/DataTable'
import {
  getFunval,
  postFunval,
  putFunval,
  deleteFunval,
} from '../api/funval/services'
import toast, { Toaster } from 'react-hot-toast'
import ConfirmDialog from '../components/shared/ConfirmDialog'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [expandedRows, setExpandedRows] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)

  /* Sesion storage Read */
  useEffect(() => {
    try {
      const storedMenus = JSON.parse(localStorage.getItem('menuItems')) || []
      setMenuItems(storedMenus)
    } catch (error) {
      console.error('Error al leer menuItems del localStorage:', error)
      toast.error('Error al cargar los menús almacenados')
    }
  }, [])

  const flattenMenus = (menus) => {
    const flat = []
    menus.forEach((item) => {
      flat.push({
        ...item,
        parent: null,
        type: 'Menú',
      })
      if (Array.isArray(item.children)) {
        item.children.forEach((child) => {
          flat.push({
            ...child,
            parent: item.name,
            type: 'Submenú',
          })
        })
      }
    })
    return flat
  }

  const updateStorage = (data) => {
    setMenuItems(data)
    localStorage.setItem('menuItems', JSON.stringify(data))
  }

  const toggleExpand = (name) => {
    setExpandedRows((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleEdit = (item) => {
    setSelectedCategory(item)
    setShowForm(true)
  }

  const handleCreate = () => {
    setSelectedItem(null)
    setShowForm(true)
  }

  const handleDelete = async () => {
    try {
      await deleteFunval(`/categories/${idCategoryToDelete}`)
      toast.success('Categoría eliminada correctamente')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Error al eliminar la categoría')
    }
  }

  const handleDeleteConfirm = (id) => {
    setIdToDelete(id)
    setConfirmDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (idCategoryToDelete) {
      await handleDelete()
      setConfirmDialogOpen(false)
      setIdCategoryToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false)
    setIdToDelete(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const description = form.description.value.trim()

    if (!name) {
      toast.error('El nombre es obligatorio')
      return
    }

    try {
      if (selectedCategory) {
        await putFunval(`/categories/${selectedCategory.id}`, {
          name,
          description,
        })
        toast.success('Categoría actualizada correctamente')
      } else {
        await postFunval('/categories', { name, description })
        toast.success('Categoría creada con éxito')
      }

      setShowForm(false)
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Error al guardar la categoría')
    }
  }

  const flatData = flattenMenus(menuItems).map((item, idx) => ({
    id: idx + 1,
    name: item.name,
    description: item.description,
    url: item.url || '—',
    roles: item.roles?.join(', ') || '—',
    type: item.type,
    parent: item.parent || '—',
    status: item.deleted ? 'Eliminado' : item.status ? 'Activo' : 'Inactivo',
    deleted: item.deleted,
  }))

  return (
    <div className="flex flex-col gap-6 p-6">
      <Toaster position="top-right" />

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Menus</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreate}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Agregar Menu
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          headers={[
            { key: 'name', label: 'Nombre' },
            { key: 'description', label: 'Descripción' },
            { key: 'url', label: 'URL' },
            { key: 'type', label: 'Tipo' },
            {
              key: 'actions',
              aling: 'center',
              label: 'Acciones',
              render: (row) => (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(row)}
                    className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirm(row.id)}
                    className="text-red-600 hover:text-red-800 transition cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ),
            },
          ]}
          data={flatData}
          pageSize={5}
        />
      </motion.div>

      <ConfirmDialog
        title="¿Estás seguro?"
        description="Esta acción no se puede deshacer."
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <AnimatePresence>
        {showForm && (
          <motion.div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {selectedCategory
                  ? 'Editar Categoría'
                  : 'Crear Nueva Categoría'}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  name="name"
                  placeholder="Nombre"
                  defaultValue={selectedCategory?.name || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
                <input
                  name="description"
                  placeholder="Descripción"
                  defaultValue={selectedCategory?.description || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {selectedCategory ? 'Modificar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
