import { useState, useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"

export const useWineReview = (wineId) => {
  const { user } = useContext(AuthContext) 
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/wine/${wineId}`)
      const data = await res.json()
      if (!data.data) return

      setReviews(data.data)
      const totalReviews = data.data.length
      setAverageRating(totalReviews > 0 ? data.data.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0)
    } catch (err) {
      console.error("Error al cargar valoraciones:", err)
    }
  }

  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newReview),
      })

      const responseData = await response.json()
      if (!response.ok) throw new Error(responseData.error || "Error al enviar la valoración")

      const reviewWithUser = { ...responseData.data, user }

      setReviews([...reviews, reviewWithUser])
      setAverageRating(responseData.data.averageRating)
    } catch (err) {
      console.error("Error al enviar la valoración:", err)
    }
  }

  const handleReviewUpdate = async (updatedReview) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${updatedReview._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedReview),
      })
      const updatedData = await response.json()
      if (!response.ok) throw new Error(updatedData.error || "Error al actualizar la reseña")

      setReviews(reviews.map((rev) => (rev._id === updatedReview._id ? updatedData.data : rev)))
    } catch (error) {
      console.error("Error al actualizar la reseña:", error)
    }
  }

  const handleReviewDelete = async (reviewId) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setReviews(reviews.filter((rev) => rev._id !== reviewId))
    } catch (error) {
      console.error("Error al eliminar la reseña:", error)
    }
  }

  return { reviews, averageRating, fetchReviews, handleReviewSubmit, handleReviewUpdate, handleReviewDelete }
}
