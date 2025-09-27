// Local storage for registered speakers
let registeredSpeakers = [];

// Function to get all registered speakers
export function getAllSpeakers() {
  return registeredSpeakers;
}

// Function to add a new speaker
export function addSpeaker(speakerData) {
  const newSpeaker = {
    ...speakerData,
    registrationDate: new Date().toISOString(),
  };
  registeredSpeakers.push(newSpeaker);
  return newSpeaker;
}

// Function to update an existing speaker
export function updateSpeaker(email, speakerData) {
  const index = registeredSpeakers.findIndex(speaker => speaker.email === email);
  if (index !== -1) {
    registeredSpeakers[index] = {
      ...speakerData,
      registrationDate: registeredSpeakers[index].registrationDate, // Keep original registration date
      updatedAt: new Date().toISOString(),
    };
    return registeredSpeakers[index];
  }
  return null;
}

// Function to find a speaker by email
export function findSpeakerByEmail(email) {
  return registeredSpeakers.find(speaker => speaker.email === email);
}

// Function to check if speaker exists
export function isSpeakerRegistered(email) {
  return registeredSpeakers.some(speaker => speaker.email === email);
}