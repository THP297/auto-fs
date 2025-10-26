import { loadHTMLContent } from "../control-page/change-page.js";

export class NavRight {
  constructor(currentPage) {
    this.currentPage = currentPage;
    this.setupButton();
    // this.setupCallAnnounceIcon();
  }

  setupButton() {
    const pages = document.querySelectorAll(".nav-page");

    pages.forEach((page) => {
      const pageId = page.id;
      if (this.currentPage === pageId) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }

      page.addEventListener("click", () => {
        switch (pageId) {
          case "softphone-page":
            const currentState = localStorage.getItem("current-call-state");
            if (currentState) {
              loadHTMLContent(`/pages/call/${currentState}.html`);
            } else {
              loadHTMLContent("/pages/call/main.html");
            }
            break;
          case "chat-page":
            this.renderIframe("chat-page");
            this.currentPage = "chat-page";
            this.setupButton();
            break;
          case "email-page":
            // loadHTMLContent("/pages/task/main.html");
            this.renderIframe("email-page");
            this.currentPage = "email-page";
            this.setupButton();
            break;
          case "task-page":
            // loadHTMLContent("/pages/task/main.html");
            this.renderIframe("task-page");
            this.currentPage = "task-page";
            this.setupButton();
            break;
          case "settings-page":
            // loadHTMLContent("/pages/settings.html");
            this.renderIframe("settings-page");
            this.currentPage = "settings-page";
            this.setupButton();
            break;
          default:
            break;
        }
      });
    });
  }

  renderIframe(pageId) {
    // Handle different iframe rendering based on page
    switch (pageId) {
      case "chat-page":
        this.loadContentInIframe("https://cx-1.my.connect.aws/ccp-v2/chat");
        break;
      case "email-page":
        this.loadContentInIframe("https://cx-1.my.connect.aws/ccp-v2/email");
        break;
      case "task-page":
        this.loadContentInIframe("https://cx-1.my.connect.aws/ccp-v2/task");
        break;
      case "settings-page":
        this.loadContentInIframe("https://cx-1.my.connect.aws/ccp-v2/settings");
        break;
      default:
        console.log(`No iframe handler for ${pageId}`);
    }
  }

  loadContentInIframe(url) {
    try {
      // Check if we're in an iframe and can access the parent
      if (window.parent && window.parent !== window) {
        // Try to change the src of the current iframe from the parent
        const currentIframe = window.parent.document.querySelector('iframe[src*="' + window.location.hostname + '"]');
        if (currentIframe) {
          currentIframe.src = url;
          return;
        }
      }
      
      // Fallback: if we can't access parent, change current window location
      window.location.href = url;
    } catch (error) {
      // If cross-origin restrictions prevent access to parent, fallback to current window
      console.log('Cross-origin restriction, using fallback navigation');
      window.location.href = url;
    }
  }



  setupCallAnnounceIcon() {
    console.log(this.currentPage);
    const callAnnounceIcon = document.querySelector("#call-announce-icon");
    const currentState = localStorage.getItem("current-call-state");
    if (
      (currentState === "incoming" || currentState === "incall") &&
      this.currentPage !== "softphone-page"
    ) {
      callAnnounceIcon.style.display = "block";
    } else {
      callAnnounceIcon.style.display = "none";
    }
  }
}
