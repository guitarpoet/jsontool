/**
 * This is the interface for all service
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sun Apr  8 10:44:31 2018
 */

export interface ServiceConstructor {
    new (): any
}

export interface Services {
    [propName:string]: any;
}
