/**
 * This is the main interface for the jsontool
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 16:41:12 2018
 */

import { debug } from "hot-pepper-jelly";
import { BaseService, Commandline, Output } from "./services";
import { ECHO_MODE, SHELL_MODE } from "./core/Constants";

export class MainApplication extends BaseService {

    public cmd(): Commandline {
        return this.service<Commandline>("cmd");
    }

    public echo(text):void {
        console.info(text);
    }

    public run(args: Array<string> = []) {
        let node = args.shift();
        let script = args.shift();

        let mode:string = args.length? args[0]: ECHO_MODE;

        let self = this;
        this.cmd().prompt().subscribe({
            next(answer) {
                if(mode == ECHO_MODE) {
                    self.echo(answer);
                }
            }
        });
    }
}
