export interface IEventValues {
    title?: string;
    instruction?: string;
    meetingLink?: string;
    adminId?: string;
    duration?: string;
    category?: string;
    recurringId?:number,
    date?:string | Date;
    slots?:[{start:string,
        end: string}]
  }


  export interface IOneOnEventValues {
    title?: string;
    instruction?: string;
    meetingLink?: string;
    adminId?: string;
    category?:string;
    duration?: string;
    id?:number
   
  }


  export interface IEventValuescreate {
    title: string;
    instruction: string;
    meetingLink: string;
    adminId: string;
    duration: string;
    date:string | Date;
    category:string;
    slotTime:[{startTime:string,
    endTime: string}]
  }

  export interface ISlotsValues {
    title?: string;
    instruction?: string;
    meetingLink?: string;
    adminId?: string;
    duration?: string;
    category?: string;
    slotId?:number,
    date?:string | Date;
    startTime?:string;
    endTime?:string;
    status?:string;
  }

