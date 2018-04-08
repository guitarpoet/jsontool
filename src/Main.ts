/**
 * This is the main interface for the jsontool
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 16:41:12 2018
 */

import { debug } from "hot-pepper-jelly";
import { BaseService, Commandline, Output, JavaScript } from "./services";
import { ECHO_MODE, SHELL_MODE } from "./core/Constants";

export class MainApplication extends BaseService {

    public cmd(): Commandline {
        return this.service<Commandline>("cmd");
    }

    public echo(text):void {
        console.info(text);
    }

    public js():JavaScript {
        return this.service<JavaScript>("javascript");
    }

    public appendAndTryExecute(text:string):void {
        if(this.js().append(text).runnable()) {
            try {
                console.info(this.js().execute());
            }
            catch(e) {
                console.error(e);
            }
            finally {
                this.cmd().defaultPrompt();
            }
        } else {
            // It is not runnable, let's update the prompt to wait
            this.cmd().waitPrompt();
        }
    }

    public run(args: Array<string> = []) {
        let node = args.shift();
        let script = args.shift();

        let mode:string = args.length? args[0]: SHELL_MODE;

        let g:any = global;
        g.history = (pos:number = -1):Array<string> | string => {
            return this.js().history(pos);
        }

        let self = this;
        this.cmd().prompt().subscribe({
            next(answer) {
                if(mode == ECHO_MODE) {
                    self.echo(answer);
                }
                if(mode == SHELL_MODE) {
                    self.appendAndTryExecute(answer);
                }
            }
        });
    }
}
