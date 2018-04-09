/**
 * This is the JSON pager which will output the result into JSON format
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Apr  9 16:44:13 2018
 */

import { Pager, mapper, PagerType } from "../models/Pager";
import { Observable } from "rxjs/Observable";

@mapper
export class JsonPager implements Pager {
    public type: PagerType;
    process(data:any):Observable<any> | any {
        if(data) {
            return JSON.stringify(data, null, 4);
        }
        return JSON.stringify(null);
    }
}
