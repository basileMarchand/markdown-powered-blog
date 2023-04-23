const minify = require("@node-minify/core");
const ujs = require("@node-minify/uglify-js");
const ccss = require("@node-minify/clean-css");
const { readdir, mkdir, exists } = require("fs/promises");
const path = require("path");

const COMPRESSOR = { css: ccss, js: ujs };

const static_subdir = ["css", "js"];

static_subdir.forEach((subdir) => {
  mkdir(path.join("static_prod", subdir), { recursive: true })
    .then(() => {
      console.log(`${path.join("static_prod", subdir)} created`);
    })
    .then(() => {
      return readdir(path.join("static", subdir));
    })
    .then((files) => {
      files.forEach((file) => {
        console.log(file);
        minify({
          compressor: COMPRESSOR[`${subdir}`],
          input: path.join("static", subdir, file),
          output: path.join("static_prod", subdir, file),
          callback: function (err, min) {
            if (err) {
              console.log(err);
            }
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
