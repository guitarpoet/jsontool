/**
 * This is the base class for all services
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sun Apr  8 11:25:43 2018
 */

import { global_registry } from "hot-pepper-jelly";
import { ServiceConstructor, Services } from "../models/Services";

export const services = (name:string = null):any => {
    let scs: Services = global_registry("services")|| {};
    if(name) {
        let ret: any = scs[name];
        return ret? ret: null;
    }
    return scs;
}

export class BaseService {
	public constructor() {
	}

    public log(msg:string, context:any = {}, level:string = "INFO", tag:any = null, sink:string = "default"):void {
        this.out().log(msg, context, level, tag, sink);
    }

    public out(): any {
        return this.service<any>("out");
    }

    public service<T>(name:string = null):any {
        return services(name) as T;
    }
}
