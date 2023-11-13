import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="countdown"

export default class extends Controller {
  static targets = ["countdown"];

  connect() {
    this.secondsUntilEnd = this.countdownTarget.dataset.secondsUntilEndValue;

    this.isNameEndOfTerm =
      this.countdownTarget.dataset.countdownName === "end of term";

    const now = new Date().getTime();
    this.endTime = new Date(now + this.secondsUntilEnd * 1000);

    this.countdown = setInterval(this.countdown.bind(this), 200);
  }

  countdown() {
    const now = new Date();
    const secondsRemaining = (this.endTime - now) / 1000;

    if (secondsRemaining <= 0) {
      clearInterval(this.countdown);

      if (this.isNameEndOfTerm) {
        this.countdownTarget.innerHTML =
          "Congratulations on reaching the end of Term! 😊";
        return;
      }
      this.countdownTarget.innerHTML = "Time's up!";
      return;
    }
    const secondsPerWeek = 604800;
    const secondsPerDay = 84600;
    const secondsPerHour = 3600;
    const secondsPerMinute = 60;

    const totalDays = Math.floor(secondsRemaining / secondsPerDay);
    const weeks = Math.floor(totalDays / 7);
    const weekdays = totalDays - weeks * 2;

    const hours = Math.floor(
      (secondsRemaining % secondsPerDay) / secondsPerHour
    );
    const minutes = Math.floor(
      (secondsRemaining % secondsPerHour) / secondsPerMinute
    );
    const seconds = Math.floor(secondsRemaining % secondsPerMinute);

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const message = this.isNameEndOfTerm
      ? `<h1>That's just ${weekdays} school getups to go!</h1>`
      : `<h1>Keep going!</h1>`;

    this.countdownTarget.innerHTML = `
    <div class="countdown">
      <ul>
        <li><span class="days">${totalDays}</span>days</li>
        <li><span class="hours">${formattedHours}</span>hours</li>
        <li class="seperator">:</li>
        <li><span class="minutes">${formattedMinutes}</span>minutes</li>
        <li class="seperator">:</li>
        <li><span class="seconds">${formattedSeconds}</span>seconds</li>
      </ul>
    </div>
    ${message}
    `;
  }
}
