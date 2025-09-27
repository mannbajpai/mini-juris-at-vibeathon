// Dynamic users storage - gets updated when new speakers sign up
export let dynamicSpeakers = [];

// Function to add a new speaker dynamically
export function addSpeaker(speakerData) {
  dynamicSpeakers.push(speakerData);
}

// Function to get all dynamic speakers
export function getDynamicSpeakers() {
  return dynamicSpeakers;
}

// Function to check if email exists in dynamic speakers
export function emailExistsInDynamic(email) {
  return dynamicSpeakers.some(speaker => speaker.email === email);
}