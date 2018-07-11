var dayData = [
          {
              "TaskID": 1,
              "TaskName": "Parent Task 1",
              "StartDate": new Date("02/23/2014"),
              "duration":7,
              "Progress": "40",
              "Children": [
                   { "TaskID": 2, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014 08:00:00 AM"), "duration": 7, "Progress": "40" },
                   { "TaskID": 3, "TaskName": "Child Task 2", "StartDate": new Date( "02/23/2014 08:00:00 AM"), "duration": 7, "Progress": "40", },
                   { "TaskID": 4, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014 08:00:00 AM"), "duration": 7, "Progress": "40", }
              ]
          },
          {
              "TaskID": 5,
              "TaskName": "Parent Task 2",
              "StartDate":  new Date("02/24/2014"),
              "duration": 7,
              "Progress": "40",
              "Children": [
                   { "TaskID": 6, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014 10:00:00 PM"), "duration": 7, "Progress": "40" },
                   { "TaskID": 7, "TaskName": "Child Task 2", "StartDate": new Date( "02/23/2014 10:00:00 PM"), "duration": 7, "Progress": "40", },
                   { "TaskID": 8, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014 10:00:00 PM"), "duration": 7, "Progress": "40", },
                   { "TaskID": 9, "TaskName": "Child Task 4", "StartDate": new Date( "02/23/2014 10:00:00 PM"), "duration": 7, "Progress": "40" }
              ]
          },
          {
              "TaskID": 10,
              "TaskName": "Parent Task 3",
              "StartDate": new Date( "02/25/2014"),
              "duration": 7,
              "Progress": "40",
              "Children": [
                   { "TaskID": 11, "TaskName": "Child Task 1", "StartDate": new Date( "02/24/2014 12:00:00 PM"), "duration": 7, "Progress": "40" },
                   { "TaskID": 12, "TaskName": "Child Task 2", "StartDate": new Date( "02/24/2014 12:00:00 PM"), "duration": 7, "Progress": "40", },
                   { "TaskID": 13, "TaskName": "Child Task 3", "StartDate": new Date( "02/24/2014 12:00:00 PM"), "duration": 7, "Progress": "40", },
                   { "TaskID": 14, "TaskName": "Child Task 4", "StartDate": new Date( "02/24/2014 12:00:00 PM"), "duration": 7, "Progress": "40", },
                   { "TaskID": 15, "TaskName": "Child Task 5", "StartDate": new Date( "02/24/2014 12:00:00 PM"), "duration": 7, "Progress": "40", }
              ]
          }

];
var hourData = [
          {
              "TaskID": 1,
              "TaskName": "Parent Task 1",
              "StartDate":  new Date("02/23/2014"),
              "duration": 40,
              "Progress": "40",
              "Children": [
                   { "TaskID": 2, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014 01:00:00 AM"), "duration": 40, "Progress": "40" },
                   { "TaskID": 3, "TaskName": "Child Task 2", "StartDate":  new Date("02/23/2014 01:00:00 AM"), "duration": 40, "Progress": "40", },
                   { "TaskID": 4, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014 01:00:00 AM"), "duration": 40, "Progress": "40", }
              ]
          },
          {
              "TaskID": 5,
              "TaskName": "Parent Task 2",
              "StartDate": new Date( "02/23/2014"),
              "duration": 40,
              "Progress": "40",
              "Children": [
                   { "TaskID": 6, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014 02:00:00 AM"), "duration": 40, "Progress": "40" },
                   { "TaskID": 7, "TaskName": "Child Task 2", "StartDate": new Date( "02/23/2014 02:00:00 AM"), "duration": 40, "Progress": "40", },
                   { "TaskID": 8, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014 02:00:00 AM"), "duration": 40, "Progress": "40", },
                   { "TaskID": 9, "TaskName": "Child Task 4", "StartDate": new Date( "02/23/2014 02:00:00 AM"), "duration": 40, "Progress": "40" }
              ]
          },
          {
              "TaskID": 10,
              "TaskName": "Parent Task 3",
              "StartDate": new Date( "02/23/2014"),
              "duration": 40,
              "Progress": "40",
              "Children": [
                   { "TaskID": 11, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014 03:00:00 AM"), "duration": 40, "Progress": "40" },
                   { "TaskID": 12, "TaskName": "Child Task 2", "StartDate": new Date( "02/23/2014 03:00:00 AM"), "duration": 40, "Progress": "40", },
                   { "TaskID": 13, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014 03:00:00 AM"), "duration": 40, "Progress": "40", },
                   { "TaskID": 14, "TaskName": "Child Task 4", "StartDate": new Date( "02/23/2014 03:00:00 AM"), "duration": 40, "Progress": "40", },
                   { "TaskID": 15, "TaskName": "Child Task 5", "StartDate": new Date("02/23/2014 03:00:00 AM"), "duration": 40, "Progress": "40", }
              ]
          }

];
var weekData = [
     {
         "TaskID": 1,
         "TaskName": "Parent Task 1",
         "StartDate": new Date( "02/23/2014"),
         "EndDate": new Date( "02/28/2014"),
         "Progress": "40",
         "Children": [
              { "TaskID": 2, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014"), "EndDate": new Date( "02/28/2014"), "Progress": "40" },
              { "TaskID": 3, "TaskName": "Child Task 2", "StartDate": new Date( "02/23/2014"), "EndDate": new Date( "02/28/2014"), "Progress": "40", },
              { "TaskID": 4, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014"), "EndDate": new Date( "02/28/2014"), "Progress": "40", }
         ]
     },
     {
         "TaskID": 5,
         "TaskName": "Parent Task 2",
         "StartDate": new Date( "03/03/2014"),
         "EndDate": new Date( "03/07/2014"),
         "Progress": "40",
         "Children": [
              { "TaskID": 6, "TaskName": "Child Task 1", "StartDate": new Date( "03/03/2014"), "EndDate": new Date( "03/07/2014"), "Progress": "40" },
              { "TaskID": 7, "TaskName": "Child Task 2", "StartDate": new Date( "03/03/2014"), "EndDate": new Date( "03/07/2014"), "Progress": "40", },
              { "TaskID": 8, "TaskName": "Child Task 3", "StartDate": new Date( "03/03/2014"), "EndDate":  new Date("03/07/2014"), "Progress": "40", },
              { "TaskID": 9, "TaskName": "Child Task 4", "StartDate": new Date( "03/03/2014"), "EndDate": new Date( "03/07/2014"), "Progress": "40" }
         ]
     },
     {
         "TaskID": 10,
         "TaskName": "Parent Task 3",
         "StartDate": new Date( "03/10/2014"),
         "EndDate": new Date( "03/14/2014"),
         "Progress": "40",
         "Children": [
              { "TaskID": 11, "TaskName": "Child Task 1", "StartDate": new Date( "03/10/2014"), "EndDate": new Date( "03/14/2014"), "Progress": "40" },
              { "TaskID": 12, "TaskName": "Child Task 2", "StartDate": new Date( "03/10/2014"), "EndDate": new Date( "03/14/2014"), "Progress": "40", },
              { "TaskID": 13, "TaskName": "Child Task 3", "StartDate": new Date( "03/10/2014"), "EndDate": new Date( "03/14/2014"), "Progress": "40", },
              { "TaskID": 14, "TaskName": "Child Task 4", "StartDate": new Date( "03/10/2014"), "EndDate": new Date( "03/14/2014"), "Progress": "40", },
              { "TaskID": 15, "TaskName": "Child Task 5", "StartDate": new Date( "03/10/2014"), "EndDate": new Date( "03/14/2014"), "Progress": "40", }
         ]
     }

];
var monthData = [
     {
         "TaskID": 1,
         "TaskName": "Parent Task 1",
         "StartDate": new Date( "02/23/2014"),
         "EndDate": new Date( "04/28/2014"),
         "Progress": "40",
         "Children": [
              { "TaskID": 2, "TaskName": "Child Task 1", "StartDate": new Date( "02/23/2014"), "EndDate": new Date( "03/28/2014"), "Progress": "40" },
              { "TaskID": 3, "TaskName": "Child Task 2", "StartDate": new Date( "02/23/2014"), "EndDate": new Date( "03/28/2014"), "Progress": "40", },
              { "TaskID": 4, "TaskName": "Child Task 3", "StartDate": new Date( "02/23/2014"), "EndDate": new Date( "03/28/2014"), "Progress": "40", }
         ]
     },
     {
         "TaskID": 5,
         "TaskName": "Parent Task 2",
         "StartDate": new Date( "05/03/2014"),
         "EndDate": new Date( "07/07/2014"),
         "Progress": "40",
         "Children": [
              { "TaskID": 6, "TaskName": "Child Task 1", "StartDate": new Date( "04/13/2014"), "EndDate": new Date( "05/20/2014"), "Progress": "40" },
              { "TaskID": 7, "TaskName": "Child Task 2", "StartDate": new Date( "04/13/2014"), "EndDate": new Date( "05/20/2014"), "Progress": "40", },
              { "TaskID": 8, "TaskName": "Child Task 3", "StartDate": new Date( "04/13/2014"), "EndDate": new Date( "05/20/2014"), "Progress": "40", },
              { "TaskID": 9, "TaskName": "Child Task 4", "StartDate": new Date( "04/13/2014"), "EndDate": new Date( "05/20/2014"), "Progress": "40" }
         ]
     },
     {
         "TaskID": 10,
         "TaskName": "Parent Task 3",
         "StartDate": new Date( "08/10/2014"),
         "EndDate": new Date( "10/14/2014"),
         "Progress": "40",
         "Children": [
              { "TaskID": 11, "TaskName": "Child Task 1", "StartDate": new Date( "06/10/2014"), "EndDate": new Date( "07/14/2014"), "Progress": "40" },
              { "TaskID": 12, "TaskName": "Child Task 2", "StartDate": new Date( "06/10/2014"), "EndDate": new Date( "07/14/2014"), "Progress": "40", },
              { "TaskID": 13, "TaskName": "Child Task 3", "StartDate": new Date( "06/10/2014"), "EndDate": new Date( "07/14/2014"), "Progress": "40", },
              { "TaskID": 14, "TaskName": "Child Task 4", "StartDate": new Date( "06/10/2014"), "EndDate": new Date( "07/14/2014"), "Progress": "40", },
              { "TaskID": 15, "TaskName": "Child Task 5", "StartDate": new Date( "06/10/2014"), "EndDate": new Date( "07/14/2014"), "Progress": "40", }
         ]
     }

];
var columnTemplateData = [
    {
        taskID: 1,
        taskName: "Project Schedule",
        startDate: new Date( "02/03/2014"),
        endDate: new Date( "03/07/2014"),
        taskColor: "#F2A4A7",
        progressColor: "#DE605C",
        subtasks: [
            {
                taskID: 2,
                taskName: "Planning",
                startDate: new Date( "02/03/2014"),
                endDate: new Date( "02/07/2014"),
                taskColor:"#79BDC9",
                progressColor: "#59AAB4",
                subtasks: [
                    { taskID: 3, taskName: "Plan timeline", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 6, progress: "60", resourceId: [1] },
                    { taskID: 4, taskName: "Plan budget", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 6, progress: "90", resourceId: [5] },
                    { taskID: 5, taskName: "Allocate resources", startDate: new Date( "02/03/2014"), endDate:  new Date("02/07/2014"), duration: 6, progress: "75", resourceId: [6] },
                    { taskID: 6, taskName: "Planning complete", startDate: new Date( "02/07/2014"), endDate: new Date( "02/07/2014"), duration: 0, predecessor: "3FS,4FS,5FS", resourceId: [1] }
                ]
            },
            {
                taskID: 7,
                taskName: "Design",
                startDate: new Date( "02/10/2014"),
                endDate: new Date( "02/14/2014"),
                taskColor: "#93b8a6",
                progressColor: "#7AA992",
                subtasks: [
                    { taskID: 8, taskName: "Software Specification", startDate:  new Date("02/10/2014"), endDate: new Date( "02/12/2014"), duration: 3, progress: "60", predecessor: "6FS", resourceId: [2] },
                    { taskID: 9, taskName: "Develop prototype", startDate: new Date( "02/10/2014"), endDate: new Date( "02/12/2014"), duration: 3, progress: "100", predecessor: "6FS", resourceId: [3] },
                    { taskID: 10, taskName: "Get approval from customer", startDate: new Date( "02/13/2014"), endDate: new Date( "02/14/2014"), duration: 2, progress: "100", predecessor: "9FS", resourceId: [1] },
                    { taskID: 11, taskName: "Design complete", startDate: new Date( "02/14/2014"), endDate: new Date( "02/14/2014"), duration: 0, predecessor: "10FS", resourceId: [2] }
                ]
            },
            {
                taskID: 12,
                taskName: "Implementation",
                startDate: new Date( "02/17/2014"),
                endDate: new Date( "02/27/2014"),
                taskColor :"#FAC9CD",
                progressColor:"#F2928D",
                subtasks: [
                            { taskID: 13, taskName: "Development Task 1", startDate: new Date( "02/17/2014"), endDate: new Date( "02/19/2014"), duration: 3, progress: "50", predecessor: "11FS", resourceId: [3] },
                            { taskID: 14, taskName: "Development Task 2", startDate: new Date( "02/17/2014"), endDate: new Date( "02/19/2014"), duration: 3, progress: "50", predecessor: "11FS", resourceId: [3] },
                            { taskID: 15, taskName: "Testing", startDate: new Date( "02/20/2014"), endDate: new Date( "02/21/2014"), duration: 2, progress: "0", predecessor: "13FS,14FS", resourceId: [4] },
                            { taskID: 16, taskName: "Bug fix", startDate: new Date( "02/24/2014"), endDate: new Date( "02/25/2014"), duration: 2, progress: "0", predecessor: "15FS", resourceId: [3] },
                            { taskID: 17, taskName: "Customer review meeting", startDate: new Date( "02/26/2014"), endDate: new Date( "02/27/2014"), duration: 2, progress: "0", predecessor: "16FS", resourceId: [1] },
                            { taskID: 18, taskName: "Implemenation complete", startDate: new Date( "02/27/2014"), endDate: new Date( "02/27/2014"), duration: 0, predecessor: "17FS", resourceId: [2] }

                ]
            },
            { taskID: 19, taskName: "Integration", startDate: new Date( "03/03/2014"), endDate:  new Date("03/05/2014"), duration: 2, progress: "0", predecessor: "18FS", resourceId: [3] },
            { taskID: 20, taskName: "Final Testing", startDate: new Date( "03/06/2014"), endDate: new Date( "03/07/2014"), duration: 2, progress: "0", predecessor: "19FS", resourceId: [4] },
            { taskID: 21, taskName: "Final Delivery", startDate:  new Date("03/07/2014"), endDate:  new Date("03/07/2014"), duration: 0, predecessor: "20FS", resourceId: [1] }
        ]
    }
];

var taskMappingTemplateData = [
    {
        taskID: 1,
        taskName: "Project Schedule",
        startDate: new Date( "02/03/2014"),
            endDate: new Date( "03/07/2014"),
        taskColor: "#F2A4A7",
        progressColor: "#DE605C",
        subtasks: [
            {
                taskID: 2,
                taskName: "Planning",
                startDate: new Date( "02/03/2014"),
                    endDate: new Date( "02/07/2014"),
                taskColor: "#79BDC9",
                progressColor: "#59AAB4",
                subtasks: [
                    { taskID: 3, taskName: "Plan timeline", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 6, progress: "60", resourceId: [1,3] },
                    { taskID: 4, taskName: "Plan budget", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 6, progress: "90", resourceId: [5] },
                    { taskID: 5, taskName: "Allocate resources", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 6, progress: "75", resourceId: [6,2] },
                    { taskID: 6, taskName: "Planning complete", startDate: new Date( "02/07/2014"), endDate: new Date( "02/07/2014"), duration: 0, predecessor: "3FS,4FS,5FS", resourceId: [1] }
                ]
            },
            {
                taskID: 7,
                taskName: "Design",
                startDate: new Date( "02/10/2014"),
                endDate: new Date( "02/14/2014"),
                taskColor: "#93b8a6",
                progressColor: "#7AA992",
                subtasks: [
                    { taskID: 8, taskName: "Software Specification", startDate: new Date( "02/10/2014"), endDate: new Date( "02/12/2014"), duration: 3, progress: "60", predecessor: "6FS", resourceId: [2,1] },
                    { taskID: 9, taskName: "Develop prototype", startDate: new Date( "02/10/2014"), endDate: new Date( "02/12/2014"), duration: 3, progress: "100", predecessor: "6FS", resourceId: [3] },
                    { taskID: 10, taskName: "Get approval from customer", startDate: new Date( "02/13/2014"), endDate: new Date( "02/14/2014"), duration: 2, progress: "100", predecessor: "9FS", resourceId: [1,6] },
                    { taskID: 11, taskName: "Design complete", startDate: new Date( "02/14/2014"), endDate: new Date( "02/14/2014"), duration: 0, predecessor: "10FS", resourceId: [2] }
                ]
            },
            {
                taskID: 12,
                taskName: "Implementation",
                startDate: new Date( "02/17/2014"),
                endDate: new Date( "02/27/2014"),
                taskColor: "#FAC9CD",
                progressColor: "#F2928D",
                subtasks: [
                            { taskID: 13, taskName: "Development Task 1", startDate: new Date( "02/17/2014"), endDate: new Date( "02/19/2014"), duration: 3, progress: "50", predecessor: "11FS", resourceId: [3,2] },
                            { taskID: 14, taskName: "Development Task 2", startDate: new Date( "02/17/2014"), endDate: new Date( "02/19/2014"), duration: 3, progress: "50", predecessor: "11FS", resourceId: [3,6] },
                            { taskID: 15, taskName: "Testing", startDate: new Date( "02/20/2014"), endDate: new Date( "02/21/2014"), duration: 2, progress: "0", predecessor: "13FS,14FS", resourceId: [4] },
                            { taskID: 16, taskName: "Bug fix", startDate: new Date( "02/24/2014"), endDate: new Date( "02/25/2014"), duration: 2, progress: "0", predecessor: "15FS", resourceId: [3] },
                            { taskID: 17, taskName: "Customer review meeting", startDate: new Date( "02/26/2014"), endDate: new Date( "02/27/2014"), duration: 2, progress: "0", predecessor: "16FS", resourceId: [1,4] },
                            { taskID: 18, taskName: "Implemenation complete", startDate: new Date( "02/27/2014"), endDate: new Date( "02/27/2014"), duration: 0, predecessor: "17FS", resourceId: [2] }

                ]
            },
            { taskID: 19, taskName: "Integration", startDate: new Date( "03/03/2014"), endDate: new Date( "03/05/2014"), duration: 2, progress: "0", predecessor: "18FS", resourceId: [3] },
            { taskID: 20, taskName: "Final Testing", startDate: new Date( "03/06/2014"), endDate:  new Date("03/07/2014"), duration: 2, progress: "0", predecessor: "19FS", resourceId: [4,2] },
            { taskID: 21, taskName: "Final Delivery", startDate: new Date( "03/07/2014"), endDate: new Date( "03/07/2014"), duration: 0, predecessor: "20FS", resourceId: [1] }
        ]
    }
];

var criticalPathData = [
    {
        taskID: 1,
        taskName: "Project Schedule",
        startDate: new Date( "02/03/2014"),
        endDate: new Date( "03/07/2014"),
        subtasks: [
            {
                taskID: 2,
                taskName: "Planning",
                startDate: new Date( "02/03/2014"),
                endDate: new Date( "02/07/2014"),
                subtasks: [
                    { taskID: 3, taskName: "Plan timeline", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 5, progress: "80", resourceInfo: [1] },
                    { taskID: 4, taskName: "Plan budget", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 5, progress: "70", predecessor: "3FS", resourceInfo: [1] },
                    { taskID: 5, taskName: "Allocate resources", startDate: new Date( "02/03/2014"), endDate: new Date( "02/07/2014"), duration: 5, progress: "80", predecessor: "4SS", resourceInfo: [1] },
                    { taskID: 6, taskName: "Planning complete", startDate: new Date( "02/07/2014"), endDate: new Date( "02/07/2014"), duration: 0, predecessor: "4FS" }
                ]
            },
            {
                taskID: 7,
                taskName: "Design",
                startDate: new Date( "02/10/2014"),
                endDate: new Date( "02/14/2014"),
                subtasks: [
                    { taskID: 8, taskName: "Software Specification", startDate: new Date("02/10/2014"), endDate: new Date("02/12/2014"), duration: 3, progress: "60", predecessor: "6FS", resourceInfo: [2] },
                    { taskID: 9, taskName: "Develop prototype", startDate: new Date( "02/10/2014"), endDate: new Date( "02/12/2014"), duration: 3, progress: "40", predecessor: "6FS", resourceInfo: [3] },
                    { taskID: 10, taskName: "Get approval from customer", startDate: new Date( "02/13/2014"), endDate: new Date( "02/18/2014"), duration: 5, progress: "50", predecessor: "9FS", resourceInfo: [1] },
                    { taskID: 11, taskName: "Design complete", startDate: new Date( "02/18/2014"), endDate: new Date( "02/21/2014"), duration: 3, predecessor: "10FS" }
                ]
            }]
    }];

var columnTemplateResource = [
    { resourceId: 1, resourceName: "Robert King" },
    { resourceId: 2, resourceName: "Anne Dodsworth" },
    { resourceId: 3, resourceName: "David William" },
    { resourceId: 4, resourceName: "Nancy Davolio" },
    { resourceId: 5, resourceName: "Janet Leverling" },
    { resourceId: 6, resourceName: "Romey Wilson" }
];

var defaultGanttData = [
             {
                 "TaskID": 1,
                 "TaskName": "Parent Task 1",
                 "StartDate": new Date("02/23/2014"),
                 "EndDate": new Date("02/27/2014"),
                 "Progress": "40",
                 "isManual": true,
                 "Children": [
                      { "TaskID": 2, "TaskName": "Child Task 1", "StartDate": new Date("02/23/2014"), "EndDate": new Date("02/27/2014"), "Progress": "40", duration: 4 },
                      { "TaskID": 3, "TaskName": "Child Task 2", "StartDate": new Date("02/23/2014"), "EndDate": new Date("02/27/2014"), "Progress": "40", "isManual": true, duration: 4 },
                      { "TaskID": 4, "TaskName": "Child Task 3", "StartDate": new Date("02/23/2014"), "EndDate": new Date("02/27/2014"), "Duration": 5, "Progress": "40", duration: 4 }
                 ]
             },
             {
                 "TaskID": 5,
                 "TaskName": "Parent Task 2",
                 "StartDate": new Date("03/02/2014"),
                 "EndDate": new Date("03/06/2014"),
                 "Progress": "40",
                 "isManual": true,
                 "Children": [
                      { "TaskID": 6, "TaskName": "Child Task 1", "StartDate": new Date("03/02/2014"), "EndDate": new Date("03/06/2014"), "Progress": "40", duration:4 },
                      { "TaskID": 7, "TaskName": "Child Task 2", "StartDate": new Date("03/02/2014"), "EndDate": new Date("03/06/2014"), "Progress": "40", duration: 4 },
                      { "TaskID": 8, "TaskName": "Child Task 3", "StartDate": new Date("03/02/2014"), "EndDate": new Date("03/06/2014"), "Progress": "40", "isManual": true,  duration:4},
                      { "TaskID": 9, "TaskName": "Child Task 4", "StartDate": new Date("03/02/2014"), "EndDate": new Date("03/06/2014"), "Progress": "40", "isManual": true, duration: 4 }
                 ]
             },
             {
                 "TaskID": 10,
                 "TaskName": "Parent Task 3",
                 "StartDate": new Date("03/09/2014"),
                 "EndDate": new Date("03/13/2014"),
                 "Progress": "40",
                 "Children": [
                      { "TaskID": 11, "TaskName": "Child Task 1", "StartDate": new Date("03/9/2014"), "EndDate": new Date("03/13/2014"), "Progress": "40", duration: 4 },
                      { "TaskID": 12, "TaskName": "Child Task 2", "StartDate": new Date("03/9/2014"), "EndDate": new Date("03/13/2014"), "Progress": "40", duration: 4 },
                      { "TaskID": 13, "TaskName": "Child Task 3", "StartDate": new Date("03/9/2014"), "EndDate": new Date("03/13/2014"), "Progress": "40", duration: 4 },
                      { "TaskID": 14, "TaskName": "Child Task 4", "StartDate": new Date("03/9/2014"), "EndDate": new Date("03/13/2014"), "Progress": "40", "isManual": true , duration:4},
                      { "TaskID": 15, "TaskName": "Child Task 5", "StartDate": new Date("03/9/2014"), "EndDate": new Date("03/13/2014"), "Progress": "40", duration: 4 }
                 ]
             }

];