/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useState, useEffect } from "react"
import StarRatings from "react-star-ratings"
import { Button } from "/src/components/atoms/Form"
import { notify } from "/src/utils/notifications"

const logger = new Logger("ReviewForm")

export const ReviewForm = ({ wineId, onReviewSubmit, editingReview = null, onCancelEdit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (editingReview) {
      logger.info(`Cargando reseña en edición con ID: ${editingReview._id}`)
      setRating(editingReview.rating)
      setComment(editingReview.comment)
    } else {
      logger.info("Formulario de nueva reseña cargado")
      setRating(0)
      setComment("")
    }
  }, [editingReview])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating) {
      logger.warn("Intento de enviar una reseña sin estrellas")
      notify.warning("Debes agregar una valoración con estrellas.")
      return
    }

    const reviewData = { 
      wine: wineId, 
      rating, 
      comment, 
      _id: editingReview?._id 
    }

    logger.info(`Enviando reseña para vino ID: ${wineId}`, reviewData)

    onReviewSubmit(reviewData)

    if (!editingReview) {
      setRating(0)
      setComment("")
    }
  
    if (editingReview && onCancelEdit) {
      onCancelEdit()
    }
  
    logger.info("Formulario de reseña enviado con éxito")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center mb-2">Tu valoración</h2>
      <div className="flex justify-center mb-4">
        <StarRatings
          rating={rating}
          starRatedColor="#ffd700"
          changeRating={(newRating) => {
            logger.debug(`Nueva valoración seleccionada: ${newRating}`)
            setRating(newRating)
          }}
          numberOfStars={5}
          name="rating"
          starDimension="30px"
          starSpacing="5px"
        />
      </div>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md resize-none"
        placeholder="Escribe un comentario opcional..."
        value={comment}
        onChange={(e) => {
          logger.debug(`Comentario actualizado: ${e.target.value}`)
          setComment(e.target.value)
        }}
      />
      <div className="mt-4 flex justify-end gap-2">
        <Button type="submit" variant="moderado">
          {editingReview ? "Actualizar Reseña" : "Enviar Valoración"}
        </Button>
        {editingReview && (
          <Button type="button" variant="ligero" onClick={() => {
            logger.info("Edición de reseña cancelada")
            onCancelEdit()
          }}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
