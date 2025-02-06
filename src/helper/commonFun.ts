import { IMAGE_BASE_URL } from "../constants";

export const joinFileLink = (link: string | null | undefined) => {
  return link ? `${IMAGE_BASE_URL}${link}` : "";
};
