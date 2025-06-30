export const generateVerificationToken = () => {
    // Generate a random token for email verification
    return Math.floor(10000+Math.random() * 90000).toString(); // Generates a 5-digit token
}