const jobs = {
    "job1": {
        "Company": "Mobile First Corp",
        "Role": "React Native Developer",
        "Location": "Remote",
        "Time": "Full-time",
        "Salary": "$130,000 - $175,000",
        "Status": "pending",
        "Description": "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    },
    "job2": {
        "Company": "Webflow Agency",
        "Role": "Web Design and Developer",
        "Location": "Los Angeles, CA",
        "Time": "Part-time",
        "Salary": "$80,000 - $120,000",
        "Status": "pending",
        "Description": "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    },
    "job3": {
        "Company": "DataViz Solutions",
        "Role": "Data Visualization Specialists",
        "Location": "Boston, MA",
        "Time": "Full-time",
        "Salary": "$125,000 - $165,000",
        "Status": "pending",
        "Description": "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    },
    "job4": {
        "Company": "Webflow Agency",
        "Role": "Web Design and Developer",
        "Location": "Los Angeles, CA",
        "Time": "Part-time",
        "Salary": "$80,000 - $120,000",
        "Status": "pending",
        "Description": "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    },
    "job5": {
        "Company": "CloudFirst Inc",
        "Role": "Backend Developer",
        "Location": "Seattle, WA",
        "Time": "Full-time",
        "Salary": "$140,000 - $190,000",
        "Status": "pending",
        "Description": "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    },
    "job6": {
        "Company": "Innovation Lab",
        "Role": "UI/UX Enginner",
        "Location": "Austin, TX",
        "Time": "Full-time",
        "Salary": "$110,000 - $150,000",
        "Status": "pending",
        "Description": "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    },
    "job7": {
        "Company": "MegaCorp Solution",
        "Role": "JavaScript Developer",
        "Location": "New York, NY",
        "Time": "Full-time",
        "Salary": "$130,000 - $170,000",
        "Status": "pending",
        "Description": "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    },
    "job8": {
        "Company": "StartupXYZ",
        "Role": "Full Stack Engineer",
        "Location": "Remote",
        "Time": "Full-time",
        "Salary": "$120,000 - $160,000",
        "Status": "pending",
        "Description": "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    },
    "job9": {
        "Company": "Techcorp Industries",
        "Role": "Senior Frontend Developer",
        "Location": "San Fransisco, CA",
        "Time": "Full-time",
        "Salary": "$130,000 - $175,000",
        "Status": "pending",
        "Description": "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    },
}

let currTab = "pending";

const totalJob = document.getElementById("total-amount");
const intJob = document.getElementById("interview-amount");
const rejctJob = document.getElementById("rejected-amount");

const availJob = document.getElementById("job-count");

let jobCount = Number(Object.keys(jobs).length);
let intJobCount = 0;
let rejctJobCount = 0;

function noJobRender() {
    document.getElementById("jobs").innerHTML = `
        <div class="w-full bg-white rounded-sm flex flex-col gap-4 items-center text-center justify-center p-8 md:p-12 lg:p-28">
            <img src="./assets/image.png" alt="error image">
            <div class="flex flex-col gap-1">
                <h2 class="text-xl text-[#002C5C] font-bold">No Jobs Available</h2>
                <p class="text-xs md:text-sm lg:text-base">
                    Check back again soon for new job oppurtunities.
                </p>
            </div>
        </div>`
}

// done
function stateChangedJobRender() {
    totalJob.innerText = jobCount;
    availJob.innerText = jobCount;
    intJob.innerText = intJobCount;
    rejctJob.innerText = rejctJobCount;
}




//
function handleDelete(jobId) {
    if (jobs[jobId].Status === "interview") {
        intJobCount--;
        stateChangedJobRender()
    } else if (jobs[jobId].Status === "reject") {
        rejctJobCount--;
        stateChangedJobRender()
    }
    jobCount--;
    
    delete jobs[jobId];
    
    if(Object.keys(jobs).length == 0 || (currTab === "interview" && intJobCount === 0) || (currTab === "reject" && rejctJobCount === 0)) {
        noJobRender();
    } else {
        handleRender(currTab);
    }
    
    stateChangedJobRender();
    if(currTab === "interview") {
        availJob.innerText = `${intJobCount} of ${jobCount}`;
    } else if(currTab === "reject") {
        availJob.innerText = `${rejctJobCount} of ${jobCount}`;
    }
}



function handleInterview(jobId) {
    if(jobs[jobId].Status === "interview") {
        return;
    }

    const jobContainer = document.getElementById(jobId)
    jobs[jobId].Status = "interview";
    
    if(jobContainer.className.includes("border-l-4", "border-red-400")) {
        rejctJobCount--;
        jobContainer.classList.remove("border-l-4", "border-red-400");
    }

    jobContainer.classList.add("border-l-4", "border-green-400");
    intJobCount++;

    stateChangedJobRender();
    if(currTab === "reject") {
        availJob.innerText = `${rejctJobCount} of ${jobCount}`;
        handleRender(currTab);
        if(rejctJobCount === 0) {
            noJobRender();
        } 
    } else {
        handleRender(currTab);
    }
}

function handleReject(jobId) {
    if(jobs[jobId].Status === "reject") {
        return;
    }
    const jobContainer = document.getElementById(jobId)
    jobs[jobId].Status = "reject";
    
    if(jobContainer.className.includes("border-l-4", "border-green-400")) {
        intJobCount--;
        jobContainer.classList.remove("border-l-4", "border-green-400");
    }
    
    jobContainer.classList.add("border-l-4", "border-red-400");
    rejctJobCount++;

    stateChangedJobRender();
    if(currTab === "interview") {
        availJob.innerText = `${intJobCount} of ${jobCount}`;
        handleRender(currTab);
        if(intJobCount === 0) {
            noJobRender();
        } 
    } else {
        handleRender(currTab);
    }
}


// done
function handleRender(currTab) {
    const jobContainer = document.getElementById("jobs");
    jobContainer.innerHTML = "";

    for(const job in jobs) {
        const currJob = jobs[job];
        
        if(currTab === "pending" || currJob.Status === currTab) {
            const jobCard = `
            <div id=${job} class="card bg-base-100 card-md shadow-sm 
            ${currJob.Status === "interview" ? 'border-l-4 border-green-400' : 
                currJob.Status === "reject" ? 'border-l-4 border-red-400' :
                    ''}">
            <div class="card-body">
                <div class="flex flex-row justify-between">
                    <h2 class="card-title text-[#002C5C] font-semibold text-xl">
                        ${currJob.Company}
                    </h2>
                    <button onClick="handleDelete('${job}')" class="btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <p class="text-[#64748B]">${currJob.Role}</p>
                <p class="my-5 text-[#64748B] text-sm">
                ${currJob.Location} • ${currJob.Time} • ${currJob.Salary}
                </p>
                <div class="mb-2 sts">
                    ${currJob.Status === "interview" ? '<button class="btn btn-success">Interview</button>' : 
                        currJob.Status === "reject" ? '<button class="btn btn-error">Rejected</button>' :
                        ''}
                </div>
                <p>
                ${currJob.Description}
                </p>
                <div class="card-actions mt-4">
                <button onClick="handleInterview('${job}')" class="btn btn-outline btn-success">Interview</button>
                <button onClick="handleReject('${job}')" class="btn btn-outline btn-error">Rejected</button>
                </div>
            </div>
            </div>`;

            jobContainer.innerHTML += jobCard;
        }
    }
}

function tabChange(tab) {
    const prevTab = currTab;
    currTab = tab;

    const allBtn = document.getElementById("all");
    const intBtn = document.getElementById("int");
    const rjctBtn = document.getElementById("rjct");

    if(prevTab === "pending") {
        allBtn.classList.remove("btn-primary");
    } else if(prevTab === "interview") {
        intBtn.classList.remove("btn-primary");
    } else if(prevTab === "reject") {
        rjctBtn.classList.remove("btn-primary");
    }

    if(currTab === "pending") {
        allBtn.classList.add("btn-primary");
        availJob.innerText = jobCount;
    } else if(currTab === "interview") {
        intBtn.classList.add("btn-primary");
        availJob.innerText = `${intJobCount} of ${jobCount}`;
    } else if(currTab === "reject") {
        rjctBtn.classList.add("btn-primary");
        availJob.innerText = `${rejctJobCount} of ${jobCount}`;
    }

    if((currTab === "pending" && jobCount === 0) || (currTab === "interview" && intJobCount === 0) || (currTab === "reject" && rejctJobCount === 0)) {
        noJobRender();
    } else {
        handleRender(currTab);
    }
}


// done
document.addEventListener("DOMContentLoaded", function() {
    handleRender(currTab);
    stateChangedJobRender();
})