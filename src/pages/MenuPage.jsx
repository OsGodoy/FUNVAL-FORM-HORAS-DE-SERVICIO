import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, PlusCircle } from 'lucide-react'
import DataTable from '../components/shared/DataTable'
import toast, { Toaster } from 'react-hot-toast'
import ConfirmDialog from '../components/shared/ConfirmDialog'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    const storedMenus = JSON.parse(localStorage.getItem('menuItems')) || []
    setMenuItems(storedMenus)
  }, [])

  const updateStorage = (data) => {
    setMenuItems(data)
    localStorage.setItem('menuItems', JSON.stringify(data))
  }

  // Flatten con parentName
  const flattenMenus = (menus, parentName = null) => {
    let flat = []
    menus.forEach((item) => {
      const newItem = { ...item, parentName }
      flat.push(newItem)
      if (item.children?.length) {
        flat.push(...flattenMenus(item.children, item.name))
      }
    })
    return flat
  }

  const handleCreate = () => {
    setSelectedItem(null)
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowForm(true)
  }

  const handleDeleteConfirm = (item) => {
    setItemToDelete(item)
    setConfirmDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    const filtered = menuItems.filter(
      (item) => item.name !== itemToDelete.name
    )
    updateStorage(filtered)
    setConfirmDialogOpen(false)
    setItemToDelete(null)
    toast.success('Item de menú eliminado correctamente')
  }

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false)
    setItemToDelete(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const description = form.description.value.trim()
    const parentName = form.parent.value || null
    const icon = form.icon.value.trim() || '—'
    const url = form.url.value.trim() || '—'
    const order = parseInt(form.order.value) || 0

    if (!name) {
      toast.error('El nombre es obligatorio')
      return
    }

    if (selectedItem) {
      // Editar
      const updated = menuItems.map((item) =>
        item.name === selectedItem.name
          ? { ...item, name, description, parentName, icon, url, order }
          : item
      )
      updateStorage(updated)
      toast.success('Item de menú actualizado correctamente')
    } else {
      // Crear nuevo
      const newItem = {
        name,
        description,
        parentName,
        icon,
        url,
        order,
        status: true,
        deleted: false,
        children: [],
      }

      // Si es hijo
      if (parentName) {
        const updated = menuItems.map((item) =>
          item.name === parentName
            ? { ...item, children: [...(item.children || []), newItem] }
            : item
        )
        updateStorage(updated)
      } else {
        updateStorage([...menuItems, newItem])
      }

      toast.success('Item de menú creado correctamente')
    }

    setShowForm(false)
    setSelectedItem(null)
  }

  const flatMenus = flattenMenus(menuItems)
  const flatData = flatMenus
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item) => ({
      name: item.name,
      description: item.description,
      url: item.url || '—',
      icon: item.icon || '—',
      parent: item.parentName || '—',
      order: item.order || 0,
      status: item.deleted ? 'Eliminado' : item.status ? 'Activo' : 'Inactivo',
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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Menús</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Agregar Menú
        </motion.button>
      </motion.div>

      <DataTable
        headers={[
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' },
          { key: 'icon', label: 'Icono', icon: true },
          { key: 'url', label: 'URL' },
          { key: 'parent', label: 'Padre' },
          { key: 'order', label: 'Orden' },
          {
            key: 'actions',
            label: 'Acciones',
            aling: 'center',
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
                  onClick={() => handleDeleteConfirm(row)}
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
        pageSize={10}
      />

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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
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
                {selectedItem ? 'Editar Item de menú' : 'Crear Nuevo Item de menú'}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <select
                  name="parent"
                  defaultValue={selectedItem?.parent || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">— Sin padre —</option>
                  {menuItems
                    .filter((item) => !item.parentName)
                    .map((item) => (
                      <option key={`opt-${item.name}`} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>

                <input
                  name="name"
                  placeholder="Nombre"
                  defaultValue={selectedItem?.name || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
                <input
                  name="description"
                  placeholder="Descripción"
                  defaultValue={selectedItem?.description || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  name="icon"
                  placeholder="Icono (ej: Home)"
                  defaultValue={selectedItem?.icon || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  name="url"
                  placeholder="URL"
                  defaultValue={selectedItem?.url || ''}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  name="order"
                  type="number"
                  placeholder="Orden"
                  defaultValue={selectedItem?.order || 0}
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
                    {selectedItem ? 'Modificar' : 'Guardar'}
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
