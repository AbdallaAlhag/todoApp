import arrayModule from "./createTodo";
import { differenceInDays,parseISO } from 'date-fns';



{/* <nav class="date">
<div class="home-container"><button class="side-bar-button" id="home">Home</button></div>
<div class="today-container"><button class="side-bar-button" id="today">Today</button></div>
<week-container><button class="side-bar-button" id="week">Week</button></week-container>
</nav> */}


export function countTodo() {
    const homeContainer = document.querySelector('#home-container');
    const todayContainer = document.querySelector('#today-container');
    const weekContainer = document.querySelector('#week-container');

    const arr = arrayModule.getArray();

    let countHome = 0;
    let countToday = 0;
    let countWeek = 0;

    const currentDay = new Date();
    for (const obj of arr) {
        countHome += 1;
        const date = parseISO(obj.dueDate);
        const diff = differenceInDays(date, currentDay);
        console.log(`date: ${date}, difference: ${diff}`);
        if (diff === 0) {
            countToday += 1;
        }
        if (diff <= 7 && diff >= 0) {
            countWeek += 1;
        }
    }

    function updateCounter(container, count) {
        let counterElement = container.querySelector('.counter');
        if (!counterElement && count > 0) {
            counterElement = document.createElement('div');
            counterElement.classList.add('counter');
            container.appendChild(counterElement);
        }

        if (counterElement) {
            if (count > 0) {
                counterElement.textContent = count;
            } else {
                counterElement.remove();
            }
        }
    }

    updateCounter(homeContainer, countHome);
    updateCounter(todayContainer, countToday);
    updateCounter(weekContainer, countWeek);
}

