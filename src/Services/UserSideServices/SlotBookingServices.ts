import axios from "axios"


export const getSlotDays = async (id:any) => {
    try {
      const response = await axios.get(`https://questymeprojectrepo-production.up.railway.app/slot/get-slot-dates/${id}`);
      if( response.data){
        return  response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  export const getSlots = async (id:any,time:string) => {
    try {
      const response = await axios.get(`https://questymeprojectrepo-production.up.railway.app/slot/get-unbooked-slot/${id}/${time}`);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  export const getBookSlot = async (e:any,userId:any,token:string) =>{
    try {
      const response = await axios.post(`https://questymeprojectrepo-production.up.railway.app/slot/bookslot/${e.slotId}/user/${userId}`, {}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      return response.data
    } catch (error) {
      console.log(error)
    }
  }


  export const CountBySlotsStatusService = async(token:string)=>{
    try {
      const response = await axios.get(
        "/slot/get-analytics/",
        {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      );
  
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }

  export const CountByAdminSlotsStatusService = async(id:string,token:string)=>{
    try {
      const response = await axios.get(
        `/slot/get-analytics/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
      );
  
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
