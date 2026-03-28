declare namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
    }

    interface Process {
        env: ProcessEnv;
        cwd(): string;
    }
}

declare const process: NodeJS.Process;

declare module 'fs' {
    export function existsSync(path: string): boolean;
    export function readFileSync(path: string, options?: string | { encoding?: string }): string;
}

declare module 'fs/promises' {
    export function readFile(path: string, options?: string | { encoding?: string }): Promise<string>;
    export function writeFile(path: string, data: string, options?: string | { encoding?: string }): Promise<void>;
    export function mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
}

declare module 'path' {
    export function join(...paths: string[]): string;
}
