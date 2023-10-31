import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="countdown"
export default class extends Controller {
  static targets = ["countdown"];

  connect() {
    console.log("connected")

    this.secondsUntilEnd = this.countdownTarget.dataset.secondsUntilEndValue;


    const now = new Date().getTime();
    this.endTime = new Date(now + this.secondsUntilEnd * 1000);

    this.countdown = setInterval(this.countdown.bind(this), 200);

  }


  countdown() {
    const now = new Date();
    const secondsRemaining = (this.endTime - now) / 1000;

    if (secondsRemaining <= 0) {
      clearInterval(this.countdown);
      this.countdownTarget.innerHTML = "Congratulations on reaching the end of Term! 😊";
      return;
    }
    const secondsPerWeek = 604800;
    const secondsPerDay = 84600;
    const secondsPerHour = 3600;
    const secondsPerMinute = 60;

    const totalDays = Math.floor(secondsRemaining / secondsPerDay);
    const weeks = Math.floor(totalDays / 7);
    const weekdays = totalDays - weeks * 2;

    const hours = Math.floor((secondsRemaining % secondsPerDay) / secondsPerHour);
    const minutes = Math.floor((secondsRemaining % secondsPerHour) / secondsPerMinute);
    const seconds = Math.floor(secondsRemaining % secondsPerMinute);

    this.countdownTarget.innerHTML = `${totalDays} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds... <br> That's just ${weekdays} school getups to go!`;

  }

}
