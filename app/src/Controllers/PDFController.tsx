import { ApiCall } from "./Constants";
import { logger } from "./Logger";

const makePdfAPI = (state: ApiCall, onError?: (arg0: any) => void) => {
  logger.info("Asking for pdf");
  const b = JSON.stringify(state);
  let req: RequestInit = {
    body: b,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("/lista", req)
    .then((response) => {
      if (response.ok) {
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `lista.pdf`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode!.removeChild(link);
          logger.info("Pdf created successfully");
        });
      } else {
        if (onError != null) {
          response.json().then((j) => {
            logger.error(j.error);
            onError(j.error);
          });
        }
      }
    })
    .catch((e) => {
      logger.error(e);
    });
};

export { makePdfAPI };
