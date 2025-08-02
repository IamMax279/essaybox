import { toast } from "react-toastify";

export const notify = (message: string) => {
    toast.info(`${message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'colored',
        style: { background: '#1E1E1E' },
    });
}