
// ==============================
// COURSE LIST ARRAY
// ==============================

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


// ==============================
// SELECT HTML ELEMENTS
// ==============================

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");

const allButton = document.querySelector("#allButton");
const cseButton = document.querySelector("#cseButton");
const wddButton = document.querySelector("#wddButton");


// ==============================
// DISPLAY COURSES
// ==============================

function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        // Highlight completed courses
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <p>
                <strong>${course.subject} ${course.number}</strong>
            </p>

            <p>${course.title}</p>

            <p>${course.credits} Credits</p>

            <p>
                ${course.completed ? "✓ Completed" : "In Progress"}
            </p>
        `;

        courseList.appendChild(card);
    });


    // Calculate total credits using reduce()
    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = totalCredits;
}


// ==============================
// FILTER COURSES
// ==============================

function filterCourses(type) {

    let filteredCourses;

    if (type === "ALL") {

        filteredCourses = courses;

    } else {

        filteredCourses = courses.filter(
            course => course.subject === type
        );

    }

    // Display filtered courses
    displayCourses(filteredCourses);


    // Update active filter button
    document.querySelectorAll(".course-buttons button").forEach(button => {
        button.classList.remove("active");
    });

    if (type === "ALL") {
        allButton.classList.add("active");

    } else if (type === "CSE") {
        cseButton.classList.add("active");

    } else if (type === "WDD") {
        wddButton.classList.add("active");
    }
}


// ==============================
// BUTTON EVENT LISTENERS
// ==============================

allButton.addEventListener("click", () => {
    filterCourses("ALL");
});

cseButton.addEventListener("click", () => {
    filterCourses("CSE");
});

wddButton.addEventListener("click", () => {
    filterCourses("WDD");
});


// ==============================
// INITIAL PAGE DISPLAY
// ==============================

filterCourses("ALL");
