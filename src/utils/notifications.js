import { toast } from "react-toastify";

const baseStyle =
  "text-white font-medium rounded-lg shadow-lg px-4 py-3 text-sm tracking-wide";

export const notify = {
  success: (msg, options = {}) =>
    toast.success(msg, {
      className: `${baseStyle} bg-green-600`,
      icon: "✅",
      ...options,
    }),
  error: (msg, options = {}) =>
    toast.error(msg, {
      className: `${baseStyle} bg-red-600`,
      icon: "❌",
      ...options,
    }),
  info: (msg, options = {}) =>
    toast.info(msg, {
      className: `${baseStyle} bg-blue-600`,
      icon: "ℹ️",
      ...options,
    }),
  warning: (msg, options = {}) =>
    toast.warning(msg, {
      className: `${baseStyle} bg-yellow-600`,
      icon: "⚠️",
      ...options,
    }),
}
