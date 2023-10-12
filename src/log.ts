import Strings from "./strings";

/**
 * Log
 */
export class Log {
    // Log
    private static _log = null;
    static get Log() { return this._log; }

    // Scope
    private static _scope = null;
    static get Scope() { return this._scope; }

    // Logs an error
    static Error(message: string) {
        // See if the log exists
        if (this.Log) {
            // Log the error
            this.Log.error(Strings.ProjectName, message, this.Scope);
        } else {
            // Log the error to the console
            console.error(`[${Strings.ProjectName}] ${message}`);
        }
    }

    // Logs information
    static Information(message: string) {
        // See if the log exists
        if (this.Log) {
            // Log the message
            this.Log.info(Strings.ProjectName, message, this.Scope);
        } else {
            // Log the message to the console
            console.info(`[${Strings.ProjectName}] ${message}`);
        }
    }

    // Initializes the class
    static init(log, scope) {
        // Set the properties
        this._log = log;
        this._scope = scope;
    }
}