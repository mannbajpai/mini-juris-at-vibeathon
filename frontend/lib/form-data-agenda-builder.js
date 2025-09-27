// Local storage for agenda builder form data
export let agendaData = [];

// Function to add new agenda data
export function addAgendaData(data) {
  agendaData.push(data);
}

// Function to update existing agenda data
export function updateAgendaData(data) {
  agendaData = [data]; // Replace with new data since it's a single event
}

// Function to get agenda data
export function getAgendaData() {
  return agendaData;
}

// Function to check if agenda data exists
export function hasAgendaData() {
  return agendaData.length > 0;
}