/**
 * This is the basic pager, which will console.info every line it gots
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Apr  9 14:13:35 2018
 */
import { Pager, mapper, PagerType } from "../models/Pager";
import { Observable } from "rxjs/Observable";

@mapper
export class EchoPager implements Pager {
    public type: PagerType;
    process(data:any):Observable<any> | any {
        // Just output the data using the console.
        console.info(data);
        return data;
    }
}
