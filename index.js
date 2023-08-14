/* QR Code Generator (index.js) */

// Using the "inquirer" npm package to get user input.
import inquirer from "inquirer";

// Using the "qr-image" npm package to turn the user entered URL into a QR code image.
import qr from "qr-image";

// Using the native fs (file system) node module to create a txt file and save the user inputs.
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Enter URL to generate your QR Code: ", // The question to print
            name: "URL" // The name to use when storing the answer
        }
    ])
    .then((answers) => {
        // console.log(answers);
        const url = answers.URL;
        // console.log(url);

        var qr_img_png = qr.image(url);

        qr_img_png.pipe(fs.createWriteStream("Your_QR_Code.png"));

        const data = url + "\n";
        fs.appendFile('URLs.txt', data, (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });