/**
 * This is the main interface for the jsontool
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 16:41:12 2018
 */

import { debug } from "hot-pepper-jelly";
import { BaseService, Commandline, Output, JavaScript, PagerFactory } from "./services";
import { ECHO_MODE, SHELL_MODE } from "./core/Constants";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

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

    public appendAndTryExecute(text:string):any {
        if(this.js().append(text).runnable()) {
            try {
                return this.js().execute();
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

        let self = this;
        this.cmd().prompt().map((answer:string) => {
            if(mode == SHELL_MODE) {
                try {
                    return this.appendAndTryExecute(answer);
                } catch(e) {
                    // We get an error here, let's just return it
                    return e;
                }
            }

            return answer;
        }).flatMap(result => {
            // Let's use the pager process the result
            return this.service<PagerFactory>("pagers")
                .getPager().process(result);
        }).subscribe({
            error(e) {
                console.error(e);
            }
        });
    }
}
