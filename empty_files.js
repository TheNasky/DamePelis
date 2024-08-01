const fs = require("fs").promises;
const path = require("path");

async function emptyFiles(directory) {
   try {
      const files = await fs.readdir(directory);

      for (const file of files) {
         const filePath = path.join(directory, file);
         const stats = await fs.stat(filePath);

         if (stats.isFile()) {
            await fs.writeFile(filePath, "");
            console.log(`Emptied: ${filePath}`);
         } else if (stats.isDirectory()) {
            await emptyFiles(filePath);
         }
      }
   } catch (error) {
      console.error("Error:", error);
   }
}

const appDirectory = path.join(__dirname, "components");
emptyFiles(appDirectory);
