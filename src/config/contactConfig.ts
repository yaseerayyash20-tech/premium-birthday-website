// Central Contact Configuration for WhatsApp Business & Instagram DM
// Single source of truth for commercial customer inquiries

const WHATSAPP_INTERNATIONAL_NUMBER = "94751558581";
const INSTAGRAM_USERNAME = "stylish_ayyash_aysh";

export const DEFAULT_WHATSAPP_INQUIRY = `Hi! I'm interested in ordering a custom 3D Birthday Surprise Website.

I saw your birthday website demo and would like to know more about the available packages, pricing and features.

Please share the details.`;

export const CUSTOM_ORDER_WHATSAPP_MESSAGE = `Hi! I'm ready to order a personalized 3D Birthday Surprise Website.

Please let me know how to send my photos, custom messages, and favorite song!`;

export const contactConfig = {
  whatsapp: {
    phoneNumber: "0751558581",
    country: "Sri Lanka",
    countryCode: "+94",
    internationalNumber: WHATSAPP_INTERNATIONAL_NUMBER,
    defaultMessage: DEFAULT_WHATSAPP_INQUIRY,
    customOrderMessage: CUSTOM_ORDER_WHATSAPP_MESSAGE,
    baseUrl: `https://wa.me/${WHATSAPP_INTERNATIONAL_NUMBER}`,
    /**
     * Generates official WhatsApp Click-to-Chat URL with prefilled URL-encoded message
     */
    getChatUrl: (customMessage?: string): string => {
      const message = customMessage || DEFAULT_WHATSAPP_INQUIRY;
      return `https://wa.me/${WHATSAPP_INTERNATIONAL_NUMBER}?text=${encodeURIComponent(message)}`;
    },
  },
  instagram: {
    username: INSTAGRAM_USERNAME,
    handle: `@${INSTAGRAM_USERNAME}`,
    profileUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    dmUrl: `https://ig.me/m/${INSTAGRAM_USERNAME}`,
    fallbackUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
  },
};

