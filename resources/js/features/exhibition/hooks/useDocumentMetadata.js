import { useEffect } from "react";

function setMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector);
  const created = !element;

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
    document.head.appendChild(element);
  }

  const previousContent = element.getAttribute("content");
  element.setAttribute("content", content);

  return () => {
    if (created) {
      element.remove();
    } else if (previousContent === null) {
      element.removeAttribute("content");
    } else {
      element.setAttribute("content", previousContent);
    }
  };
}

export function useDocumentMetadata({ title, description, image }) {
  useEffect(() => {
    if (!title || !description) {
      return undefined;
    }

    const previousTitle = document.title;
    const canonicalUrl = window.location.href;
    document.title = title;

    const restore = [
      setMeta('meta[name="description"]', { name: "description" }, description),
      setMeta('meta[property="og:title"]', { property: "og:title" }, title),
      setMeta(
        'meta[property="og:description"]',
        { property: "og:description" },
        description
      ),
      setMeta(
        'meta[property="og:type"]',
        { property: "og:type" },
        "website"
      ),
      setMeta(
        'meta[property="og:url"]',
        { property: "og:url" },
        canonicalUrl
      ),
    ];

    if (image) {
      restore.push(
        setMeta('meta[property="og:image"]', { property: "og:image" }, image)
      );
    }

    return () => {
      document.title = previousTitle;
      restore.forEach((restoreMeta) => restoreMeta());
    };
  }, [description, image, title]);
}
