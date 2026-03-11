import toast from "react-hot-toast";

export const notify = {
    success : (message) => toast.success(message),
    error : (message)=> toast.error(message),
    info : (message) => toast.apply(message),
    warning : (message) => toast(message, {
        icons: "⚠️"
    })
}