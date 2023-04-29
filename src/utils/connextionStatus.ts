import { toast } from "react-toastify"

/**
 * @author Freddy Michel
 * @description chack statut connexion internet
 * @param status 
 * @returns 
 */
export const statusConnextion = (status: boolean) => {

    if(status) {
        toast.success("Connexion internet retablit");
    }else{
        toast.error("Votre connexion internet a été coupée, veuillez le verifier SVP!");
    }

    return status;
}