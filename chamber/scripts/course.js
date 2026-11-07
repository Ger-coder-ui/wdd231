const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }
];


const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");


function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <p>
                <strong>${course.subject} ${course.number}</strong>
                - ${course.title}
            </p>
        `;

        courseList.appendChild(card);
    });


    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = totalCredits;
}


function filterCourses(type) {

    if (type === "ALL") {
        displayCourses(courses);
    } else {
        const filteredCourses = courses.filter(
            course => course.subject === type
        );

        displayCourses(filteredCourses);
    }
}


document.querySelector("#allButton").addEventListener(
    "click",
    () => filterCourses("ALL")
);

document.querySelector("#cseButton").addEventListener(
    "click",
    () => filterCourses("CSE")
);

document.querySelector("#wddButton").addEventListener(
    "click",
    () => filterCourses("WDD")
);


// Display all courses when page loads
displayCourses(courses);