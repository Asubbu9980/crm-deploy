import { toast } from 'react-toastify';

const options = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const success = (msg) => {
    toast.success(msg, options)
};
export const warning = (msg) => {
    toast.warning(msg, options)
};
export const info = (msg) => {
    toast.info(msg, options)
};
export const error = (msg) => {
    toast.error(msg, options)
};
export const dark = (msg) => {
    toast.dark(msg, options)
};