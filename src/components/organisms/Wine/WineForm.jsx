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
import { grapeVarieties } from "/src/utils/grapeVarieties"
import { notify } from "/src/utils/notifications"

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

      notify.success(`Vino ${wineId ? "actualizado" : "agregado"} correctamente.`)
      reset()
      onSuccess()
    } catch (error) {
      console.error("Error al guardar el vino:", error)
      notify.error(`Error: ${error.message}`)
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Nombre del Vino */}
      <RegisterField
        name="name"
        text="Nombre del Vino"
        type="text"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Tipo de Vino */}
      <RegisterField
        name="type"
        text="Tipo de Vino"
        type="select"
        required={true}
        register={register}
        formState={formState}
        options={[
          { value: "Tinto", label: "Tinto" },
          { value: "Rosado", label: "Rosado" },
          { value: "Blanco", label: "Blanco" },
          { value: "Espumoso", label: "Espumoso" }
        ]}
      />

      {/* Tipo de Uva */}
      <RegisterField
        name="grapeType"
        text="Tipo de Uva"
        type="select"
        required={true}
        register={register}
        formState={formState}
        options={grapeVarieties.map(grape => ({ value: grape, label: grape }))}
      />

      {/* Año */}
      <RegisterField
        name="year"
        text="Año"
        type="number"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Descripción */}
      <RegisterField
        name="description"
        text="Descripción"
        type="textarea"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Descripción Adicional */}
      <RegisterField
        name="additionalDescription"
        text="Descripción Adicional"
        type="textarea"
        required={false} // No es obligatorio
        register={register}
        formState={formState}
      />

      {/* Precio */}
      <RegisterField
        name="price"
        text="Precio (€)"
        type="number"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Región */}
      <RegisterField
        name="region"
        text="Región"
        type="select"
        required={true}
        register={register}
        formState={formState}
        options={regions.map(region => ({ value: region._id, label: region.name }))}
      />

      {/* País */}
      <RegisterField
        name="country"
        text="País"
        type="select"
        required={true}
        register={register}
        formState={formState}
        onChange={handleCountryChange}
      />

      {/* Imagen */}
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
