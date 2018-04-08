/**
 * This is the service locator for all services
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sun Apr  8 09:47:10 2018
 */
import { global_registry } from "hot-pepper-jelly";
export { Commandline } from "./Commandline";
export { Output } from "./Output";
export { BaseService, services } from "../core/BaseService";
