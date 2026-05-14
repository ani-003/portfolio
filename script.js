const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const callModal = document.querySelector("[data-call-modal]");
const callOpen = document.querySelector("[data-call-open]");
const callCloseButtons = document.querySelectorAll("[data-call-close]");
const copyPhoneButton = document.querySelector("[data-copy-phone]");
const copyStatus = document.querySelector("[data-copy-status]");
const phoneNumber = document.querySelector("[data-phone-number]")?.textContent.trim();
const emailModal = document.querySelector("[data-email-modal]");
const emailOpenButtons = document.querySelectorAll("[data-email-open]");
const emailCloseButtons = document.querySelectorAll("[data-email-close]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const emailCopyStatus = document.querySelector("[data-email-copy-status]");
const emailAddress = document.querySelector("[data-email-address]")?.textContent.trim();
let lastFocusedElement = null;

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const openModal = (modal, focusTarget, statusTarget) => {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  if (statusTarget) statusTarget.textContent = "";
  focusTarget?.focus();
};

const closeModal = (modal, statusTarget) => {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (statusTarget) statusTarget.textContent = "";
  lastFocusedElement?.focus?.();
};

const copyText = async (text, statusTarget) => {
  if (!text || !statusTarget) return;

  try {
    await navigator.clipboard.writeText(text);
    statusTarget.textContent = "Copied to clipboard.";
  } catch {
    statusTarget.textContent = "Copy did not work here. You can select it manually.";
  }
};

const openCallModal = () => openModal(callModal, copyPhoneButton, copyStatus);
const closeCallModal = () => closeModal(callModal, copyStatus);
const openEmailModal = () => openModal(emailModal, copyEmailButton, emailCopyStatus);
const closeEmailModal = () => closeModal(emailModal, emailCopyStatus);

callOpen?.addEventListener("click", openCallModal);
callCloseButtons.forEach((button) => button.addEventListener("click", closeCallModal));
copyPhoneButton?.addEventListener("click", () => copyText(phoneNumber, copyStatus));
emailOpenButtons.forEach((button) => button.addEventListener("click", openEmailModal));
emailCloseButtons.forEach((button) => button.addEventListener("click", closeEmailModal));
copyEmailButton?.addEventListener("click", () => copyText(emailAddress, emailCopyStatus));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && callModal && !callModal.hidden) {
    closeCallModal();
  }
  if (event.key === "Escape" && emailModal && !emailModal.hidden) {
    closeEmailModal();
  }
});
