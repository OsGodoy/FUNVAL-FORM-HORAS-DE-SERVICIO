import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getFunval } from "../api/funval/services";
import { menu } from "framer-motion/client";
import toast from "react-hot-toast";

export default function PermissionsPage() {
  const [menuData, setMenuData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [expanded, setExpanded] = useState({});

  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false)

  const getRoles = async () => {
    setIsLoadingRoles(true);
    try {
      const response = await getFunval("/roles");
      setRoles(response.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Error al cargar los roles");
    } finally {
      setIsLoadingRoles(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("menuItems");
    if (stored) {
      setMenuData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    getRoles()
  }, []);

  const toggleExpand = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleRole = (item) => {
    setMenuData((prev) =>
      prev.map((menu) => updateRoles(menu, item.name, selectedRole))
    );
  };

  const updateRoles = (menu, targetName, role) => {
    const hasChildren = menu.children && menu.children.length > 0;

    if (menu.name === targetName) {
      const isSelected = menu.roles.includes(role);
      const newRoles = isSelected
        ? menu.roles.filter((r) => r !== role)
        : [...menu.roles, role];

      if (hasChildren) {
        return {
          ...menu,
          roles: newRoles,
          children: menu.children.map((child) =>
            toggleChildrenRoles(child, role, !isSelected)
          ),
        };
      }

      return { ...menu, roles: newRoles };
    }

    if (hasChildren) {
      const updatedChildren = menu.children.map((child) =>
        updateRoles(child, targetName, role)
      );

      const anyChildSelected = updatedChildren.some((child) =>
        child.roles.includes(role)
      );

      const newRoles = anyChildSelected
        ? [...new Set([...menu.roles, role])]
        : menu.roles.filter((r) => r !== role);

      return { ...menu, roles: newRoles, children: updatedChildren };
    }

    return menu;
  };

  
  const toggleChildrenRoles = (menu, role, select) => {
    const newRoles = select
      ? [...new Set([...menu.roles, role])]
      : menu.roles.filter((r) => r !== role);

    if (menu.children && menu.children.length > 0) {
      return {
        ...menu,
        roles: newRoles,
        children: menu.children.map((child) =>
          toggleChildrenRoles(child, role, select)
        ),
      };
    }

    return { ...menu, roles: newRoles };
  };

  const renderTree = (items) => {
    return items.map((item) => {
      const IconComponent = Icons[item.icon] || Icons.Circle;
      const isSelected = item.roles.includes(selectedRole);
      const hasChildren = item.children && item.children.length > 0;

      if (showOnlySelected && !isSelected) return null;

      return (
        <div key={item.name} className="ml-4 mt-2">
          <div
            className={`flex items-center justify-between cursor-pointer rounded-lg p-2 transition ${isSelected
              ? "bg-blue-50 border border-blue-200"
              : "hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(item.name)}
                  className="focus:outline-none text-gray-600 hover:text-gray-800"
                >
                  {expanded[item.name] ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
              )}
              <IconComponent
                size={18}
                className={`${isSelected ? "text-blue-600" : "text-gray-500"
                  } transition`}
              />
              <span
                onClick={() => toggleRole(item)}
                className={`font-medium ${isSelected ? "text-blue-700" : "text-gray-700"
                  }`}
              >
                {item.name}
              </span>
            </div>

            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleRole(item)}
              className="cursor-pointer accent-blue-600"
            />
          </div>

          {hasChildren && expanded[item.name] && (
            <div className="ml-6 border-l border-gray-300 pl-3">
              {renderTree(item.children)}
            </div>
          )}
        </div>
      );
    });
  };

  const handleAssign = () => {
    const storedMenus = JSON.parse(localStorage.getItem("menuItems")) || [];

    const syncMenus = (storedList, currentList) => {
      return currentList.map((menu) => {
        const existing = storedList.find((m) => m.name === menu.name);

        let updatedRoles = existing ? [...existing.roles] : [];

        if (menu.roles.includes(selectedRole)) {
          if (!updatedRoles.includes(selectedRole)) {
            updatedRoles.push(selectedRole);
          }
        } else {
          updatedRoles = updatedRoles.filter((r) => r !== selectedRole);
        }

        const updatedChildren = menu.children
          ? syncMenus(existing?.children || [], menu.children)
          : [];

        return {
          ...menu,
          roles: updatedRoles,
          children: updatedChildren,
        };
      });
    };

    const updatedMenus = syncMenus(storedMenus, menuData);

    localStorage.setItem("menuItems", JSON.stringify(updatedMenus));

    toast.success(`Permisos actualizados para el rol ${selectedRole.toUpperCase()}`);
    setTimeout(() => {
      const t = toast.loading("Actualizando vista...");
      setTimeout(() => {
        toast.dismiss(t);
        window.location.reload();
      }, 1000); 
    }, 400);
  };

  if (isLoadingRoles) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Gestión de Permisos
        </h2>
        <p className="text-gray-500">Cargando roles...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Gestión de Permisos
      </h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex gap-4 items-center flex-wrap">
          <label className="font-medium text-gray-700">Seleccionar Rol:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
          >
            {
              roles.map((role) => (<option key={role.id} value={role.name.toLowerCase()}>{role.name}</option>))
            }
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showOnlySelected}
              onChange={() => setShowOnlySelected(!showOnlySelected)}
              className="cursor-pointer accent-blue-600"
            />
            Mostrar solo seleccionados
          </label>
        </div>

        <button
          onClick={handleAssign}
          className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Asignar
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
        {menuData.length > 0 ? (
          renderTree(menuData)
        ) : (
          <p className="text-gray-500 text-sm">No hay datos.</p>
        )}
      </div>
    </div>
  );
}
