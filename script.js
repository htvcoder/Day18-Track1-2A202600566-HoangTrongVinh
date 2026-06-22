const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll(".page-section"));
const nextButtons = Array.from(document.querySelectorAll("[data-next]"));

function showSection(targetId) {
  sections.forEach((section) => {
    section.classList.toggle("active", section.id === targetId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === targetId);
  });

  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => showSection(link.dataset.target));
});

nextButtons.forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.next));
});

function simulateLoading(containerId, textId, steps, onDone, delay = 850) {
  const container = document.getElementById(containerId);
  const text = document.getElementById(textId);

  if (!container || !text) {
    return;
  }

  container.classList.remove("hidden");
  let index = 0;

  text.textContent = steps[index];
  const timer = setInterval(() => {
    index += 1;
    if (index >= steps.length) {
      clearInterval(timer);
      container.classList.add("hidden");
      onDone();
      return;
    }
    text.textContent = steps[index];
  }, delay);
}

const step1Button = document.getElementById("btn-step1-plan");
const step1Result = document.getElementById("step1-result");

if (step1Button && step1Result) {
  step1Button.addEventListener("click", () => {
    step1Result.classList.add("hidden");
    simulateLoading(
      "step1-loading",
      "step1-loading-text",
      [
        "Đang đọc trạng thái hiện tại trong hồ sơ đề tài.",
        "Đang đối chiếu quy tắc chỉ tạo kế hoạch chính thức sau khi đề cương đã duyệt.",
        "Đang chuyển sang chế độ lập kế hoạch đề cương tuần đầu."
      ],
      () => step1Result.classList.remove("hidden")
    );
  });
}

const step2Button = document.getElementById("btn-step2-plan");
const step2Result = document.getElementById("step2-result");

if (step2Button && step2Result) {
  step2Button.addEventListener("click", () => {
    step2Result.classList.add("hidden");
    simulateLoading(
      "step2-loading",
      "step2-loading-text",
      [
        "Đang đọc đề cương đã duyệt.",
        "Đang kiểm tra thời lượng và năng lực sinh viên.",
        "Đang tạo kế hoạch 8 tuần và gắn nhãn rủi ro thấp/cao."
      ],
      () => step2Result.classList.remove("hidden")
    );
  });
}

const draftModal = document.getElementById("draft-modal");
const openDraftButton = document.getElementById("btn-open-save-draft");
const closeDraftButton = document.getElementById("btn-close-draft");
const confirmDraftButton = document.getElementById("btn-confirm-draft");

function toggleDraftModal(show) {
  if (!draftModal) {
    return;
  }
  draftModal.classList.toggle("hidden", !show);
  draftModal.setAttribute("aria-hidden", String(!show));
}

if (openDraftButton) {
  openDraftButton.addEventListener("click", () => toggleDraftModal(true));
}

if (closeDraftButton) {
  closeDraftButton.addEventListener("click", () => toggleDraftModal(false));
}

if (confirmDraftButton && openDraftButton) {
  confirmDraftButton.addEventListener("click", () => {
    openDraftButton.textContent = "Đã lưu bản nháp";
    openDraftButton.disabled = true;
    toggleDraftModal(false);
  });
}

if (draftModal) {
  draftModal.addEventListener("click", (event) => {
    if (event.target === draftModal) {
      toggleDraftModal(false);
    }
  });
}

const actButton = document.getElementById("btn-toggle-warning");
const actFeedback = document.getElementById("act-feedback");

if (actButton && actFeedback) {
  let warningVisible = true;
  actButton.addEventListener("click", () => {
    warningVisible = !warningVisible;
    actButton.textContent = warningVisible ? "Bỏ cảnh báo" : "Bật lại cảnh báo";
    actFeedback.textContent = warningVisible
      ? "Cảnh báo hiện đang bật để nhấn mạnh tuần có nguy cơ quá tải."
      : "Cảnh báo đã được người dùng gỡ bỏ. Đây là hành động rủi ro thấp và dễ hoàn tác.";
  });
}

const askPreviewButton = document.getElementById("btn-ask-preview");
const askPreview = document.getElementById("ask-preview");

if (askPreviewButton && askPreview) {
  askPreviewButton.addEventListener("click", () => {
    askPreview.classList.toggle("hidden");
  });
}

const failureTabs = Array.from(document.querySelectorAll(".tab-button"));
const failurePanels = {
  status: document.getElementById("failure-status"),
  capacity: document.getElementById("failure-capacity")
};

failureTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.failure;
    failureTabs.forEach((item) => item.classList.toggle("active", item === tab));
    Object.entries(failurePanels).forEach(([key, panel]) => {
      if (panel) {
        panel.classList.toggle("active", key === target);
      }
    });
  });
});

const recoverStatusButton = document.getElementById("btn-recover-status");
const statusRecoveryResult = document.getElementById("status-recovery-result");

if (recoverStatusButton && statusRecoveryResult) {
  recoverStatusButton.addEventListener("click", () => {
    statusRecoveryResult.classList.remove("hidden");
  });
}

const recoverCapacityButton = document.getElementById("btn-recover-capacity");
const capacityRecoveryResult = document.getElementById("capacity-recovery-result");

if (recoverCapacityButton && capacityRecoveryResult) {
  recoverCapacityButton.addEventListener("click", () => {
    capacityRecoveryResult.classList.remove("hidden");
  });
}
