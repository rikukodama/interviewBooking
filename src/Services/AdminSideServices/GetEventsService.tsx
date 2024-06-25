import axios from "axios";
import { IAddStdents } from "./GetEventsInterface";


//post Event service
export async function PostEventsService(data: any,id:string,token:string) {
  const { title, instruction, meetingLink, category, duration } = data;

  try {
    const response = await axios.post("/recurring/createRecMeet", {
      title,
      instruction,
      adminId:id,
      meetingLink,
      duration,
      category
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

//post Event service
export async function PostOneOffService(data: any,token:string,id:string) {
  const { title, instruction, meetingLink, date, slotTime, duration ,category} =
    data;

  try {
    const response = await axios.post(
      "/slot/create-slots",
      { title, instruction, meetingLink, date, slotTime, duration,"type":category
,"adminId":id
}, 
      {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      
        });
    // console.log(response);
    return response;
  } catch (error: any) {
    return error.response;
  }
}

//post Event service
export async function GetDateOneOffService(id: any) {
  try {
    const response = await axios.get(
      `/slot/get-slot-dates/${id}`
    );
    
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

//getting single event by id
export async function GetSingleEventsService(id: any) {
  try {
    const response = await axios.get(`/one-on-one-events/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

//edit Event service
export async function EditEventsService(data: any, id: any) {
  const { title, instruction, meetingLink, adminId, duration } = data;

  try {
    const response = await axios.put(`/one-on-one-events/${id}`, {
      title,
      instruction,
      meetingLink,
      adminId,
      duration,
    });

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

// adding events recurring manner
export async function AddRecurringSlotsService(id: string, days: any,token:string) {
const {adminId,category,instruction,meetingLink,title,availabilities,duration} = days
  try { 
 
    const response = await axios.post("/recurring/createRecMeet",{
     title,
     meetingLink,
     category,
     duration,
     instruction,
     adminId,
     availabilities
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
   );
    console.log(response)
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}



// adding events recurring manner
export async function DeleteRecurringService(id:string,token:string) {
  
    try { 
   
      const response = await axios.delete(`/recurring/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
     );
     
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
  

//adding single student service
export async function AddStudentService(data: IAddStdents, token: string) {
  const { name, email, password} = data;
  try {
    const response = await axios.post(
      "/auth/users/add/student",
      {
        name,
        email,
        password,
       
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

//adding students in bulk servive
export async function AddBulkStudentService(data: any, token: string) {
  try {
   
    const response = await axios.post(
      "auth/users/bulk-create-byCSV",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

//service for getting slots for particular date
export async function GetSlotsForDateService(id:string,date: any,token:string) {
  try {
    const response = await axios.get(
      `/slot/get-all-slot/${id}/${date}`,
     
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {


    return error.response;
  }
}


//service for deleting slots 
export async function DeleteSlotsService(id:string,token:string) {
  try {
    const response = await axios.delete(
      `/slot/deleteslot/${id}`,
     
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {


    return error.response;
  }
}

// get data abot how many interviews compleated and how many pending
export async function CountByMeetingStatusService(id: string, token: string) {
  try {
    const response = await axios.get(
      "/api/interview/count-by-meeting-status",
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


 // getting data about particular batch
export async function CountByBatchStatusService(batchName:any) {
  try {
    const response = await axios.get(
    `/api/interview/count-by-meeting-status-by-batch?batch=${batchName}`,
      
    );

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}




// getting data about particular batch


export async function GetByPendingStatusService(batchName: string, meeting: string, token: string) {
  try {
    const response = await axios.get(`/api/interview/filter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        batch: batchName,
        meetingStatus: meeting,
      },
    });
    // console.log(response,"response")

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}


 // getting category details
 export async function GetCategoryService(token:string) {
  try {
    const response = await axios.get(
      "/api/category/",{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}


 // getting category details
 export async function GetRecurringListService(token:string,id:string) {
  try {
    const response = await axios.get(
      `/recurring/getListByAdminId?adminId=${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  console.log(response)
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}


export const DetailsRecurringEvent =async(id:string,token:string) =>{
  try {
    const response = await axios.get(
      `/recurring/getListByAdminId?adminId=${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });


   return response.data
  } catch (error: any) {
    return error.response;
  }
}