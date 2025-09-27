// Local storage for speaker proposals
let proposals = [];

// Function to get all proposals
export function getAllProposals() {
  return proposals;
}

// Function to get proposals by speaker email
export function getProposalsByEmail(speakerEmail) {
  return proposals.filter(proposal => proposal.speakerEmail === speakerEmail);
}

// Function to add a new proposal
export function addProposal(proposalData) {
  const newProposal = {
    id: Date.now().toString(),
    ...proposalData,
    status: "Pending",
    submissionDate: new Date().toISOString(),
  };
  proposals.push(newProposal);
  return newProposal;
}

// Function to update an existing proposal
export function updateProposal(proposalId, proposalData) {
  const index = proposals.findIndex(p => p.id === proposalId);
  if (index !== -1) {
    proposals[index] = {
      ...proposals[index],
      ...proposalData,
      updatedAt: new Date().toISOString(),
    };
    return proposals[index];
  }
  return null;
}

// Function to delete a proposal
export function deleteProposal(proposalId) {
  const index = proposals.findIndex(p => p.id === proposalId);
  if (index !== -1) {
    return proposals.splice(index, 1)[0];
  }
  return null;
}

// Function to find a proposal by ID
export function findProposalById(proposalId) {
  return proposals.find(p => p.id === proposalId);
}