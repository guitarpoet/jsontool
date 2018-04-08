/**
 * This is the entrance of the json tool, which will provides the commandline
 * json manipulation functions
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 16:39:59 2018
 */

const { MainApplication } = require("./dist/Main");

let app = new MainApplication();

app.run(process.argv);
