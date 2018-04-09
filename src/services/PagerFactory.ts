/**
 * This is the pager factory, which will provide all references for the pagers
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Apr  9 14:22:26 2018
 */

import { service } from "../core/decorators";
import { Pager } from "../models/Pager";
import { EchoPager } from "../pagers/EchoPager";
import { JsonPager } from "../pagers/JsonPager";
import { CombinedPager } from "../pagers/CombinedPager";

@service("pagers")
export class PagerFactory {
    private pagers: Array<Pager> = [];
    private cached: CombinedPager;

    public default(): PagerFactory {
        this.pagers = [new EchoPager()];
        return this;
    }

    public reset(): PagerFactory {
        this.pagers = [];
        this.cached = null;
        return this;
    }

    public echo(): PagerFactory { // Get the echo pager
        this.pagers.push(new EchoPager());
        return this;
    }

    public json(): PagerFactory { // Get the echo pager
        this.pagers.push(new JsonPager());
        return this;
    }

    public getPager(): Pager {
        if(!this.cached) {
            let {pagers} = this;
            if(!pagers || pagers.length == 0) {
                // Let's use the json string data
                this.echo();
            }
            this.cached = new CombinedPager(this.pagers);
        }
        return this.cached;
    }
}
