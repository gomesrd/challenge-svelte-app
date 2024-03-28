import { writable } from 'svelte/store';

const initialTimeLeft = 15;
export const countdown = writable(initialTimeLeft);
export const challengeStarted = writable(false);
export const challengeFinished = writable(false);
export let countdownInterval: NodeJS.Timeout;

export const startChallenge = () => {
	resetCountDown();
	startCountdown();
	challengeStarted.set(true);
};

export const resetCountDown = () => {
	clearInterval(countdownInterval);
	countdown.set(initialTimeLeft);
	challengeStarted.set(false);
	challengeFinished.set(false);
};

export const startCountdown = () => {
	countdownInterval = setInterval(() => {
		countdown.update((value) => {
			if (value > 0) {
				return value - 1;
			} else {
				clearInterval(countdownInterval);
				return value;
			}
		});
	}, 1000);
};
