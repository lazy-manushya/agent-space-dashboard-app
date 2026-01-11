import { ShareContent } from "./Share.types";

class Share {
  static isShareSupported = () => {
    return !!navigator.share;
  };

  static share = async (content: ShareContent) => {
    if (!this.isShareSupported()) return;

    if (content.isUrlRelative && content.url) {
      content = { ...content, url: content.url };
    }

    try {
      await navigator.share(content);
    } catch {}
  };

  static getShareUrl = (url: string) => {
    return window.location.origin + url;
  };

  static copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  static getShareContent = (content: ShareContent) => {
    if (content.isUrlRelative && content.url) {
      content = { ...content, url: Share.getShareUrl(content.url) };
    }

    const { url = "", title = "", text = "" } = content;

    return {
      whatsapp: {
        url: `https://api.whatsapp.com/send?text=${title}%0a%0a${text}%0a%0a${url}`,
      },
      linkedin: {
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      },
      telegram: {
        url: `https://telegram.me/share/url?url=${url}&text=${[
          title,
          text,
        ].join(" ")}`,
      },
      default: {
        url,
      },
    };
  };
}

export default Share;
