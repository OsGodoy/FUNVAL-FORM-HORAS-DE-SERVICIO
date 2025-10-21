import { useState } from 'react'
import Cards from '../shared/Cards'
import { Link, NavLink } from 'react-router-dom'

const coursesData = [
  {
    id: 1,
    title: 'Instituto',
    progress: 46,
    url: '',
    image:
      'https://www.estudiantefunval.org/pluginfile.php/91/course/overviewfiles/Instituto.png',
  },
  {
    id: 2,
    title: 'Front End',
    progress: 100,
    url: '',
    image:
      'https://www.estudiantefunval.org/pluginfile.php/88409/course/overviewfiles/FRONTEND%202.png',
  },
  {
    id: 3,
    title: 'Servicio',
    progress: 0,
    url: '/services-hours',
    image:
      'https://www.estudiantefunval.org/pluginfile.php/92/course/overviewfiles/requerimiento%20de%20nivel.png',
  },
  {
    id: 4,
    title: 'Valores ',
    progress: 0,
    url: '',
    image:
      'https://www.estudiantefunval.org/pluginfile.php/128/course/overviewfiles/Valores.png',
  },
]

export default function Courses() {
  const [search, setSearch] = useState('')

  const filteredCourses = coursesData.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="p-8 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Bienvenido @usuario</h2>

      {/*Filters Section*/}
      <div className="bg-white p-10 rounded-md shadow-sm mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">
          Vista general de curso
        </h2>

        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <select className="border rounded-md px-3 py-1 text-gray-600">
            <option>Todos</option>
            <option>Completados</option>
            <option>En progreso</option>
          </select>

          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-1 text-gray-600 flex-1 min-w-[150px]"
          />

          <select className="border rounded-md px-3 py-1 text-gray-600">
            <option>Ordenar por nombre del curso</option>
            <option>Por progreso</option>
          </select>

          <select className="border rounded-md px-3 py-1 text-gray-600">
            <option>Tarjeta</option>
            <option>Lista</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid py-8 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            /* Card */
            <Link key={course.id} to={course.url}>
              <Cards
                title={course.title}
                srcImage={course.image}
                progress={course.progress}
                id={course.id}
              />
            </Link>
          ))}

          {filteredCourses.length === 0 && (
            <p className="col-span-full text-gray-500 text-center py-8">
              No se encontraron cursos.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
