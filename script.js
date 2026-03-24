import { jobs } from'./jobs.js';

console.log(jobs.job10);

let currTab = 'pending';

const totalJob = document.getElementById('total-amount');
const intJob = document.getElementById('interview-amount');
const rejectJob = document.getElementById('rejected-amount');

const availJob = document.getElementById('job-count');

let jobCount = Number(Object.keys(jobs).length);
let intJobCount = 0;
let rejectJobCount = 0;

function noJobRender(){
    document.getElementById('jobs').innerHTML = `
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

function stateChangeJobRender(){
    totalJob.innerText = jobCount;
    availJob.innerText = jobCount;
    intJob.innerText = intJobCount;
    rejectJob.innerText = rejectJobCount;
}

function handleRender(currTab){
    const jobContainer = document.getElementById('jobs');
    jobContainer.innerHTML = '';

    for( const job in jobs){
        const currJob = jobs[job];

        if( currTab === 'pending' || currJob.Status === currTab){
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