 
// Define the FileTiles custom element
class FileTiles extends HTMLElement {

    static getMetaConfig() {
      // plugin contract information
      return {
          controlName: 'Files tiles',
          fallbackDisableSubmit: false,
          description: 'Files tiles',
          iconUrl: "multiline-text",
          groupName: 'Controls ByC',
          version: '1.0',
          properties: {
              input: {
                  type: 'string',
                  title: 'Input',
              },
              output: {
                  type: 'string',
                  title: 'Output',
                  isValueField: true,
              },
          },
          events: ["ntx-value-change"],
          standardProperties: {
              fieldLabel: true,
              readOnly: true,
              required: true,
              description: true,
          }
      };
    }
  
    constructor() {
      super();
      this.files = [];
  
      // Create the shadow root
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          .file-tiles {
            display: flex;
            flex-wrap: wrap;
          }
  
          .file-tile {
            width: 200px;
            height: 250px;
            margin: 10px;
            position: relative;
            background-size: cover;
            background-position: center;
            cursor: pointer;
          }
  
          .file-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 8px;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            font-size: 12px;
          }
  
          .file-title {
            font-weight: bold;
            margin-bottom: 4px;
          }
        </style>
        <div class="file-tiles"></div>
      `;
    }
  
    connectedCallback() {
      // Add event listener to the parent page for file input change
      window.addEventListener("fileInputChange", this.handleFileInput.bind(this));
    }
  
    disconnectedCallback() {
      // Remove event listener from the parent page
      window.removeEventListener("fileInputChange", this.handleFileInput.bind(this));
    }
  
    handleFileInput(event) {
      const files = event.detail.files;
      const fileTilesContainer = this.shadowRoot.querySelector(".file-tiles");
  
      // Clear previous file tiles
      fileTilesContainer.innerHTML = "";
  
      // Loop through the selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        // Create a new file tile
        const fileTile = document.createElement("div");
        fileTile.classList.add("file-tile");
  
        // Check if the file is an image
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
  
          // Read the image file and set it as the background of the file tile
          reader.onload = function(event) {
            fileTile.style.backgroundImage = `url(${event.target.result})`;
          };
  
          reader.readAsDataURL(file);
        }
  
        // Create file information
        const fileInfo = document.createElement("div");
        fileInfo.classList.add("file-info");
  
        // Create file title
        const fileTitle = document.createElement("div");
        fileTitle.classList.add("file-title");
        fileTitle.textContent = file.name;
  
        // Create file description
        const fileDescription = document.createElement("div");
        fileDescription.textContent = `Size: ${file.size} bytes`;
  
        // Create link to open file in a new window
        const fileLink = document.createElement("a");
        fileLink.href = URL.createObjectURL(file);
        fileLink.target = "_blank";
        fileLink.textContent = "Open File";
  
        // Append file title, description, and link to file information
        fileInfo.appendChild(fileTitle);
        fileInfo.appendChild(fileDescription);
        fileInfo.appendChild(fileLink);
        fileTile.appendChild(fileInfo);
  
        // Append the file tile to the container
        fileTilesContainer.appendChild(fileTile);
      }
    }
  }
  
  // Define the fileInputChange event to communicate with the custom element
  const fileInput = document.getElementById("file-input");
  fileInput.addEventListener("change", function(event) {
    const files = event.target.files;
    const fileInputChangeEvent = new CustomEvent("fileInputChange", { detail: { files } });
    window.dispatchEvent(fileInputChangeEvent);
  });
  
  
  // Register the custom element
  customElements.define("byc-filetiles", FileTiles);