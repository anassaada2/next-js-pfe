"use server";

import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import ficheTechnique from "@/models/service";
import { sanitizeForClient } from "@/lib/sanitizeForClient";
import { revalidatePath } from "next/cache";
import service from "@/models/aaazzz";
import { certif } from "@/data/site";
import solution from "@/models/solution";
import Calculateur from "@/models/calculateur";
import Pinata from "@pinata/sdk"; 
import Message from "@/models/message";
import Realisation from "@/models/realisation"
import Service from "@/models/service";
import Projet from "@/models/projet";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import path from "path";
export const addUser = async (formData) => {
  const { username, email, password, role, phone } = formData;

  try {
    await connectToDatabase();

    // Vérifier si un utilisateur avec ce téléphone existe déjà
    if (phone) {
      const existingPhoneUser = await User.findOne({ phone });
      if (existingPhoneUser) {
        return {
          error: "Un utilisateur avec ce numéro de téléphone existe déjà.",
        };
      }
    }

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return {
        error: "Un utilisateur avec cet email existe déjà.",
      };
    }

    // Vérifier si un utilisateur avec ce username existe déjà
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return {
        error: "Ce nom d'utilisateur est déjà utilisé.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      status: "active",
    });

    await newUser.save();
    revalidatePath("/dashboard/users");
  } catch (error) {
    return {
      error: error.message || "An unexpected error occurred",
    };
  }
};
export const updateUser = async (data) => {
  const { id, username, email, password, role, phone, status } = data;

  try {
    await connectToDatabase();

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return { error: "Utilisateur introuvable." };
    }

    // Vérifier si un autre utilisateur a déjà ce username
    if (username !== existingUser.username) {
      const usernameTaken = await User.findOne({ username });
      if (usernameTaken) {
        return { error: "Ce nom d'utilisateur est déjà utilisé." };
      }
    }

    // Vérifier si un autre utilisateur a déjà cet email
    if (email !== existingUser.email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return { error: "Un utilisateur avec cet email existe déjà." };
      }
    }

    // Vérifier si un autre utilisateur a déjà ce téléphone
    if (phone && phone !== existingUser.phone) {
      const phoneTaken = await User.findOne({ phone });
      if (phoneTaken) {
        return { error: "Un utilisateur avec ce téléphone existe déjà." };
      }
    }

    // Mise à jour des champs
    existingUser.username = username;
    existingUser.email = email;
    existingUser.role = role;
    existingUser.status = status;
    existingUser.phone = phone;

    if (password) {
      existingUser.password = await bcrypt.hash(password, 10);
    }

    await existingUser.save();
    revalidatePath("/dashboard/users");

    return { success: true };
  } catch (error) {
    return { error: error.message || "Une erreur inattendue est survenue." };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDatabase();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};
export const deleteficheTechnique = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDatabase();
    await ficheTechnique.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete fiche Technique!");
  }

  revalidatePath("/dashboard/products");
};
export const updateficheTechnique = async (formData) => {
  const {
    id,
    name,
    description,
    caracteristiques,
    exigences_qualite,
    avantages,
    dessin_technique,
    support_technique,
  } = formData;

  try {
    await connectToDatabase();

    const updatedFiche = await ficheTechnique
      .findByIdAndUpdate(
        id,
        {
          name,
          description,
          caracteristiques,
          exigences_qualite,
          avantages,
          dessin_technique,
          support_technique,
        },
        { new: true }
      )
      .lean();

    if (!updatedFiche) {
      return { success: false, error: "Fiche non trouvée." };
    }

    const cleanedFiche = sanitizeForClient(updatedFiche);

    revalidatePath("/dashboard/fiches-techniques");

    return { success: true, fiche: cleanedFiche };
  } catch (err) {
    console.error("Erreur update:", err);
    return { success: false, error: err.message };
  }
};

export const addFicheTechnique = async (formData) => {
  const {
    name,
    description,
    caracteristiques,
    exigences_qualite,
    avantages,
    dessin_technique,
    quantite_beton_equivalente,
    support_technique,
  } = formData;

  try {
    await connectToDatabase();

    const newFiche = await ficheTechnique.create({
      name,
      description,
      caracteristiques,
      exigences_qualite,
      avantages,
      dessin_technique,
      quantite_beton_equivalente,
      support_technique,
    });
    const plainFiche = newFiche.toObject(); // Convert to plain object
    plainFiche._id = plainFiche._id.toString(); // serialize l'ObjectId
    revalidatePath("/dashboard/fiches-techniques");

    return { success: true, fiche: plainFiche };
  } catch (error) {
    console.error("Erreur lors de l'ajout de la fiche technique :", error);
    return { success: false, error: error.message };
  }
};
export const updateService = async (serviceId, formData) => {
  const {
    name,
    description,
    avantages,
    images,
    ecarteur,
    specifications,
    dessinTechnique,
    pdf,
    processusInstallation,
    saviezVous,
    certifications, // <-- nouveau champ
  } = formData;

  try {
    await connectToDatabase();

    const updatedService = await service.findByIdAndUpdate(
      serviceId,
      {
        name,
        description,
        avantages,
        images,
        ecarteur,
        specifications,
        dessinTechnique,
        pdf,
        processusInstallation,
        saviezVous,
        certifications, // <-- nouveau champ inclus
      },
      { new: true }
    );

    if (!updatedService) {
      return { success: false, error: "Service introuvable." };
    }

    const plainService = updatedService.toObject();
    plainService._id = plainService._id.toString();

    revalidatePath("/dashboard/services"); // chemin à adapter selon ton projet

    return { success: true, service: plainService };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service :", error);
    return { success: false, error: error.message };
  }
};
export const insertCertifications = async (serviceId) => {
  try {
    await connectToDatabase();

    const updatedService = await service.findByIdAndUpdate(
      serviceId,
      { $set: { certifications: certif } },
      { new: true }
    );

    if (!updatedService) {
      return { success: false, error: "Service introuvable" };
    }

    return { success: true, data: updatedService };
  } catch (error) {
    console.error("Erreur insertion certifications:", error);
    return { success: false, error: error.message };
  }
};

export const addSolution = async (formData) => {
  const {
    name,
    description,
    avantages,
    images,
    ecarteur,
    specifications,
    dessinTechnique,
    pdf,
    processusInstallation,
    certifications,
    saviezVous,
  } = formData;

  try {
    await connectToDatabase();

    const newSolution = await solution.create({
      name,
      description,
      avantages,
      images,
      ecarteur,
      specifications,
      dessinTechnique,
      pdf,
      processusInstallation,
      certifications,
      saviezVous,
    });

    const plainSolution = newSolution.toObject();
    plainSolution._id = plainSolution._id.toString();

    if (plainSolution.avantages) {
      plainSolution.avantages = plainSolution.avantages.map((a) => ({
        ...a,
        _id: a._id?.toString?.() ?? a._id,
      }));
    }
    if (plainSolution.certifications) {
      plainSolution.certifications = plainSolution.certifications.map((c) => ({
        ...c,
        _id: c._id?.toString?.() ?? c._id,
      }));
    }
    if (plainSolution.specifications) {
      plainSolution.specifications = plainSolution.specifications.map((s) => ({
        ...s,
        _id: s._id?.toString?.() ?? s._id,
      }));
    }
    if (plainSolution.processusInstallation) {
      plainSolution.processusInstallation = plainSolution.processusInstallation.map((p) => ({
        ...p,
        _id: p._id?.toString?.() ?? p._id,
      }));
    }

    revalidatePath("/dashboard/solutions");
    return { success: true, solution: plainSolution };
  } catch (error) {
    console.error("Erreur lors de l'ajout de la solution :", error);
    return { success: false, error: error.message };
  }
};

export const deleteSolution = async (formData) => {
  try {
    await connectToDatabase();

    const { id } = Object.fromEntries(formData);

    if (!id) {
      return { success: false, error: "ID manquant." };
    }

    const deleted = await solution.findByIdAndDelete(id);

    if (!deleted) {
      return { success: false, error: "Solution introuvable." };
    }

    revalidatePath("/dashboard/solutions");
    return { success: true, message: "Solution supprimée avec succès." };
  } catch (error) {
    console.error("Erreur lors de la suppression de la solution :", error);
    return { success: false, error: error.message };
  }
};

export const editSolution = async (formData) => {
  const {
    id,
    name,
    description,
    avantages,
    images,
    ecarteur,
    specifications,
    dessinTechnique,
    pdf,
    processusInstallation,
    certifications,
    saviezVous,
  } = formData;

  if (!id) {
    return { success: false, error: "ID manquant." };
  }

  try {
    await connectToDatabase();

    const existingSolution = await solution.findById(id);
    if (!existingSolution) {
      return { success: false, error: "Solution introuvable." };
    }

    const updatedSolution = await solution.findByIdAndUpdate(
      id,
      {
        name,
        description,
        avantages,
        images,
        ecarteur,
        specifications,
        dessinTechnique,
        pdf,
        processusInstallation,
        certifications,
        saviezVous,
      },
      { new: true }
    );

    const plainSolution = updatedSolution.toObject();
    plainSolution._id = plainSolution._id.toString();

    if (plainSolution.avantages) {
      plainSolution.avantages = plainSolution.avantages.map((a) => ({
        ...a,
        _id: a._id?.toString?.() ?? a._id,
      }));
    }
    if (plainSolution.certifications) {
      plainSolution.certifications = plainSolution.certifications.map((c) => ({
        ...c,
        _id: c._id?.toString?.() ?? c._id,
      }));
    }
    if (plainSolution.specifications) {
      plainSolution.specifications = plainSolution.specifications.map((s) => ({
        ...s,
        _id: s._id?.toString?.() ?? s._id,
      }));
    }
    if (plainSolution.processusInstallation) {
      plainSolution.processusInstallation = plainSolution.processusInstallation.map((p) => ({
        ...p,
        _id: p._id?.toString?.() ?? p._id,
      }));
    }

    revalidatePath("/dashboard/solutions");
    return { success: true, solution: plainSolution };
  } catch (error) {
    console.error("Erreur lors de la modification de la solution :", error);
    return { success: false, error: error.message };
  }
};
const pinata = new Pinata({
  pinataJWTKey: process.env.PINATA_JWT,
});

const extractCID = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export const deleteCalculateur = async (formData) => {
  try {
    await connectToDatabase();

    const id = formData.get("id");

    const calculateur = await Calculateur.findById(id);
    if (!calculateur) {
      return {
        success: false,
        error: "Calculateur non trouvé",
      };
    }

    // Supprimer le fichier de Pinata
    if (calculateur.url) {
      try {
        const cid = extractCID(calculateur.url);
        await pinata.unpin(cid);
      } catch (pinataError) {
        console.error("Erreur Pinata (suppression fichier) :", pinataError);
        // Optionnel : return ici si vous voulez empêcher suppression BDD si Pinata échoue
      }
    }

    await Calculateur.findByIdAndDelete(id);
    revalidatePath('/dashboard/calculateur')

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du calculateur:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression du calculateur",
    };
  }
};

export const deletePinataFile = async (formData) => {
  try {
    const url = formData.get("url");
    const id = formData.get("id");

    if (!url) {
      return { success: false, error: "URL manquante" };
    }

    const cid = extractCID(url);
    await pinata.unpin(cid);

    // Mise à jour de la base : suppression de l'URL mais on garde le calculateur
    await connectToDatabase();
    await Calculateur.findByIdAndUpdate(id, { url: "" });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier Pinata:", error);
    return { success: false, error: "Erreur Pinata" };
  }
};

export async function addCalculateur(data) {
  try {
    await connectToDatabase();

    const calculateur = new Calculateur({
      name: data.name,
      url: data.url,
      telechargement: data.telechargement || 0,
      views: { total: 0, users: [] },
    });

    await calculateur.save();

    return { success: true };
  } catch (error) {
    console.error("Erreur ajout calculateur:", error);
    return { success: false, error: "Erreur ajout calculateur" };
  }
}

export async function updateCalculateur(data) {
  try {
    await connectToDatabase();

    const updated = await Calculateur.findByIdAndUpdate(
      data.id,
      {
        name: data.name,
        url: data.url,
        telechargement: data.telechargement || 0,
      },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Calculateur non trouvé" };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur mise à jour:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour du calculateur",
    };
  }
}
export async function addMessage(prevState, formData) {
  try {
    await connectToDatabase();

    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !phone || !email || !message) {
      return { success: false, error: 'Tous les champs sont requis.' };
    }

    await Message.create({  name, phone, email, message });

    return { success: true };
  } catch (error) {
    console.error('Erreur dans addMessage:', error);
    return { success: false, error: 'Erreur lors de l\'envoi du message.' };
  }
}
export async function markMessageAsRead(id) {
  try {
    await connectToDatabase();
    if (!id) throw new Error("ID manquant");

    await Message.findByIdAndUpdate(id, {
      isRead: true,
      readAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur markMessageAsRead:", error);
    return { success: false };
  }
}
export async function deleteMessage(formData) {
  try {
    await connectToDatabase();

    const id = formData.get("id");
    if (!id) throw new Error("ID manquant");

    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) throw new Error("Message introuvable");

    revalidatePath("/dashboard/message");

    // ✅ Ne fais pas de redirect ici.
    return { success: true };
  } catch (err) {
    console.error("Erreur suppression :", err);
    return { success: false, error: err.message };
  }
}
export const deleteRealisation = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDatabase();
    await Realisation.findByIdAndDelete(id);
    revalidatePath("/dashboard/realisations");
  } catch (err) {
    console.error("Failed to delete realisation:", err);
    throw new Error("Failed to delete realisation!");
  }
};
export const deleteService = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDatabase();
    await Service.findByIdAndDelete(id);
    revalidatePath("/dashboard/services");
  } catch (err) {
    console.error("Failed to delete service:", err);
    throw new Error("Failed to delete service!");
  }
};
export async function ajouterProjet(formData) {
  try {
    await connectToDatabase();
    const projet = new Projet(formData);
    await projet.save();
    revalidatePath("/dashboard/projets");

    return { success: true };
  } catch (error) {
    console.error("Erreur ajout projet:", error);
    return { success: false, error: "Erreur serveur" };
  }
}


export async function updateProjet(id, updatedData) {
  try {
    await connectToDatabase();
    await Projet.findByIdAndUpdate(id, updatedData, { new: true });
    revalidatePath("/dashboard/projets");
    return { success: true };
  } catch (error) {
    console.error("Erreur modification projet:", error);
    return { success: false, error: "Erreur serveur" };
  }
}


export async function deleteProjet(idOrFormData) {
  try {
    await connectToDatabase();

    let id = idOrFormData;
    // Si c'est un FormData, extraire l'id
    if (idOrFormData instanceof FormData) {
      id = idOrFormData.get("id");
    }

    await Projet.findByIdAndDelete(id);
    revalidatePath("/dashboard/projets");
    return { success: true };
  } catch (error) {
    console.error("Erreur suppression projet:", error);
    return { success: false, error: "Erreur serveur" };
  }
}
// Runs a simple report.


const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});
export async function getActiveUsersRealtime() {
  const [response] = await analyticsDataClient.runRealtimeReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    metrics: [{ name: "activeUsers" }],
  });

  return response.rows?.[0]?.metricValues?.[0]?.value || 0;
}



export async function getUniqueUsers() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [
      { startDate: "2025-01-01", endDate: "today" } // depuis création
    ],
    metrics: [{ name: "totalUsers" }], // total unique users
  });

  return Number(response.rows?.[0]?.metricValues?.[0]?.value || 0);
}

export async function getActiveUsersForPage(path) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [
      { startDate: "2025-01-01", endDate: "today" }
    ],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "activeUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { matchType: "EXACT", value: path }
      }
    }
  });

  return response.rows[0]?.metricValues[0]?.value || 0;
}
export async function getCalculatorUsers() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "2025-08-08", endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "activeUsers" }],
    dimensionFilter: {
      andGroup: {
        expressions: [
          {
            filter: {
              fieldName: "pagePath",
              stringFilter: { matchType: "EXACT", value: "/calculette" }
            }
          },
          {
            filter: {
              fieldName: "eventName",
              stringFilter: { matchType: "EXACT", value: "page_view" }
            }
          }
        ]
      }
    }
  });

  return response.rows[0]?.metricValues[0]?.value || 0;
}

export async function getTotalSessions(startDate = "30daysAgo", endDate = "today") {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [
      { startDate, endDate }
    ],
    metrics: [{ name: "sessions" }],
  });

  return parseInt(response.rows?.[0]?.metricValues?.[0]?.value || "0", 10);
}




export async function getUserSessions() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: "2025-08-08", endDate: "today" }],
      dimensions: [
        { name: "pagePath" },  // pages consultées
        { name: "country" },   // pays
      ],
      metrics: [
        { name: "activeUsers" },     // visiteurs uniques
        { name: "screenPageViews" }, // vues
        { name: "sessions" },        // sessions
      ],
    });

    const rows = response.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value || "N/A",
      country: row.dimensionValues?.[1]?.value || "N/A",
      users: Number(row.metricValues?.[0]?.value || "0"),
      views: Number(row.metricValues?.[1]?.value || "0"),
      sessions: Number(row.metricValues?.[2]?.value || "0"),
    })) || [];

    // Filtrer uniquement les pages utiles
    const filtered = rows.filter(r =>
      r.page === "/contact" ||
      r.page === "/" ||
      r.page === "/calculette" ||
      r.page === "/services" ||
      r.page === "/realisations" ||
      r.page === "/about" ||
      r.page.startsWith("/solutions/") // capture toutes les solutions dynamiques
    );

    // Agrégation
    const stats = {
      contact: filtered.filter(r => r.page === "/contact").reduce((a, b) => a + b.users, 0),
      home: filtered.filter(r => r.page === "/").reduce((a, b) => a + b.users, 0),
      calculette: filtered.filter(r => r.page === "/calculette").reduce((a, b) => a + b.users, 0),
      services: filtered.filter(r => r.page === "/services").reduce((a, b) => a + b.users, 0),
      realisations: filtered.filter(r => r.page === "/realisations").reduce((a, b) => a + b.users, 0),
      about: filtered.filter(r => r.page === "/about").reduce((a, b) => a + b.users, 0),
      solutions: filtered
        .filter(r => r.page.startsWith("/solutions/"))
        .reduce((a, b) => a + b.users, 0),

      totals: {
        users: filtered.reduce((a, b) => a + b.users, 0),
        views: filtered.reduce((a, b) => a + b.views, 0),
        sessions: filtered.reduce((a, b) => a + b.sessions, 0),
      },

      details: filtered,
    };

    return stats;
  } catch (error) {
    console.error("Erreur récupération sessions:", error);
    return {
      contact: 0, home: 0, calculette: 0, services: 0, realisations: 0, about: 0, solutions: 0,
      totals: { users: 0, views: 0, sessions: 0 },
      details: []
    };
  }
}



export async function getInfoAnalytic() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: "2025-08-08", endDate: "today" }],
      dimensions: [
        { name: "pagePath" },  // pages consultées
        { name: "country" },   // régions/pays
      ],
      metrics: [
        { name: "activeUsers" },       // nombre de visiteurs uniques
        { name: "screenPageViews" },   // nombre de vues de pages
        { name: "sessions" },          // nombre de sessions
        { name: "eventCount" },        // événements (downloads, clics…)
      ],
    });

    const rows = response.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value || "N/A",
      country: row.dimensionValues?.[1]?.value || "N/A",
      users: Number(row.metricValues?.[0]?.value || "0"),
      views: Number(row.metricValues?.[1]?.value || "0"),
      sessions: Number(row.metricValues?.[2]?.value || "0"),
      events: Number(row.metricValues?.[3]?.value || "0"),
    })) || [];

    // Agrégation utile
    const stats = {
      home: rows.filter(r => r.page === "/").reduce((a, b) => a + b.users, 0),
      calculette: rows.filter(r => r.page === "/calculette").reduce((a, b) => a + b.users, 0),
      ecoboot: rows.filter(r => r.page === "/ecoboot").reduce((a, b) => a + b.users, 0),
      polyboot: rows.filter(r => r.page === "/polyboot").reduce((a, b) => a + b.users, 0),
      others: rows.filter(r =>
        !["/", "/calculette", "/ecoboot", "/polyboot"].includes(r.page)
      ).reduce((a, b) => a + b.users, 0),

      downloads: {
        ecoboot: rows.filter(r => r.page.includes("ecoboot") && r.events > 0).reduce((a, b) => a + b.events, 0),
        polyboot: rows.filter(r => r.page.includes("polyboot") && r.events > 0).reduce((a, b) => a + b.events, 0),
      },

      totals: {
        users: rows.reduce((a, b) => a + b.users, 0),
        views: rows.reduce((a, b) => a + b.views, 0),
        sessions: rows.reduce((a, b) => a + b.sessions, 0),
      },

      details: rows,
    };
    return rows;
  } catch (error) {
    console.error("Erreur récupération sessions:", error);
    return {
      home: 0, calculette: 0, ecoboot: 0, polyboot: 0, others: 0,
      downloads: { ecoboot: 0, polyboot: 0 },
      totals: { users: 0, views: 0, sessions: 0 },
      details: []
    };
  }
}
export async function getDownloadStats() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [
      { name: "eventName" },
      { name: "customEvent:service" }, 
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: { value: "download_pdf" },
      },
    },
  });

  return response.rows?.map((row) => ({
    event: row.dimensionValues[0].value,   // eventName (download_pdf)
    service: row.dimensionValues[1].value, // service name (ton param envoyé)
    count: row.metricValues[0].value,      // nombre de téléchargements
  }));
}
export async function getPageViewss(startDate = "30daysAgo", endDate = "today") {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }], // pages consultées
    metrics: [{ name: "screenPageViews" }], // vues
  });

  const rows =
    response.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value || "N/A",
      views: Number(row.metricValues?.[0]?.value || "0"),
    })) || [];

  // Filtrer uniquement les pages utiles
  const filtered = rows.filter(
    (r) =>
      r.page === "/contact" ||
      r.page === "/" ||
      r.page === "/calculette" ||
      r.page === "/services" ||
      r.page === "/realisations" ||
      r.page === "/about" ||
      r.page.startsWith("/solutions/") // capture toutes les solutions dynamiques
  );

  // Agrégation (⚡ correction : utiliser views au lieu de users)
  const stats = {
    contact: filtered
      .filter((r) => r.page === "/contact")
      .reduce((a, b) => a + b.views, 0),
    home: filtered
      .filter((r) => r.page === "/")
      .reduce((a, b) => a + b.views, 0),
    calculette: filtered
      .filter((r) => r.page === "/calculette")
      .reduce((a, b) => a + b.views, 0),
    services: filtered
      .filter((r) => r.page === "/services")
      .reduce((a, b) => a + b.views, 0),
    realisations: filtered
      .filter((r) => r.page === "/realisations")
      .reduce((a, b) => a + b.views, 0),
    about: filtered
      .filter((r) => r.page === "/about")
      .reduce((a, b) => a + b.views, 0),
    solutions: filtered
      .filter((r) => r.page.startsWith("/solutions/"))
      .reduce((a, b) => a + b.views, 0),

    totals: {
      views: filtered.reduce((a, b) => a + b.views, 0),
    },

    details: filtered,
  };

  return stats;
}



/*-------------------------------------------*/


export async function getDownloadStats2() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "7daysAgo", endDate: "today" }], // stats de la semaine
    dimensions: [
      { name: "dayOfWeekName" },   // 👈 ajouter le jour de la semaine
    ],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: { value: "download_pdf" },
      },
    },
  });

  // transformer en dataset exploitable pour ton <LineChart>
  return response.rows?.map((row) => ({
    name: row.dimensionValues[0].value, // "Monday", "Tuesday", …
    downloads: Number(row.metricValues[0].value), // nombre de downloads
  }));
}
export async function getActiveUsers(startDate = "30daysAgo", endDate = "today") {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
   metrics: [{ name: "activeUsers" }],
   
  });

return response.rows[0]?.metricValues[0]?.value || 0;
}