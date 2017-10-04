/*
 *  ANGULAR UI DEPLOYMENT SCRIPT
 *
 *  Use to deploy a compiled Angular project to S3.
 *  Run from project root.
 *
 *  TO DEPLOY: node .\deploy.js
 */

/**********************
*  PACKAGES & CONFIG  *
***********************/
var fs     = require('fs');
var colors = require('colors');
var mime   = require('mime');
var AWS    = require('aws-sdk');

colors.setTheme({
  error:   'red',
  success: 'green'
});

/**************
*  FUNCTIONS  *
***************/
/*
  Returns a list of files from a given directory
*/
function walkSync(dir, filelist) {
  var path  = path || require('path');
  var fs    = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else if (file !== 'deploy.js') {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

/*
  Uploads a list of files to S3
*/
function upload_all_files(file_index, cb) {
  if (file_index < files_to_upload.length) {
    var ml = mime.lookup(files_to_upload[file_index]);
    // console.log(ml)
    if (ml == 'application/octet-stream') {
      console.log('FAILED TO FIND A FILE CONTENT TYPE', files_to_upload[file_index]);
      file_index++;
      upload_all_files(file_index, cb);
      // process.exit(1);
    }
    else {
      var fileBuffer = fs.readFileSync(__dirname + '/' + files_to_upload[file_index]);
      var fileKey    = "";
      if(isWin == true){
        // If Windows, remove the "dist" directory from the filename and turn backslashes into forward slashes
        fileKey = files_to_upload[file_index].replace('dist'+String.fromCharCode(92),'')
                                             .replace(/\\/g,"/");
      }
      else{
        // If Unix, just remove the "dist" directory from the filename
        files_to_upload[file_index].replace('dist/', '');
      }
      console.log(fileKey);

      s3.putObject({
        Bucket: bucket,
        Key: fileKey,
        ACL: 'public-read',
        ContentType: mime.lookup(files_to_upload[file_index]),
        Expires: new Date(),
        Body: fileBuffer
      }, function (s3Err, s3R) {
        //console.log('S3', s3Err);
        if (s3Err) {
          cb(s3Err)
          return false;
        }
        else {
          file_index++;
          upload_all_files(file_index, cb);
        }
      });
    }
  }
  else {
    cb();
  }
}

/*
  Invalidate the CloudFront Cache so the newly
  deployed files are cached immediately
*/
function invalidate_cloudfront(cb) {
  var params = {
    DistributionId: distID,
    InvalidationBatch: {
      CallerReference: new Date().getTime().toString(),
      Paths: {
        Quantity: 1,
        Items: [
          '/*'
        ]
      }
    }
  };
  cloudfront.createInvalidation(params, function (err, data) {
    if (err) {
      //console.log('CLOUDFRONT ERROR', err, err.stack);
      cb(err);
    }
    else {
      //console.log('CLOUDFRONT OK', data);
      cb();
    }
  });
}

/********************
*  BEGIN DEPLOYMENT *
*********************/
// Check for deploy config file and compiled project directory
if(fs.existsSync("./deploy-config.json") && fs.existsSync("./dist")){
  var config             = require('./deploy-config.json');
  var isWin              = /^win/.test(process.platform); // Check if user is on Windows
  var files_to_upload    = walkSync('./dist');
  var cloudfront_enabled = false;
  // Set up AWS variables
  AWS.config.loadFromPath("./deploy-config.json");
  // S3
  var s3     = new AWS.S3();
  var bucket = config.bucket;
  // Cloudfront
  if(config.distID){
    var cloudfront = new AWS.CloudFront();
    var distID = config.distID;
    cloudfront_enabled = true;
  }
  console.log("Deploying...".success);

  // Upload files to S3
  upload_all_files(0, function (upload_err) {
    if (upload_err) {
      console.log('There was a problem uploading the files. Please try again. Error: '.error, upload_err);
      process.exit(1);
    }
    else if(cloudfront_enabled = true) {
      invalidate_cloudfront(function (invalidate_cloudfront_err) {
        if (invalidate_cloudfront_err) {
          console.log('There was a problem invalidating Cloudfront. Please try again. Error: '.error, invalidate_cloudfront_err);
          process.exit(1);
        }
        else {
          console.log('Success! Project Deployed.'.success);
          process.exit(0);
        }
      });
    }
    else {
      console.log('Success! Project Deployed.'.success);
      process.exit(0);
    }
  });
}
else if(!fs.existsSync("./deploy-config.json")){
  console.error("Config file missing. Please clone `deploy-config.json.skel` and provide the needed credentials.".error);
  process.exit(1);
}
else if(!fs.existsSync("./dist")){
  console.error("Compiled project directory missing. Please run `ng build --prod` before attempting to deploy.".error);
  process.exit(1);
}
