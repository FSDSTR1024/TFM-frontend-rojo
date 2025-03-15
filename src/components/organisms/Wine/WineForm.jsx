/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCloudinaryUpload } from "/src/hooks/useCloudinaryUpload"
import { useUpsertWine } from "/src/hooks/useUpsertWine"
import { AuthContext } from "/src/context/AuthContext"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"
import { america, europa } from "/src/utils/countries"

export const WineForm = ({ wine = null, onSuccess, onCancel }) => {
  const logger = new Logger("WineForm")
  const { register, handleSubmit, formState, reset, setValue, watch } = useForm({ defaultValues: wine || {} })
  const { uploadImage } = useCloudinaryUpload()
  const { upsertWine } = useUpsertWine()
  const { user } = useContext(AuthContext)
  const [regions, setRegions] = useState([])
  const [regionCountryMap, setRegionCountryMap] = useState({}) 
  const [isManualCountrySelection, setIsManualCountrySelection] = useState(false)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/regions`)
      .then((res) => res.json())
      .then((data) => {
        const regionsData = data.data || []
        setRegions(regionsData)

        const countryMap = {}
        regionsData.forEach(region => {
          countryMap[region._id] = region.country || "" 
        })
        setRegionCountryMap(countryMap)
      })
      .catch((error) => console.error("Error al obtener regiones:", error))
  }, [])

  useEffect(() => {
    if (wine) {
      Object.keys(wine).forEach((key) => {
        if (key === "region" && typeof wine[key] === "object") {
          setValue("region", wine[key]._id || "") 
          setValue("country", wine[key].country || "")
        } else {
          setValue(key, wine[key] || "")
        }
      })
    } else {
      reset()
    }
  }, [wine, setValue, reset])

  const selectedRegion = watch("region")
  useEffect(() => {
    if (selectedRegion && regionCountryMap[selectedRegion] && !isManualCountrySelection) {
      setValue("country", regionCountryMap[selectedRegion]) 
    }
  }, [selectedRegion, setValue, regionCountryMap, isManualCountrySelection])

  const handleCountryChange = () => {
    setIsManualCountrySelection(true) 
  }

  const onSubmit = async (data) => {
    try {
      if (!user || user.role !== "wineries") {
        throw new Error("Solo las bodegas pueden agregar vinos. Asegúrate de estar autenticado correctamente.")
      }

      const wineryId = user.id

      const selectedRegionData = regions.find(region => region._id === data.region)
      if (!selectedRegionData) {
        throw new Error("La región ingresada no existe en la base de datos.")
      }

      let imageUrl = wine?.image || ""

      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        const imageResult = await uploadImage(data.image[0])
        if (imageResult.error) throw imageResult.error
        imageUrl = imageResult.data.secure_url
      }

      const wineData = {
        ...data,
        region: selectedRegionData._id,
        winery: wineryId,
        image: imageUrl, 
      }

      const wineId = wine?.id || wine?._id
      const result = await upsertWine(wineData, wineId)
      
      if (result.error) throw result.error

      alert(`Vino ${wineId ? "actualizado" : "agregado"} correctamente.`)
      reset()
      onSuccess()
    } catch (error) {
      console.error("Error al guardar el vino:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const fields = [
    { name: "name", text: "Nombre del Vino", required: true },
    { name: "type", text: "Tipo de Vino", required: true, type: "select", options: ["Tinto", "Rosado", "Blanco", "Espumoso"] },
    { name: "grapeType", text: "Tipo de Uva", required: true, type: "text" }, 
    { name: "year", text: "Año", required: true, type: "number" },
    { name: "description", text: "Descripción", required: false },
    { name: "additionalDescription", text: "Descripción Adicional", required: false },
    { name: "price", text: "Precio (€)", required: true, type: "number" },
  ]

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>

{fields.map((field) => (
    field.name === "type" ? (
      <div key={field.name}>
        <label htmlFor={field.name} className="block font-normal">{field.text}:</label>
        <select
          id={field.name}
          {...register(field.name, { required: field.required })}
          className="p-2 w-full bg-white focus:outline-none"
        >
          <option value="">Selecciona un tipo de vino</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    ) : (
      <RegisterField
        key={field.name}
        register={register}
        formState={formState}
        {...field}
      />
    )
  ))}

      <div>
        <label htmlFor="region" className="block font-normal">
          Región:
        </label>
        <select
          id="region"
          {...register("region", { required: true })}
          className="p-2 w-full bg-white focus:outline-none"
        >
          <option value="">Selecciona una región</option>
          {regions.map((region) => (
            <option key={region._id} value={region._id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="country" className="block font-normal">
          País:
        </label>
        <select
          id="country"
          {...register("country", { required: true, onChange: handleCountryChange })}
          className="p-2 w-full bg-white focus:outline-none"
        >
          <option value="">Selecciona un país</option>

          <optgroup label="🌍 Europa">
            {europa.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </optgroup>

          <optgroup label="🌎 América">
            {america.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="image">Imagen del vino:</label>
        <input type="file" {...register("image")} />
      </div>
      <Button type="submit" variant="moderado">
        {wine ? "Actualizar Vino" : "Agregar Vino"}
      </Button>
      {wine && <Button type="button" variant="ligero" onClick={onCancel}>Cancelar</Button>}
    </FormContainer>
  )
}
