/**
 * This is the interface for all pagers
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Apr  9 09:42:47 2018
 */
import { Observable } from "rxjs/Observable";

export enum PagerType {
    Mapper, FlatMapper
}

export interface Pager {
    type: PagerType; // This is the type of the pager
    process(data:any):Observable<any> | any; // The process of the pager, depends on the type of the pager
}

export const mapper = (target:any) => { // The decorator for indicate that pager is mapper
    target.prototype.type = PagerType.Mapper;
    return target;
}

export const flatMapper = (target: any) => {
    target.prototype.type = PagerType.FlatMapper;
    return target;
}
