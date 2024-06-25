export const masaiImage: string = 'https://masaischool.com/img/navbar/logo.svg';
export const    QuesTymes = "https://raw.githubusercontent.com/masai-builds/team-4-client-questymes/master/src/Assets/Ques.png"


// export const EventTypesNavbarArray = ["DashBoard","Past-Interviews","Upcoming-Interviews","Add-Students"]
export const EventTypesNavbarArray = ["Dashboard","Interviews","Add-Students"]


export const Duration =["15","30","45","60"]

export const Batch =["FW15","FW16","FW17","FW18","FW19","FW20"]
  
export const DaysForRecurring = [
  {
    name: "Sun",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
  {
    name: "Mon",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
  {
    name: "Tue",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
  {
    name: "Wed",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
  {
    name: "Thu",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
  {
    name: "Fri",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
  {
    name: "Sat",
    isChecked: true,
    inputs: [{ start: "09:00", end: "17:00" }],
    errors: [{ start: "", end: "" }],
  },
]





export const interviewsStatus = {

totalInterviews: 0,
results: [
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
  {
    meetingStatus: "",
    count: 0,
  },
]
}



export const IntervieStatusByBatch ={
  totalInterviews: 0,
  results: [
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
    {
      meetingStatus: "",
      count: 0,
      batch:""
    },
  ]
}


export const meetingStausButtons =["Pending","Completed","Cancelled","Started","Started-By-Student","Started-By-Interviewer","Ended-By-Student","Ended-By-Interviewer"]

export const SlotsStatus = {
    "totalSlots":0,
    "results": [
        {
            "meetingStatus": "B",
            "count": 0
        },
        {
            "meetingStatus": "U",
            "count": 0
        },
        {
            "meetingStatus": "D",
            "count": 0
        }

      ]

      }

export const backendResponse = [
  {
    slotTiming: [{ startTime: '09:00', endTime: '17:00' }],
    isChecked: true,
    day: 'Sun',
  },
  {
    slotTiming: [{ startTime: '09:00', endTime: '17:00' }],
    isChecked: true,
    day: 'Mon',
  },
  {
    slotTiming: [{ startTime: '09:00', endTime: '17:00' }],
    isChecked: true,
   day: 'Tue',
  },
  {
    slotTiming: [
      { startTime: '09:00', endTime: '17:00' },
      { startTime: '20:00', endTime: '21:00' },
    ],
    isChecked: true,
    day: 'Wed',
  },
  {
    slotTiming: [{ startTime: '09:00', endTime: '17:00' }],
    isChecked: true,
   day: 'Thu',
  },
  {
    slotTiming: [{ startTime: '09:00', endTime: '17:00' }],
    isChecked: true,
   day: 'Fri',
  },
  {
    slotTiming: [{ startTime: '09:00', endTime: '17:00' }],
    isChecked: true,
   day: 'Sat',
  },

]

export const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
export const id = userDetails?.user?.id;
export const token = userDetails?.token;
export const itemsPerPage =6
