import { jobs } from'./jobs.js';

console.log(jobs.job10);



let currTab = "pending";

const totalJob = document.getElementById("total-amount");
const intJob = document.getElementById("interview-amount");
const rejectJob = document.getElementById("rejected-amount");

const availJob = document.getElementById("job-count");

let jobCount = Number(Object.keys(jobs).length);
let intJobCount = 0;
let rejectJobCount = 0;

function noJobRender() {
    document.getElementById("jobs").innerHTML = `
        <div class="w-full bg-white rounded-sm flex flex-col gap-4 items-center text-center justify-center p-8 md:p-12 lg:p-28">
            <img src="./assets/image.png" alt="error image">
            <div class="flex flex-col gap-1">
                <h2 class="text-xl text-[#002C5C] font-bold">No Jobs Available</h2>
                <p class="text-xs md:text-sm lg:text-base">
                    Check back again soon for new job opportunities.
                </p>
            </div>
        </div>`
}

// done
function stateChangedJobRender() {
    totalJob.innerText = jobCount;
    availJob.innerText = jobCount;
    intJob.innerText = intJobCount;
    rejectJob.innerText = rejectJobCount;
}




//
function handleDelete(jobId) {
    if (jobs[jobId].Status === "interview") {
        intJobCount--;
        stateChangedJobRender()
    } else if (jobs[jobId].Status === "reject") {
        rejectJobCount--;
        stateChangedJobRender()
    }
    jobCount--;
    
    delete jobs[jobId];
    
    if(Object.keys(jobs).length == 0 || (currTab === "interview" && intJobCount === 0) || (currTab === "reject" && rejectJobCount === 0)) {
        noJobRender();
    } else {
        handleRender(currTab);
    }
    
    stateChangedJobRender();
    if(currTab === "interview") {
        availJob.innerText = `${intJobCount} of ${jobCount}`;
    } else if(currTab === "reject") {
        availJob.innerText = `${rejectJobCount} of ${jobCount}`;
    }
}



function handleInterview(jobId) {
    if(jobs[jobId].Status === "interview") {
        return;
    }

    const jobContainer = document.getElementById(jobId)
    jobs[jobId].Status = "interview";
    
    if(jobContainer.className.includes("border-l-4", "border-red-400")) {
        rejectJobCount--;
        jobContainer.classList.remove("border-l-4", "border-red-400");
    }

    jobContainer.classList.add("border-l-4", "border-green-400");
    intJobCount++;

    stateChangedJobRender();
    if(currTab === "reject") {
        availJob.innerText = `${rejectJobCount} of ${jobCount}`;
        handleRender(currTab);
        if(rejectJobCount === 0) {
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
    const rejectBtn = document.getElementById("reject");

    if(prevTab === "pending") {
        allBtn.classList.remove("btn-primary");
    } else if(prevTab === "interview") {
        intBtn.classList.remove("btn-primary");
    } else if(prevTab === "reject") {
        rejectBtn.classList.remove("btn-primary");
    }

    if(currTab === "pending") {
        allBtn.classList.add("btn-primary");
        availJob.innerText = jobCount;
    } else if(currTab === "interview") {
        intBtn.classList.add("btn-primary");
        availJob.innerText = `${intJobCount} of ${jobCount}`;
    } else if(currTab === "reject") {
        rejectBtn.classList.add("btn-primary");
        availJob.innerText = `${rejectJobCount} of ${jobCount}`;
    }

    if((currTab === "pending" && jobCount === 0) || (currTab === "interview" && intJobCount === 0) || (currTab === "reject" && rejectJobCount === 0)) {
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