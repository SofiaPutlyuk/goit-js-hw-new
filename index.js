const settingTime = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2025') 
});

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.initTimer();
    }

    initTimer() {
        this.interval = setInterval(this.updateTimer.bind(this), 1000);
    }
/*bind - це метод за допомогою якого JavaScript повертає функцію з this ,бачила один приклад на ютубі*/
    updateTimer() {
        const nowTime = new Date();
        const time = this.targetDate - nowTime;

        const searchDaysValue = document.querySelector('span[data-value="days"]');
        const searchHoursValue = document.querySelector('span[data-value="hours"]');
        const searchMinsValue = document.querySelector('span[data-value="mins"]');
        const searchSecsValue = document.querySelector('span[data-value="secs"]');
        
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        searchDaysValue.textContent = days;
        
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        searchHoursValue.textContent = hours;
        
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        searchMinsValue.textContent = mins;
        
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        searchSecsValue.textContent = secs;
        
        if (time <= 0) {
            clearInterval(this.interval);
            searchDaysValue.textContent = "0";
            searchHoursValue.textContent = "0";
            searchMinsValue.textContent = "0";
            searchSecsValue.textContent = "0";
        }
    }
}

