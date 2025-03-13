import { useState } from "react"
import { Logger } from "/src/utils/Logger.jsx"
import { Button } from "/src/components/atoms/Form"

const logger = new Logger("FilterBar")

export const FilterBar = ({ onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    name: "",
    type: "",
    region: "",
    winery: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRating: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = () => {
    logger.info("Aplicando filtros:", localFilters)
    onFilterChange(localFilters)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-[#3d1308] text-black w-full max-w-xs">
      <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="region" placeholder="Región" value={localFilters.region} onChange={handleChange} className="p-2 border rounded" />
      <input type="text" name="winery" placeholder="Bodega" value={localFilters.winery} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="minPrice" placeholder="Precio mínimo" value={localFilters.minPrice} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="maxPrice" placeholder="Precio máximo" value={localFilters.maxPrice} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="minYear" placeholder="Año mínimo" value={localFilters.minYear} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="maxYear" placeholder="Año máximo" value={localFilters.maxYear} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="minRating" placeholder="Valoración mínima (1-5)" value={localFilters.minRating} onChange={handleChange} className="p-2 border rounded" />

      <select name="type" value={localFilters.type} onChange={handleChange} className="p-2 border rounded">
        <option value="">Todos los tipos</option>
        <option value="Tinto">Tinto</option>
        <option value="Blanco">Blanco</option>
        <option value="Rosado">Rosado</option>
        <option value="Espumoso">Espumoso</option>
      </select>

      <div className="w-full">
      <button
          onClick={handleApplyFilters}
          className="w-full p-2 rounded text-white font-semibold bg-[#9f2042] hover:bg-[#7b0d1e] hover:text-white transition-colors"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  )
}
