const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

rl.question('Enter a string to hash: ', (data) => {
    const data_hash1 = crypto.createHash('sha256').update(data).digest('hex');
    const data_hash2 = crypto.createHash('sha256').update(data_hash1).digest('hex');
    const data_hash3 = crypto.createHash('sha256').update(data_hash2).digest('hex');
    
    const randomInt = Math.floor(Math.random() * 255);
    const rstring = generateRandomString(randomInt);

    const target_hash = crypto.createHash('sha256').update(rstring).digest('hex');

    if (target_hash === data_hash3) {
      console.log("Block hashes match. cannot generate block");
    } else {
      const blockID = generateRandomString(12);
      const blockID_hash = crypto.createHash('sha256').update(blockID).digest('hex');

      console.log("Block ID: " + blockID_hash);
      console.log("Data: " + data_hash3);
      console.log("Target: " + target_hash);
    }
    rl.close();
});
