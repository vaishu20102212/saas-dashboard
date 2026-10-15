// Mock data matching the Base SaaS Dashboard design screenshots

export const initialOrders = [
  {
    id: "#876364",
    name: "Camera Lens",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=100&auto=format&fit=crop&q=80",
    price: "$178",
    totalOrder: 325,
    totalAmount: "$1,46,660"
  },
  {
    id: "#876368",
    name: "Black Sleep Dress",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100&auto=format&fit=crop&q=80",
    price: "$14",
    totalOrder: 53,
    totalAmount: "$46,660"
  },
  {
    id: "#876412",
    name: "Argan Oil",
    image: "https://images.unsplash.com/photo-1608248597359-59754b207559?w=100&auto=format&fit=crop&q=80",
    price: "$21",
    totalOrder: 78,
    totalAmount: "$3,46,676"
  },
  {
    id: "#876621",
    name: "EAU DE Parfum",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=100&auto=format&fit=crop&q=80",
    price: "$32",
    totalOrder: 98,
    totalAmount: "$3,46,981"
  }
];

export const initialTopProducts = [
  {
    id: 1,
    name: "NIKE Shoes Black Pattern",
    rating: 5,
    price: 87,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "iPhone 12",
    rating: 5,
    price: 987,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=150&auto=format&fit=crop&q=80"
  }
];

export const initialInvoices = [
  {
    id: "#876364",
    name: "Arrora gaur",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    email: "arroragaur@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
    favorite: true
  },
  {
    id: "#876123",
    name: "James Mullican",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
    favorite: true
  },
  {
    id: "#876213",
    name: "Robert Bacins",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    email: "robertbacins@gmail.com",
    date: "09 Dec, 2020",
    status: "Complete",
    favorite: false
  },
  {
    id: "#876987",
    name: "Bethany Jackson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    email: "bethanyjackson@gmail.com",
    date: "09 Dec, 2020",
    status: "Cancel",
    favorite: false
  },
  {
    id: "#871345",
    name: "Anne Jacob",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    email: "annejacob@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
    favorite: false
  },
  {
    id: "#872345",
    name: "Bethany jackson",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&auto=format&fit=crop&q=80",
    email: "bethanyjackson@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
    favorite: true
  },
  {
    id: "#872346",
    name: "James Mullican",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
    favorite: false
  },
  {
    id: "#873245",
    name: "Jhon Deo",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    email: "jhondeo32@gmail.com",
    date: "08 Dec, 2020",
    status: "Complete",
    favorite: true
  },
  {
    id: "#876364",
    name: "Bethany jackson",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
    email: "bethanyjackson@gmail.com",
    date: "02 Dec, 2020",
    status: "Cancel",
    favorite: true
  },
  {
    id: "#878769",
    name: "James Mullican",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    email: "jamesmullican@gmail.com",
    date: "01 Dec, 2020",
    status: "Pending",
    favorite: false
  }
];

export const initialCustomers = [
  {
    id: 1,
    name: "John Deo",
    role: "UI/UX Designer",
    email: "johndoe2211@gmail.com",
    workEmail: "kajope5182@ummoh.com",
    phone: "+33757005467",
    gender: "Male",
    location: "2239 Hog Camp Road, Schaumburg",
    avatar: "/john-deo.png",
    performance: {
      monthly: [
        { month: "Jan", val: 1.8 },
        { month: "Feb", val: 2.33 },
        { month: "Mar", val: 2.9 },
        { month: "Apr", val: 2.4 },
        { month: "May", val: 3.1 },
        { month: "Jun", val: 3.6 }
      ],
      score1: 70,
      score2: 60
    }
  },
  {
    id: 2,
    name: "Shelby Goode",
    role: "Product Manager",
    email: "shelbygoode481@gmail.com",
    workEmail: "shelby@ummoh.com",
    phone: "+33757005467",
    gender: "Female",
    location: "1482 Elmwood Ave, Chicago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 2.1 },
        { month: "Feb", val: 2.6 },
        { month: "Mar", val: 2.4 },
        { month: "Apr", val: 2.8 },
        { month: "May", val: 3.2 },
        { month: "Jun", val: 3.9 }
      ],
      score1: 85,
      score2: 75
    }
  },
  {
    id: 3,
    name: "Robert Bacins",
    role: "Frontend Developer",
    email: "robertbacins4182@gmail.com",
    workEmail: "robert@ummoh.com",
    phone: "+33757005467",
    gender: "Male",
    location: "8472 Maple Street, Boston",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 1.5 },
        { month: "Feb", val: 1.9 },
        { month: "Mar", val: 2.2 },
        { month: "Apr", val: 2.5 },
        { month: "May", val: 2.9 },
        { month: "Jun", val: 3.3 }
      ],
      score1: 65,
      score2: 80
    }
  },
  {
    id: 4,
    name: "John Carilo",
    role: "Fullstack Engineer",
    email: "johncarilo182@gmail.com",
    workEmail: "jcarilo@ummoh.com",
    phone: "+33757805467",
    gender: "Male",
    location: "9912 Ocean Drive, Miami",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 2.0 },
        { month: "Feb", val: 2.5 },
        { month: "Mar", val: 2.8 },
        { month: "Apr", val: 3.0 },
        { month: "May", val: 3.5 },
        { month: "Jun", val: 4.0 }
      ],
      score1: 90,
      score2: 88
    }
  },
  {
    id: 5,
    name: "Adriene Watson",
    role: "Marketing Director",
    email: "adrienewatson82@gmail.com",
    workEmail: "awatson@ummoh.com",
    phone: "+83757305467",
    gender: "Female",
    location: "4501 Sunset Blvd, Los Angeles",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 1.9 },
        { month: "Feb", val: 2.2 },
        { month: "Mar", val: 2.6 },
        { month: "Apr", val: 2.9 },
        { month: "May", val: 3.1 },
        { month: "Jun", val: 3.5 }
      ],
      score1: 75,
      score2: 68
    }
  },
  {
    id: 6,
    name: "Jhon Deo",
    role: "QA Engineer",
    email: "jhondeo24823@gmail.com",
    workEmail: "jhon.d@ummoh.com",
    phone: "+63475700546",
    gender: "Male",
    location: "312 Willow Creek Rd, Denver",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 1.4 },
        { month: "Feb", val: 1.8 },
        { month: "Mar", val: 2.1 },
        { month: "Apr", val: 2.3 },
        { month: "May", val: 2.7 },
        { month: "Jun", val: 3.0 }
      ],
      score1: 62,
      score2: 70
    }
  },
  {
    id: 7,
    name: "Mark Ruffalo",
    role: "Project Lead",
    email: "markruffalo3735@gmail.com",
    workEmail: "mark@ummoh.com",
    phone: "+33757005467",
    gender: "Male",
    location: "774 Broadway, New York",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 2.5 },
        { month: "Feb", val: 2.8 },
        { month: "Mar", val: 3.2 },
        { month: "Apr", val: 3.4 },
        { month: "May", val: 3.8 },
        { month: "Jun", val: 4.2 }
      ],
      score1: 92,
      score2: 95
    }
  },
  {
    id: 8,
    name: "Bethany Jackson",
    role: "Product Designer",
    email: "bethanyjackson5@gmail.com",
    workEmail: "bjackson@ummoh.com",
    phone: "+33757005467",
    gender: "Female",
    location: "882 Austin Blvd, Austin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 1.7 },
        { month: "Feb", val: 2.1 },
        { month: "Mar", val: 2.5 },
        { month: "Apr", val: 2.8 },
        { month: "May", val: 3.0 },
        { month: "Jun", val: 3.4 }
      ],
      score1: 78,
      score2: 72
    }
  },
  {
    id: 9,
    name: "Christine Huston",
    role: "DevOps Architect",
    email: "christinehuston4@gmail.com",
    workEmail: "christine@ummoh.com",
    phone: "+33757005467",
    gender: "Male",
    location: "109 Seattle Center Way, Seattle",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 2.2 },
        { month: "Feb", val: 2.7 },
        { month: "Mar", val: 3.0 },
        { month: "Apr", val: 3.3 },
        { month: "May", val: 3.7 },
        { month: "Jun", val: 4.1 }
      ],
      score1: 88,
      score2: 85
    }
  },
  {
    id: 10,
    name: "Anne Jacob",
    role: "Content Strategist",
    email: "annejacob2@ummoh.com",
    workEmail: "ajacob@ummoh.com",
    phone: "+33757005467",
    gender: "Male",
    location: "563 Peachtree St, Atlanta",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 1.6 },
        { month: "Feb", val: 2.0 },
        { month: "Mar", val: 2.3 },
        { month: "Apr", val: 2.6 },
        { month: "May", val: 2.9 },
        { month: "Jun", val: 3.2 }
      ],
      score1: 72,
      score2: 65
    }
  },
  {
    id: 11,
    name: "James Mullican",
    role: "Systems Engineer",
    email: "jamesmullican5346@gmail.com",
    workEmail: "jmullican@ummoh.com",
    phone: "+33757005467",
    gender: "Male",
    location: "123 Dallas Hwy, Dallas",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
    performance: {
      monthly: [
        { month: "Jan", val: 1.9 },
        { month: "Feb", val: 2.3 },
        { month: "Mar", val: 2.7 },
        { month: "Apr", val: 3.1 },
        { month: "May", val: 3.5 },
        { month: "Jun", val: 3.8 }
      ],
      score1: 82,
      score2: 77
    }
  }
];

export const initialProductAnalytics = {
  totalProduct: "5,00,874",
  newAdded: "+1400 New Added",
  totalSales: "2,34,888",
  salesToday: "+1000 Sales Today",
  monthlyAdds: [
    { month: "Jan", value: 23400, color: "#FF7B60" },
    { month: "Feb", value: 15000, color: "#5478FF" },
    { month: "Mar", value: 30000, color: "#FF7B60" },
    { month: "Apr", value: 22000, color: "#5478FF" },
    { month: "May", value: 10000, color: "#5478FF" },
    { month: "Jun", value: 23400, color: "#FF7B60" },
    { month: "Jul", value: 5000, color: "#5478FF" }
  ],
  topProductsTable: [
    {
      sn: 1,
      badge: "gold",
      name: "Blutooth Devices",
      icon: "headphones",
      price: "$10",
      totalOrder: "34,666 Piece",
      totalSales: "$3,46,660"
    },
    {
      sn: 2,
      badge: "silver",
      name: "Airdot",
      icon: "box",
      price: "$15",
      totalOrder: "20,000 Piece",
      totalSales: "$3,00,000"
    },
    {
      sn: 3,
      badge: "bronze",
      name: "Shoes",
      icon: "shoe",
      price: "$10",
      totalOrder: "15,000 Piece",
      totalSales: "$1,50,000"
    },
    {
      sn: 4,
      badge: "none",
      name: "Kids T-Shirt",
      icon: "shirt",
      price: "$12",
      totalOrder: "10,000 Piece",
      totalSales: "$1,20,000"
    },
    {
      sn: 5,
      badge: "none",
      name: "Smart Watch",
      icon: "watch",
      price: "$12",
      totalOrder: "10,000 Piece",
      totalSales: "$1,20,000"
    },
    {
      sn: 6,
      badge: "none",
      name: "Girls Top",
      icon: "dress",
      price: "$12",
      totalOrder: "10,000 Piece",
      totalSales: "$1,20,000"
    }
  ]
};

export const initialSchedules = [
  { id: 1, date: "12 Dec, 2021", time: "10.15AM", location: "Office Meeting" },
  { id: 2, date: "10 Dec, 2021", time: "11.20AM", location: "Home" },
  { id: 3, date: "09 Dec, 2021", time: "11.45AM", location: "Friends Zone" },
  { id: 4, date: "08 Dec, 2021", time: "12.15PM", location: "Office Meeting" },
  { id: 5, date: "07 Dec, 2021", time: "01.20PM", location: "Home" },
  { id: 6, date: "05 Dec, 2021", time: "10.15AM", location: "Meeting Outside" },
  { id: 7, date: "04 Dec, 2021", time: "11.15AM", location: "Office Meeting" },
  { id: 8, date: "04 Dec, 2021", time: "01.25PM", location: "Home" },
  { id: 9, date: "02 Dec, 2021", time: "10.15AM", location: "Friends" },
  { id: 10, date: "01 Dec, 2021", time: "04.30PM", location: "Meeting Outside" }
];

export const initialPeople = [
  {
    name: "Eddie Lobanovskiy",
    email: "lobanovskiy@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Alexey Stave",
    email: "alexeyst@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Anton Tkacheve",
    email: "tkacheveanton@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  }
];

export const initialTasks = [
  {
    id: "task-1",
    column: "todo",
    title: "Dashboard Design",
    description: "Discussion for management dashboard ui design",
    priority: "Low",
    statusTrack: "On Track",
    completed: false,
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "03/12/2021",
    endDate: "5/12/2021",
    appType: "Figma",
    timeSlot: "09.00 AM - 11.00 AM"
  },
  {
    id: "task-2",
    column: "todo",
    title: "Landing page Design",
    description: "Discussion for management dashboard ui design",
    priority: "Medium",
    statusTrack: "At risk",
    completed: false,
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "03/12/2021",
    endDate: "5/12/2021",
    appType: "Illustrator",
    timeSlot: "11.00 AM - 01.00 PM"
  },
  {
    id: "task-3",
    column: "todo",
    title: "E-Shop Mobile App",
    description: "Discussion for management dashboard ui design",
    priority: "High",
    statusTrack: "On Track",
    completed: false,
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "01/12/2021",
    endDate: "3/12/2021",
    appType: "Photoshop",
    timeSlot: "01.00 PM - 03.00 PM"
  },
  {
    id: "task-4",
    column: "in-progress",
    title: "Dashboard Design",
    description: "Discussion for management dashboard ui design",
    priority: "High",
    statusTrack: "On Track",
    completed: true,
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "03/12/2021",
    endDate: "5/12/2021",
    appType: "Figma",
    timeSlot: "11.00 AM - 01.00 PM"
  },
  {
    id: "task-5",
    column: "in-progress",
    title: "Landing page Design",
    description: "Discussion for management dashboard ui design",
    priority: "Low",
    statusTrack: "On Track",
    completed: true,
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80"
    ],
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "03/12/2021",
    endDate: "5/12/2021",
    appType: "Illustrator",
    timeSlot: "01.00 PM - 03.00 PM"
  },
  {
    id: "task-6",
    column: "in-progress",
    title: "E-Shop Mobile App",
    description: "Discussion for management dashboard ui design",
    priority: "Low",
    statusTrack: "On Track",
    completed: false,
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "01/12/2021",
    endDate: "3/12/2021",
    appType: "Photoshop",
    timeSlot: "03.00 PM - 05.00 PM"
  },
  {
    id: "task-7",
    column: "in-review",
    title: "Dashboard Design",
    description: "Discussion for management dashboard ui design",
    priority: "Medium",
    statusTrack: "On Track",
    completed: true,
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80"
    ],
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "03/12/2021",
    endDate: "5/12/2021",
    appType: "Figma",
    timeSlot: "09.00 AM - 11.00 AM"
  },
  {
    id: "task-8",
    column: "in-review",
    title: "E-Shop Mobile App",
    description: "Discussion for management dashboard ui design",
    priority: "Low",
    statusTrack: "On Track",
    completed: true,
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&auto=format&fit=crop&q=80"
    ],
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "01/12/2021",
    endDate: "3/12/2021",
    appType: "XD",
    timeSlot: "01.00 PM - 03.00 PM"
  },
  {
    id: "task-9",
    column: "done",
    title: "Dashboard Design",
    description: "Discussion for management dashboard ui design",
    priority: "High",
    statusTrack: "On Track",
    completed: true,
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80"
    ],
    comments: 112,
    likes: "1.2k",
    membersCount: 4,
    startDate: "01/12/2021",
    endDate: "3/12/2021",
    appType: "XD",
    timeSlot: "09.00 AM - 12.00 PM"
  }
];

export const initialChatContacts = [
  {
    id: 1,
    name: "Shelby Goode",
    category: "personal",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "1 min ago",
    online: true,
    unread: 0
  },
  {
    id: 2,
    name: "Robert Bacins",
    category: "personal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "9 min ago",
    online: false,
    unread: 0
  },
  {
    id: 3,
    name: "John Carlio",
    category: "personal",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "15 min ago",
    online: true,
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Lorem Ipsum is simply",
        time: "09:01 PM"
      },
      {
        id: 2,
        sender: "them",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        time: "09:02 PM"
      },
      {
        id: 3,
        sender: "me",
        images: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80"
        ],
        time: "09:03 PM"
      },
      {
        id: 4,
        sender: "them",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        time: "09:04 PM"
      }
    ]
  },
  {
    id: 4,
    name: "Adriene Watson",
    category: "personal",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "21 min ago",
    online: true,
    unread: 0
  },
  {
    id: 5,
    name: "Jhon Deo",
    category: "personal",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "29 min ago",
    online: true,
    unread: 0
  },
  {
    id: 6,
    name: "Mark Ruffalo",
    category: "teams",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "45 min ago",
    online: true,
    unread: 0
  },
  {
    id: 7,
    name: "Bethany Jackson",
    category: "teams",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    lastMessage: "Lorem Ipsum is simply dummy text of the printing",
    time: "1h ago",
    online: true,
    unread: 0
  }
];

export const calendarEvents = [
  { day: 2, title: "Free day", color: "cyan", time: "All Day" },
  { day: 2, title: "Party Time", color: "purple", time: "08:00 PM" },
  { day: 16, title: "Victory day", color: "coral", time: "All Day" },
  { day: 21, title: "Invited by friends", color: "pink", time: "09:00 AM" },
  { day: 25, title: "Christmas Day", color: "teal", time: "All Day" }
];

export const daySchedule = [
  { time: "09.00 AM", title: "Invited by friends", color: "coral" },
  { time: "10.00 AM", title: null },
  { time: "11.00 AM", title: null },
  { time: "12.00 PM", title: "Prayer Time", color: "cyan" },
  { time: "01.00 PM", title: null },
  { time: "02.00 PM", title: "lunch Time", color: "coral" },
  { time: "03.00 PM", title: null },
  { time: "04.00 PM", title: null },
  { time: "05.00 PM", title: null },
  { time: "06.00 PM", title: "Prayer Time", color: "green" },
  { time: "07.00 PM", title: null },
  { time: "08.00 PM", title: null },
  { time: "09.00 PM", title: "Dinner Time", color: "purple" },
  { time: "10.00 PM", title: null },
  { time: "11.00 PM", title: null },
  { time: "12.00 AM", title: null },
  { time: "01.00 AM", title: null }
];
