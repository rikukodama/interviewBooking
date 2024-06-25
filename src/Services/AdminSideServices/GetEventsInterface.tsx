
export interface IAddStdents {
    name:"",
    email:"",
    password:""
}

export interface Iinterviews{
    interviewId: number,
    interviewerId: number,
    intervieweeId: number,
    startTime: string,
    endTime: string,
    date: string,
    studentsNotes: null,
    adminFeedback: null,
    category:string,
    instructions: string,
    title: string,
    meetingLink: string,
    meetingStatus: string,
    batch: string
  }