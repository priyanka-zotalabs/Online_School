const chatDemoInit = [
    {
      _id: "1234",
      tutorId: "T1",
      studentId: "S1",
      messages: [
        {
          order: "1",
          message: "Hi!",
          isMessageFromTutor: true,
        },
        {
          order: "2",
          message: "the message text that someone typed on the discussion board",
          isMessageFromTutor: false,
        },
        {
          order: "3",
          message: "the message text that someone typed on the discussion board",
          isMessageFromTutor: true,
        },
      ],
    },
    {
      _id: "5678",
      tutorId: "T2",
      studentId: "S2",
      messages: [
        {
          order: "1",
          message: "Hi!",
          isMessageFromTutor: false,
        },
        {
          order: "2",
          message: "the message text that someone typed on the discussion board",
          isMessageFromTutor: false,
        },
        {
          order: "3",
          message: "the message text that someone typed on the discussion board",
          isMessageFromTutor: true,
        },
      ],
    },
    {
      _id: "1357",
      tutorId: "T3",
      studentId: "S3",
      messages: [
        {
          order: "1",
          message: "Message from Student 3",
          isMessageFromTutor: false,
        },
        {
          order: "2",
          message: "Reply to Student 3",
          isMessageFromTutor: true,
        },
        {
          order: "3",
          message: "Student 3 says something more",
          isMessageFromTutor: false,
        },
      ],
    },
  ];
  export default chatDemoInit;