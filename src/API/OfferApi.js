import api from "./Api.js";

export const GetOffersAllRequest=async ()=>{
    return await  api.get(`Offers/all`);
}

export const ToggleOffersRequest=async (offerId)=>{
    return await  api.put(`Offers/toggle/${offerId}`);
}

export const DeleteOffersRequest=async (offerId)=>{
    return await  api.delete(`Offers/${offerId}`);
}

export const CreateOfferRequest = async (formData) => {
    return await api.post("Offers", formData);
};