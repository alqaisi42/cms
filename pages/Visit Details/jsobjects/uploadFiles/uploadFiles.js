export default {
  getFileBase64ByIndex(index) {
    const files = FilePicker1.files;
    if (!files || index < 0 || index >= files.length) {
      showAlert("Invalid file index: " + index, "error");
      return "";
    }
		
		storeValue("file", files[index].data)
    return files[index].data;
  },
	
	

 async onFilesSelected() {
    const files = FilePicker1.files;

    if (!files || files.length === 0) {
      showAlert("⚠️ No files selected.", "warning");
      return;
    }

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const base64 = file.data;

      console.log(`Uploading file ${index + 1}: ${file.name}`);

      storeValue("file", base64);

      try {
        await insertAttach.run();  
        showAlert(`✅ Uploaded: ${file.name}`, "success");
      } catch (e) {
        showAlert(`❌ Failed: ${file.name} — ${e.message}`, "error");
      }

      await delay(500);  // wait 500ms before next
    }

  }


};
