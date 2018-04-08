/**
 * This is the file for all decorators
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sun Apr  8 09:48:05 2018
 */

import { ServiceConstructor, Services } from "../models/Services";
import { global_registry } from "hot-pepper-jelly";

export const service = (name:string):Function => {
    return (target:ServiceConstructor): ServiceConstructor => {
        let services:Services = global_registry("services") || {};
        services[name] = new target();
        global_registry("services", services);
        return target;
    }
}
