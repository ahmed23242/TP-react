// Utilisateurs statiques
const users = [
    {
        matricule: "ADMIN123",
        password: "admin123",
        role: "admin",
        nom: "Administrateur"
    },
    {
        matricule: "USER456",
        password: "user456",
        role: "user",
        nom: "Utilisateur"
    }
];

/**
 * Vérifie les identifiants de l'utilisateur
 * @param {string} matricule - Matricule de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Object|null} Utilisateur si authentifié, null sinon
 */
export const login = (matricule, password) => {
    const user = users.find(u => u.matricule === matricule && u.password === password);
    if (user) {
        // Stocker l'utilisateur dans le localStorage
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
    }
    return null;
};

/**
 * Déconnecte l'utilisateur
 */
export const logout = () => {
    localStorage.removeItem('currentUser');
};

/**
 * Vérifie si un utilisateur est connecté
 * @returns {boolean} True si un utilisateur est connecté
 */
export const isAuthenticated = () => {
    const user = localStorage.getItem('currentUser');
    return !!user;
};

/**
 * Récupère l'utilisateur connecté
 * @returns {Object|null} Utilisateur connecté ou null
 */
export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}; 