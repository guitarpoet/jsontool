/**
 * This is the service to manipulate the commandline
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Apr  7 17:17:31 2018
 */
import * as readline from "readline";
import * as fs from "fs";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { log } from "hot-pepper-jelly";
import { service } from "../core/decorators";
import { BaseService } from "../core/BaseService";
import { COMMANDLINE_MODES, DEFAULT_PROMPT, WAIT_PROMPT } from "../core/Constants";
import { spawn } from "child_process";

@service("cmd")
export class Commandline extends BaseService {
    private mode: COMMANDLINE_MODES;
    private cmd:any;
    private lines: Subject<string>;
    private buffer: Array<string> = [];

    public constructor() {
        super();
        this.initReadline();

        this.cmd = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.cmd.setPrompt(DEFAULT_PROMPT);

        let self = this;
        this.lines = new Subject<string>();
        this.cmd.on("line", (line) => {
            if(line != "exit") {
                self.publish(line);
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

    public setPrompt(p:string):void {
        this.cmd.setPrompt(p);
    }

    public defaultPrompt():void {
        this.setPrompt(DEFAULT_PROMPT);
    }

    public waitPrompt(): void {
        this.setPrompt(WAIT_PROMPT);
    }

    private launchEditor():void {
        let editor = process.env.EDITOR;
        // Clear the line first
        this.cmd.write(null, {ctrl: true, name: "a"}); // Go to the line start
        this.cmd.write(null, {ctrl: true, name: "k"}); // Kill the line
        // this.cmd.clearLine(process.stdin, 0);
        let filename = `/tmp/tmpfile-${process.pid}`;
        // Let's put the values in the buffer into the filename first
        fs.writeFileSync(filename, this.buffer.join(""));
        let proc = spawn(editor, ["-c", "set ft=javascript", filename], {
            env: process.env,
            stdio: "inherit"
        });
        let self = this;
        this.cmd.pause();
        proc.on("exit", () => {
            fs.readFile(filename, (err, data) => {
                if(err) {
                    throw err;
                }
                // Write a blank line
                self.cmd.write(data.toString());
                //self.cmd.clearLine(process.stdin, 0);
                self.cmd.prompt();
            })
        });
    }

    private publish(line:string):void {
        // Clear the buffer when publish
        this.buffer = [];
        this.lines.next(line.trim());
        // Let's clear the input string
        // this.cmd.clearLine(process.stdin, 0);
    }

    private appendToBuffer(text:string):void {
        this.buffer.push(text);
    }

    /**
     * Register the key event
     */
    private initReadline():void {
        let self = this;
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
            process.stdin.on("keypress", (chunk, key) => {
                if(this.mode == COMMANDLINE_MODES.SUPER) {
                    // We are in the supper mode, let's check if it is fitting our key strokes
                    if(key.ctrl == true && key.name == "e") {
                        this.launchEditor();
                    } else {
                        this.mode = COMMANDLINE_MODES.NORMAL;
                    }
                } else {
                    if(key.ctrl == true && key.name == "x") {
                        // We are in the super mode
                        this.mode = COMMANDLINE_MODES.SUPER;
                    }
                }
                if(chunk != null && chunk != "" && !key.ctrl && !key.meta) {
                    // Let's forget all ctrl and meta keys
                    self.appendToBuffer(chunk);
                }
            });
        }
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
