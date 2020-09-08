const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question, defaultAnswer) => {
  return new Promise((res, rej) => {
      try {
          readline.question(question, (ans) => {
              res(ans && ans.length > 0 ? ans : defaultAnswer);
          });
      } catch (e) {
          rej(e);
      }
  })
};

const main = async () => {
    try {
        let takeOuts = (await prompt('Take Out Orders(e.g. 1 3 5): ', '1 3 5')).split(' ');
        let dineIns = (await prompt('Dine In Orders(e.g. 2 4 6): ', '2 4 6')).split(' ');
        let serveOrders = (await prompt('Served Orders(e.g. 1 2 4 6 5 3): ', '1 2 4 6 5 3')).split(' ');
        let inOrder = true;
        readline.close();
        for(let i = 0; i < serveOrders.length; i++) {
            if (takeOuts.length > 0 && takeOuts[0] === serveOrders[i]) {
                takeOuts.splice(0, 1);
                continue;
            } else if (dineIns.length > 0 && dineIns[0] === serveOrders[i]) {
                dineIns.splice(0, 1);
                continue;
            } else {
                inOrder = false;
                break;
            }
        }
        console.log(`Serving order is ${ inOrder ? 'correct!' : 'incorrect!' }`);
    } catch (e) {
        console.log(e);
        readline.close();
    }
};

main();