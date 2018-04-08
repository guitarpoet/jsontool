/**
 * This is the main interface for the jsontool
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 16:41:12 2018
 */

import { debug } from "hot-pepper-jelly";
import Commandline from "./services/Commandline";

export class MainApplication {
	private cmd:Commandline;

	public constructor() {
		this.cmd = new Commandline();
	}

	run(args: Array<string> = []) {
		this.cmd.prompt().subscribe({
			next(answer) {
				console.info("OUTPUT: ", answer);
			}
		});
	}
}
