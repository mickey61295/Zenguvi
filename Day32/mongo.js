// create a db
use day32

// create a collection called users with random data
db.users.insertMany([
    {
        user_id: 1,
        name: "Sparda",
        email: "sparda@dmc.com", 
    },
     {
        user_id: 2,
        name: "Dante",
        email: "dante@dmc.com",
    },
     {
        user_id: 3,
        name: "Virgil",
        email: "virgil@dmc.com",
    },
     {
        user_id: 4,
        name: "Jester",
        email: "jester@dmc.com",
    },
     {
        user_id: 5,
        name: "Lady",
        email: "theLady@gmail.com",
    } 
    ])

// create a collection called codekata and fill with random data
db.codekata.insertMany([
    {
        user_id: 1,
        problems: 50
    },
     {
        user_id: 2,
        problems: 30
    },
     {
        user_id: 3,
        problems: 70
    },
     {
        user_id: 4,
        problems: 80
    },
   
  {
        user_id: 5,
        problems: 90
    }
    ])

// create a collection called topics and fill with random data
db.topics.insertMany([
    {   
        topicid: 1,
        topic: "HTML",
        topic_date: new Date("28-sep-2020")
    },
     {
         topicid: 2,
        topic: "CSS",
        topic_date: new Date("3-oct-2020")
    },
     {
         topicid: 3,
        topic: "JavaScript",
        topic_date: new Date("4-oct-2020")
    },
     {
         topicid: 4,
        topic: "ReactJS",
        topic_date: new Date("7-nov-2020")
    },
    {
        topicid: 5,
        topic: "NodeJS",
        topic_date: new Date("25-nov-2020")
    }
    ])

// create a collection called attendance and fill attendance of users for each topic
db.attendance.insertMany([
    {
        user_id: 1,
        topicid: 2,
        attended: true
    },
  
   {
        user_id: 2,
        topicid: 1,
        attended: true
    },
     {
        user_id: 3,
        topicid: 5,
        attended: false
    },
    {
        user_id: 4,
        topicid: 3,
        attended: true
    },
    {
        user_id: 5,
        topicid: 4,
        attended: false
    }
    ])

// create a collection called tasks and fill with random data
db.tasks.insertMany([
    {
        taskid: 1,
        topicid: 1,
        user_id: 1,
        task: "HTML Task",
        due_date: new Date("2-oct-2020"),
        submitted: true
    },
    {
        taskid: 2,
        topicid: 2,
        user_id: 2,
        task: "CSS Task",
        due_date: new Date("3-oct-2020"),
        submitted: true
    },
     {
        taskid: 3,
        topicid: 3,
        user_id: 3,
        task: "Javascript Task",
        due_date: new Date("6-nov-2020"),
        submitted: false
    },
      {
        taskid: 4,
        topicid: 4,
        user_id: 4,
        task: "React Task",
        due_date: new Date("24-nov-2020"),
        submitted: true
    },
     {
        taskid: 5,
        topicid: 5,
        user_id: 5,
        task: "NodeJS Task",
        due_date: new Date("30-nov-2020"),
        submitted: false
    }
    ])

// create a collection called company_drives and fill with random data
db.company_drives.insertMany([
    {
        user_id: 1,
        drive_date: new Date("12-oct-2020"),
        company: "TCS"
    },
   
  {
        user_id: 1,
        drive_date: new Date("21-oct-2020"),
        company: "Meesho"
    },
     {
        user_id: 2,
        drive_date: new Date("25-oct-2020"),
        company: "ByteDance"
    },
     {
        user_id: 3,
        drive_date: new Date("26-oct-2020"),
        company: "Swiggy"
    },
     {
        user_id: 4,
        drive_date: new Date("12-nov-2020"),
        company: "Yulu"
    }
    ])

// create a collection called mentors and fill with random data
db.mentors.insertMany([
    {
        mentor_id: 1,
        mentorName: "Lavish",
        mentor_email:"Lavish@gmail.com",
        mentee_count: 17
    },
      {
        mentor_id: 2,
        mentorName: "Raghav",
        mentor_email: "Raghav@gmail.com",
        mentee_count: 58
    },
      {
        mentor_id: 3,
        mentorName: "Amit",
        mentor_email: "Amit@gmail.com",
        mentee_count: 12
    },
      {
        mentor_id: 4,
        mentorName: "James",
        mentor_email:"james@gmail.com",
        mentee_count: 16
    },
      {
        mentor_id: 5,
        mentorName: "Sachin",
        mentor_email: "Sachin@gmail.com",
        mentee_count: 35
    }
    ])

// Q/A
// 1. Find all the topics and tasks which are thought in the month of October
db.topics.aggregate([
    {
        $lookup: {
               from: "tasks",
               localField: "topicid",
               foreignField: "topicid",
               as: "taskinfo"
             }
    },
    {
        $match: {$and: [{$or: [{topic_date: {$gt: new Date("30-sep-2020")}},{topic_date: {$lt: new Date("1-nov-2020")}}]},
          {$or: [{"taskinfo.due_date": {$gt: new Date("30-sep-2020")}},{"taskinfo.due_date": {$lt: new Date("1-nov-2020")}}]}
        ]}
    }
    ])
// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({
    $or: [{
        drive_date: {
            $gte: new Date("15-oct-2020")
        }},
{drive_date: {
    $lte: new Date("31-0ct-2020")
}}]})

// 3. Find all the company drives and students who are appeared for the placement.
db.company_drives.find({
    $or: [{
    drive_date: {
        $gte: new Date("15-oct-2020")
    }},
{
    drive_date: {
        $lte: new Date("31-0ct-2020")
    }
}]})

// 4. Find the number of problems solved by the user in "codekata"
db.codekata.aggregate([
    {
        $lookup: {
               from: "users",
               localField: "user_id",
               foreignField: "user_id",
               as: "userinfo"
             }
    },
    {
        $project:{
            _id: 0,
            user_id: 1,
            problems: 1,
           "userinfo.name": 1
        }
    }
    ])

// 5. Find all the mentors with who has the mentee's count more than 15
db.mentors.find({
        mentee_count: {
            $gte: 15
        }}
)

// 6. Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
    {$lookup: {
           from: "topics",
           localField: "topicid",
           foreignField: "topicid",
           as: "topics"
         }},
         {
             $lookup: {
                    from: "tasks",
                    localField: "topicid",
                    foreignField: "topicid",
                    as: "tasks"
                  }
         },
         {$match: {$and: [{attended: false},{"tasks.submitted": false}]}},
         {$match: {$and: [{$or:[{"topics.topic_date": {$gte: new Date("15-oct-2020")}},{"topics.topic_date": {$lte: new Date("31-oct-2020")}}]}, 
         {$or: [{"tasks.due_date": {$gte: new Date("15-oct-2020")}},{"tasks.due_date": {$lte: new Date("31-oct-2020")}}]}
         ]}},
         {
             $count: "No_of_students_absent"
         }
    ])