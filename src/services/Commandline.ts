/**
 * This is the service to manipulate the commandline
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 17:17:31 2018
 */
import * as readline from "readline";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { log } from "hot-pepper-jelly";

export default class CommandLine {
	private cmd:any;
	private lines: Subject<string>;

	public constructor() {
		this.cmd = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: "json> "
		})

		let self = this;
		this.lines = new Subject<string>();
		this.cmd.on("line", (line) => {
			if(line != "exit") {
				self.lines.next(line);
				self.cmd.prompt();
			} else {
				log("Bye.");
				self.close();
			}
		});

		this.cmd.on("close", (line) => {
			self.lines.complete();
		});
		self.cmd.prompt();
	}

	public close():void {
		this.cmd.close();
	}

	public question(question:string): Observable<string> {
		return Observable.create(obs => {
			this.cmd.question(question, (answer) => {
				obs.next(answer);
				obs.complete();
			});
		});
	}

	public prompt(): Observable<string> {
		return this.lines;
	}
}
