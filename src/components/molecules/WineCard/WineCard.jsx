/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { WineCardImage } from "./WineCardImage.jsx"
import { WineCardContent } from "./WineCardContent.jsx"
import { WineCardActions } from "./WineCardActions.jsx"

const logger = new Logger("WineCard")

export const WineCard = ({ wine, showEditDelete = false, onEdit, onDelete }) => {
  const wineId = wine.id || wine._id

  if (!wine || !wineId) {
    logger.error("WineCard recibió un objeto inválido o sin ID.")
    return <p className="text-red-500">Error: Información del vino no disponible.</p>
  }

  logger.debug(`Renderizando WineCard para el vino: ${wine.name}`)

  return (
    <div className="card card-side bg-base-100 shadow-xl px-6 py-0 m-0 w-full h-auto md:w-[768px] md:h-[400px] mx-auto rounded-lg flex flex-col md:flex-row items-stretch mt-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
      <figure className="w-full md:w-40 flex-shrink-0 rounded-lg overflow-visible flex justify-center items-center">
        <WineCardImage image={wine.image} name={wine.name} />
      </figure>
      <div className="card-body flex flex-col justify-between w-full md:pl-6">
        <WineCardContent 
          wine={wine}
          showActions={true} 
          wineId={wineId} 
          showEditDelete={showEditDelete} 
          onEdit={onEdit} 
          onDelete={onDelete}
        />
        <div className="card-actions self-end">
          <WineCardActions
            wineId={wineId}
            showEditDelete={showEditDelete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  )
}
