function encryptImage() {
  const fileInput = document.getElementById('fileInput');
  const key = document.getElementById('keyInput').value;
  const resultArea = document.getElementById('resultArea');
  const animationBox = document.getElementById('animationBox');

  if (!fileInput.files[0] || !key) {
    alert("Please select an image and enter a key.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgData = e.target.result;
    const encrypted = CryptoJS.TripleDES.encrypt(imgData, key).toString();
    localStorage.setItem("encryptedImageText", encrypted);

    document.getElementById('encryptedText').value = encrypted;
    animationBox.innerHTML = '<div class="success-check">✔️ Image Encrypted!</div>';

    resultArea.innerHTML = "";
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function decryptImage() {
  const encryptedText = document.getElementById('decryptInput').value || document.getElementById('encryptedText').value;
  const key = document.getElementById('keyInput').value;
  const resultArea = document.getElementById('resultArea');
  const animationBox = document.getElementById('animationBox');

  if (!encryptedText || !key) {
    alert("Paste encrypted text and enter the correct key.");
    return;
  }

  try {
    const decrypted = CryptoJS.TripleDES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    const img = new Image();
    img.src = decrypted;
    resultArea.innerHTML = "";
    resultArea.appendChild(img);

    const downloadLink = document.createElement('a');
    downloadLink.href = decrypted;
    downloadLink.download = "decrypted_image.png";
    downloadLink.innerText = "⬇️ Download Decrypted Image";
    downloadLink.className = "button";
    resultArea.appendChild(downloadLink);

    animationBox.innerHTML = '<div class="success-check">✔️ Image Decrypted!</div>';
  } catch (e) {
    alert("Decryption failed. Check the key and text.");
  }
}

function downloadEncryptedText() {
  const encryptedText = document.getElementById("encryptedText").value;
  if (!encryptedText) {
    alert("No encrypted text to download.");
    return;
  }
  const blob = new Blob([encryptedText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "encrypted_image.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function showDecryptDownloadBtn() {
  const decryptInput = document.getElementById('decryptInput').value;
  const btn = document.getElementById('downloadDecryptedBtn');
  btn.style.display = decryptInput.trim() ? 'block' : 'none';
}

function clearVault() {
  document.getElementById("fileInput").value = "";
  document.getElementById("keyInput").value = "";
  document.getElementById("encryptedText").value = "";
  document.getElementById("decryptInput").value = "";
  document.getElementById("resultArea").innerHTML = "";
  document.getElementById("animationBox").innerHTML = "";
  document.getElementById("uploadConfirmBox").innerHTML = "";
  localStorage.clear();
}

function showUploadConfirm() {
  document.getElementById("uploadConfirmBox").innerHTML =
    '<div class="success-check">📸 Image Uploaded!</div>';
}