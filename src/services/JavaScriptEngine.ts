/**
 * This is the engine to support JavaScript execution
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sun Apr  8 17:03:23 2018
 */

import { service } from "../core/decorators";
import { BaseService } from "../core/BaseService";
import * as esprima from "esprima";
import { debug } from "hot-pepper-jelly";
import { extend } from "lodash";
import * as vm from "vm";

@service("javascript")
export class JavaScript extends BaseService {
    private buffer: Array<string> = [];
    private stack: Array<string> = [];
    private context:any;

    public constructor() {
        super();
        this.context = extend({
            history: (pos:number = -1):Array<string> | string => {
                return this.history(pos);
            },
            service: (name:string):BaseService => {
                return this.service(name);
            },
            pagers: ():any => {
                return this.service("pagers");
            }
        }, global);
        vm.createContext(this.context);
    }

    public runnable():boolean {
        if(this.buffer && this.buffer.length) {
            try {
                let s = this.buffer.join("\n");
                // If we can parse the buffer, it is runnable
                return !!esprima.parse(s);
            } catch(e) {
                // We can't parse the code, then it is not correct
                return false;
            }
        }
        return false;
    }

    public append(text:string):JavaScript {
        this.buffer.push(text);
        return this;
    }

    public execute():any {
        // Get the code to execute
        let code = this.buffer.join("\n");
        this.stack.push(code);
        // Clear the buffer
        this.buffer = [];
        return vm.runInContext(code, this.context);
    }

    public history(pos: number = 1):Array<string> | string {
        if(pos > 0 && pos < this.stack.length){
            return this.stack[this.stack.length - pos];
        }
        return this.stack;
    }
}
