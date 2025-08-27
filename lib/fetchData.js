import User from "@/models/user";
import { connectToDatabase } from "./db";
import ficheTechnique from "@/models/service";
import service from "@/models/aaazzz";
import mongoose from "mongoose";
import solution from "@/models/solution";
import calculateur from "@/models/calculateur";
import { PinataSDK } from "pinata";
import Message from "@/models/message";
import Realisation from "@/models/realisation";
import Service from "@/models/service";
import Projet from "@/models/projet";
import { getActiveUsers, getPageViewss, getTotalSessions } from "./actions";

export const fetchUsers = async (page = 1, limit = 5, query ) => {
  try {
    await connectToDatabase();
    const skip = (page - 1) * limit;

    const filter = query
      ? {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { phone: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(filter).skip(skip).limit(limit).lean();
    const totalUsers = await User.countDocuments(filter);

    return { users, totalUsers };
  } catch (error) {
    console.error("Erreur fetchUsers:", error);
    return { users: [], totalUsers: 0 };
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchficheTechniques = async (page = 1, limit = 5) => {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const ficheTechniques = await ficheTechnique
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const totalficheTechniques = await ficheTechnique.countDocuments();

    return {
      ficheTechniques,
      totalficheTechniques,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fiches techniques :",
      error
    );
  }
};
export async function getServiceById(id) {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  const Service = await service.findById(id).lean();
  return JSON.parse(JSON.stringify(Service));
}
export async function getSolutionById(id) {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  const Solution = await solution.findById(id).lean();
  return JSON.parse(JSON.stringify(Solution));
}
export const fetchSolutions = async (page = 1, limit = 5) => {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const solutions = await solution
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    // Convert Mongoose documents to plain objects and serialize ObjectIds
    const serializedSolutions = solutions.map((solution) => ({
      _id: solution._id.toString(),
      name: solution.name || "",
      description: solution.description || "",
      views: solution.views || 0,
      likes: solution.likes || 0,
      telechargement: solution.telechargement || 0,
      pdf: solution.pdf || "",
      avantages: solution.avantages
        ? solution.avantages.map((a) => ({
            titre: a.titre || "",
            description: a.description || "",
            _id: a._id?.toString?.() ?? a._id,
          }))
        : [],
      images: solution.images || [],
      ecarteur: solution.ecarteur || "",
      specifications: solution.specifications
        ? solution.specifications.map((s) => ({
            label: s.label || "",
            value: s.value || "",
            _id: s._id?.toString?.() ?? s._id,
          }))
        : [],
      dessinTechnique: solution.dessinTechnique
        ? {
            sectionBlocs: solution.dessinTechnique.sectionBlocs || "",
            sectionDalle: solution.dessinTechnique.sectionDalle || "",
          }
        : {
            sectionBlocs: "",
            sectionDalle: "",
          },
      processusInstallation: solution.processusInstallation
        ? solution.processusInstallation.map((p) => ({
            etape: p.etape || 0,
            titre: p.titre || "",
            description: p.description || "",
            _id: p._id?.toString?.() ?? p._id,
          }))
        : [],
      certifications: solution.certifications
        ? solution.certifications.map((c) => ({
            titre: c.titre || "",
            description: c.description || "",
            _id: c._id?.toString?.() ?? c._id,
          }))
        : [],
      saviezVous: solution.saviezVous || "",
    }));

    const totalsolutions = await solution.countDocuments();

    return {
      solutions: serializedSolutions,
      totalsolutions,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fiches techniques :",
      error
    );
    return { solutions: [], totalsolutions: 0 };
  }
};
export async function fetchCalculateur() {
  try {
    await connectToDatabase();
    const dernierCalculateur = await calculateur.findOne().sort({ _id: -1 }); // ou `.sort({ createdAt: -1 })` si tu as un champ `timestamps`

    return dernierCalculateur;
  } catch (error) {
    console.error("Erreur lors de la récupération des calculateurs:", error);
    throw new Error("Impossible de récupérer les calculateurs");
  }
}
export async function fetchMessages(page, limit, query) {
  await connectToDatabase();

  const filter = query
    ? {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
          { phone: { $regex: query, $options: 'i' } },
        ],
      }
    : {};

  const messages = await Message.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const totalMessages = await Message.countDocuments(filter);

  return { messages, totalMessages };
}
export async function fetchRealisations(page, limit, query) {
  await connectToDatabase();

  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const realisations = await Realisation.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const totalRealisations = await Realisation.countDocuments(filter);

  return { realisations, totalRealisations };
}


export async function fetchServices(page, limit, query) {
  await connectToDatabase();

  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { icon: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const services = await Service.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const totalServices = await Service.countDocuments(filter);

  return { services, totalServices };
}


export const fetchProjets = async (page, limit, query) => {
  await connectToDatabase();
  const filter = query
    ? { titre: { $regex: query, $options: "i" } }
    : {};

  const projets = await Projet.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const totalProjets = await Projet.countDocuments(filter);

  return { projets, totalProjets };
};

export const fetchCardDash = async () => {
  const cards = [
    {
      id: 1,
      title: "Total Utilisateurs",
      number: 0,
      change: 0,
    },
    {
      id: 2,
      title: "Vues",
      number: 0,
      change: 0,
    },
    {
      id: 3,
      title: "Sessions",
      number: 0,
      change: 0,
    },
  ];

  // --- Récupération des données ---
  const stats = await getPageViewss();
  const viewsThisWeek = await getPageViewss("7daysAgo", "today");
  const viewsLastWeek = await getPageViewss("14daysAgo", "7daysAgo");

  const sessions = await getTotalSessions();
  const sessionsThisWeek = await getTotalSessions("7daysAgo", "today");
  const sessionsLastWeek = await getTotalSessions("14daysAgo", "7daysAgo");
  
  const activeUser = await getActiveUsers();
  const activeUserThisWeek = await getActiveUsers("7daysAgo", "today");
  const activeUserLastWeek = await getActiveUsers("14daysAgo", "7daysAgo");

  // --- Fonction pour calculer la variation en % ---
  const percentChange = (current, previous) => {
    if (!previous || previous === 0) return 0; // évite division par zéro
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  // --- Mise à jour des cartes ---
  cards[0].number = Number(activeUser);
  cards[0].change = percentChange(activeUserThisWeek, activeUserLastWeek);

  cards[1].number = stats.totals.views; // ⚡ ici on prend juste le nombre total
  cards[1].change = percentChange(
    viewsThisWeek.totals.views,
    viewsLastWeek.totals.views
  );

  cards[2].number = Number(sessions);
  cards[2].change = percentChange(sessionsThisWeek, sessionsLastWeek);

  return cards;
};
