const wholeContainer = document.querySelector(".wholeContainer");
const summaryParent = document.querySelector(".summaryParent");
const icon = document.querySelector(".bodyBtn");
const plusIcon = document.querySelector(".plusicon");
const deleteIcon = document.querySelector(".deleteIcon");
const selectedContainers = document.querySelectorAll(
  ".selectedParentContainer"
);
const dregableContainers = document.querySelectorAll(".draggableEle ");
const downloadBtn = document.querySelector(".downloadBtn");

downloadBtn.addEventListener("click", () => {
  wholeContainer.classList.add("hidden-border");
  const opt = {
    margin: [0.5, -0.2, 0.7, 0],
    filename: "resumeFile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(wholeContainer)
    .save()
    .then(() => {
      wholeContainer.classList.remove("hidden-border");
    });
});

let draggedEle = null;
let selectedEle = null;
let selectedContainer = null;

wholeContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  selectedEle = e.target;

  selectedContainer = selectedEle.closest(".selectedParentContainer");

  if (!selectedContainer) return;
  const x = e.clientX;
  const y = e.clientY;

  icon.style.left = `${x}px`;
  icon.style.top = `${y}px`;
  icon.style.display = "flex";
  window.addEventListener("scroll", () => {
    icon.style.display = "none";
  });

  selectedEle.addEventListener("dragstart", (e) => {
    draggedEle = selectedEle;
    // console.log("drag start triggered");
  });
  selectedEle.addEventListener("dragend", (e) => {
    draggedEle = null;
    // console.log("drag end triggered");
  });

  dregableContainers.forEach((dragableElement) => {
    dragableElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      //  console.log('drag over here');
    });
    dragableElement.addEventListener("dragenter", (e) => {
      // console.log('drag enter here');
    });
    dragableElement.addEventListener("dragleave", () => {
      //  console.log('drag leave here');
    });
    dragableElement.addEventListener("drop", (e) => {
      if (draggedEle) {
        e.target.append(selectedEle);
      }
    });
  });
});

const cloneDivs = [];

plusIcon.addEventListener("click", (e) => {
  if (selectedEle && selectedContainer) {
    const cloneDiv = selectedEle.cloneNode(true);
    cloneDivs.push(cloneDiv);
    cloneDiv.setAttribute("draggable", true);
    selectedContainer.appendChild(cloneDiv);
  }
});

deleteIcon.addEventListener("click", () => {
  if (selectedEle) {
    // Prevent deleting the wholeContainer
    if (selectedEle === wholeContainer) {
      alert("You cannot delete the main container!");
      return;
    }

    selectedEle.remove();
    selectedEle = null;
  }
});
