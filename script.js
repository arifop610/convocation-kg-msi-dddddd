const imageInput = document.getElementById('image-input');
const userImage = document.getElementById('user-image-preview');
const nameInput = document.getElementById('name-input');
const displayName = document.getElementById('display-name');
const downloadBtn = document.getElementById('download-btn');

// Image upload preview
imageInput.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        userImage.src = event.target.result;
    }
    if(e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Text input update
nameInput.addEventListener('input', function() {
    displayName.textContent = nameInput.value;
});

// Download Process
downloadBtn.addEventListener('click', function() {
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    
    // Canvas Size
    canvas.width = 1080;
    canvas.height = 1350;

    const frameImg = new Image();
    const userImg = new Image();

    // പ്രധാനപ്പെട്ട മാറ്റം: ഇമേജ് ലോഡ് ആയതിനു ശേഷം മാത്രം വരയ്ക്കുക
    let imagesLoaded = 0;
    function checkAndDraw() {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            drawEverything();
        }
    }

    userImg.onload = checkAndDraw;
    frameImg.onload = checkAndDraw;

    // ഇമേജ് സോഴ്സുകൾ നൽകുന്നു (ഫയൽ പേര് ശ്രദ്ധിക്കുക)
    userImg.src = userImage.src;
    frameImg.src = 'convocation.png'; // HTML-ൽ ഉള്ള അതേ പേര് തന്നെ നൽകുക

    function drawEverything() {
        // 1. ഫോട്ടോ വരയ്ക്കുന്നു (Position & Size ആവശ്യാനുസരണം മാറ്റുക)
        // ctx.drawImage(image, x, y, width, height)
        ctx.drawImage(userImg, 30, 60, 1080, 1350); 
        
        // 2. ഫ്രെയിം മുകളിൽ വരയ്ക്കുന്നു
        ctx.drawImage(frameImg, 0, 0, 1080, 1350);
        
        // 3. പേര് ചേർക്കുന്നു
        ctx.font = "bold 60px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(nameInput.value, 540, 1200);

        // 4. ഡൗൺലോഡ് ലിങ്ക്
        try {
            const link = document.createElement('a');
            link.download = 'convocation_poster.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("ഡൗൺലോഡ് ചെയ്യുന്നതിൽ പിശക്:", err);
            alert("ചിത്രം ഡൗൺലോഡ് ചെയ്യാൻ സാധിക്കുന്നില്ല. സെർവറിൽ ഇട്ടു നോക്കുക.");
        }
    }
});