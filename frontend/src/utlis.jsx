import { toast } from "react-toastify";

export const handleError = (msg) =>{
    toast.success(
        msg,{
            position:'top-right'
        }
    )
}

export const handleSuccess = (msg) =>{
    toast.error(
        msg,{
            position:'top-right'
        }
    )
}