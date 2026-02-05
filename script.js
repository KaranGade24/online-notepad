const editor = document.querySelector(".main-body");
const btnBold = document.getElementById("bold");
const wordCount = document.getElementById("word-count");
const newFileBtn = document.getElementById("newFileBtn");
//style btn
const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
//menu option btn
const fileOption = document.querySelector(".fileOption");
const fileOptionBtn = document.getElementById("fileOptionBtn");
const newFileMenuBtn = document.getElementById("newFileMenuBtn");
const saveFileMenuBtn = document.getElementById("saveFileMenuBtn");
var isFileOptionBtn = false;

//helper
function getWordCount(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

//Create new empty file by removing previous content
function newFile(e) {
  e.preventDefault();
  editor.innerHTML = "";
}

// Listen DOM Load
document.addEventListener("DOMContentLoaded", () => {
  fileOption.style.display = "none";
  const editor = document.querySelector(".main-body");
  const editorText = localStorage.getItem("editorText");
  if (editorText) {
    editor.innerHTML = editorText;
  }
});

//main editor input listener
editor.addEventListener("input", (e) => {
  e.preventDefault();

  const text = editor.innerText;
  const count = getWordCount(text);
  wordCount.innerText = count;
  localStorage.setItem("editorText", editor.innerHTML);
});

newFileBtn.addEventListener("click", newFile);

// menu -> 1
fileOptionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isFileOptionBtn = isFileOptionBtn ? false : true;

  if (isFileOptionBtn) {
    fileOptionBtn.style.backgroundColor = "rgb(192, 188, 188)";
    fileOption.style.display = "block";
  } else {
    fileOptionBtn.style.backgroundColor = "white";
    fileOption.style.display = "none";
  }
});
//File
// 1 New File
newFileMenuBtn.addEventListener("click", (e) => {
  newFile(e);
  fileOptionBtn.style.backgroundColor = "white";
  fileOption.style.display = "none";
  isFileOptionBtn = false;
});

document.addEventListener("click", (e) => {
  // Only hide if click is outside fileOption AND fileOptionBtn
  if (
    isFileOptionBtn &&
    !fileOption.contains(e.target) &&
    e.target !== fileOptionBtn
  ) {
    fileOptionBtn.style.backgroundColor = "white";
    fileOption.style.display = "none";
    isFileOptionBtn = false;
  }
});

// save file in txt format

saveFileMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get editor content as plain text
  const text = editor.innerText;

  // Create a Blob with the text content
  const blob = new Blob([text], { type: "text/plain" });

  // Create a temporary link to trigger download
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `NewFile.txt`; // default file name
  a.click();

  // Clean up
  URL.revokeObjectURL(a.href);

  // Hide file menu after saving
  fileOption.style.display = "none";
  fileOptionBtn.style.backgroundColor = "white";
  isFileOptionBtn = false;
});

//menu -> 2
boldBtn.addEventListener("click", () => {
  editor.focus();
  document.execCommand("bold");

  const isBold = document.queryCommandState("bold");
  boldBtn.style.backgroundColor = isBold ? "rgb(192, 188, 188)" : "white";
});

italicBtn.addEventListener("click", () => {
  editor.focus();
  document.execCommand("italic");

  const isItalic = document.queryCommandState("italic");
  italicBtn.style.backgroundColor = isItalic ? "rgb(192, 188, 188)" : "white";
});
