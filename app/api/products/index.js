import { supabase } from '../../../supabase'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useProductList = (userId) =>{
    return useQuery({
        queryKey:['products'],
        queryFn : async () =>{
            const {data:chefIdNotInProfile}=await supabase.from('chefsTable').select('id').eq('owner_id',userId).single();
            console.log("chefIdNotInProfile",chefIdNotInProfile.id)
            const {data,error} = await supabase.from('menuTable').select('*').eq('chefId',chefIdNotInProfile.id);
            console.log("data in react query",data);
            if(error)
            {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useProduct = (itemId) => {
    return useQuery({
        queryKey:['productbyid',itemId],
        queryFn: async () =>{
            const {data,error} = await supabase.from('menuTable').select('*').eq('id',itemId).single();
            console.log("data by id",data);
            if(error)
            {
                throw new Error(error.message);
            }
            return data;
        }
    });
}

export const useInsertProduct = async() => {
    return useMutation({
        async mutationFn(data){
            const {response,error} = await supabase.from('menuTable').insert({
                item: data.item,
                price: data.price,
                image: data.image,
                quantity: data.quantity,
                description: data.description,
                category: data.category
            })
            if(error)
            {
                throw new Error(error.message);
            }
            return response;
        }
    })

}