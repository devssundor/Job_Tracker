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