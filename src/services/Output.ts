/**
 * This is the services for the output
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sun Apr  8 09:45:59 2018
 */

import { service } from "../core/decorators";
import { log } from "hot-pepper-jelly";

@service("out")
export class Output {

    log(msg:string, context:any = {}, level:string = "INFO", tag:any = null, sink:string = "default"):void {
        log(msg, context, level, tag, sink);
    }
}
