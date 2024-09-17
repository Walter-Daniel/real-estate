export const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    return `*********@${domain}`;
 }