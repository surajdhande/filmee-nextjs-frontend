import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/investors";

// Dummy data — replace with API call when backend is ready
const DUMMY_OPPORTUNITIES = [
  {
    id: 1,
    title: "The Last Frame",
    genre: "Thriller",
    director: "John Director",
    phase: "Pre-Production",
    risk: "Medium Risk",
    riskColor: "yellow",
    phaseColor: "green",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    description:
      "A psychological thriller about a photographer who discovers sinister secrets in his photos.",
    targetROI: "25%",
    timeline: "8 months",
    minInvestment: "$10,000",
    investorsCount: 12,
    fundingRaised: 180000,
    fundingTarget: 250000,
    highlights: ["Experienced director", "Strong script", "Market-tested concept"],
    location: "Los Angeles, CA",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Silent Echoes",
    genre: "Drama",
    director: "Sarah Williams",
    phase: "Development",
    risk: "Low Risk",
    riskColor: "green",
    phaseColor: "blue",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    description:
      "An intimate drama exploring themes of loss and redemption in modern urban setting.",
    targetROI: "22%",
    timeline: "6 months",
    minInvestment: "$5,000",
    investorsCount: 8,
    fundingRaised: 45000,
    fundingTarget: 180000,
    highlights: ["Award-winning director", "A-list cast attached", "Festival circuit potential"],
    location: "New York, NY",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Neon Nights",
    genre: "Sci-Fi",
    director: "Mike Chen",
    phase: "Pre-Production",
    risk: "High Risk",
    riskColor: "red",
    phaseColor: "green",
    image:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80",
    description:
      "A cyberpunk thriller set in a neon-soaked future metropolis with stunning visuals.",
    targetROI: "30%",
    timeline: "12 months",
    minInvestment: "$25,000",
    investorsCount: 5,
    fundingRaised: 125000,
    fundingTarget: 500000,
    highlights: ["Innovative VFX", "Genre-defining script", "International co-production"],
    location: "Tokyo, Japan",
    rating: 4.5,
  },
  {
    id: 4,
    title: "Mountain Peak",
    genre: "Adventure",
    director: "Emma Adventure",
    phase: "Production",
    risk: "Low Risk",
    riskColor: "green",
    phaseColor: "orange",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    description:
      "An epic tale of survival against nature's forces, filmed in breathtaking locations.",
    targetROI: "20%",
    timeline: "10 months",
    minInvestment: "$15,000",
    investorsCount: 16,
    fundingRaised: 240000,
    fundingTarget: 300000,
    highlights: ["Stunning cinematography", "True story adaptation", "Distribution deal secured"],
    location: "Vancouver, BC",
    rating: 4.7,
  },
];

/**
 * Fetches investment opportunities.
 * Currently returns dummy data — swap to API call when backend is ready:
 *   const response = await axios.get(`${API_BASE_URL}/opportunities`);
 *   return response.data.opportunities;
 */
export const getInvestmentOpportunities = async () => {
  // TODO: Replace with real API call
  // const response = await axios.get(`${API_BASE_URL}/opportunities`);
  // return response.data.opportunities;
  return DUMMY_OPPORTUNITIES;
};
