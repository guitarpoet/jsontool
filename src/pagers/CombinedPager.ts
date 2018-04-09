/**
 * The Combined Pager
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Apr  9 15:31:03 2018
 */

import { Observable } from "rxjs/Observable";
import { Pager, flatMapper, PagerType } from "../models/Pager";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@flatMapper
export class CombinedPager implements Pager {
    public type: PagerType;

    private pagers: Array<Pager>;

    public constructor(pagers: Array<Pager>) {
        this.pagers = pagers;
    }

    public process(data:any):Observable<any> | any {
        let o = Observable.of(data);
        for(let pager of this.pagers) {
            if(pager.type == PagerType.Mapper) {
                // This is a map pager
                o = o.map(data => pager.process(data)); 
                continue;
            }

            if(pager.type == PagerType.FlatMapper) {
                o = o.flatMap(data => pager.process(data));
                continue;
            }
        }
        return o;
    }
}
