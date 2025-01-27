import { WebContainer } from '@webcontainer/api';
import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { WebglAddon } from '@xterm/addon-webgl';
import { Helmet } from 'react-helmet-async';
import '@xterm/xterm/css/xterm.css';

export const files = {
    'index.js': {
        file: {
            contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
    res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
    console.log(\`App is live at http://localhost:\${port}\`);
});`,
        },
    },
    'package.json': {
        file: {
            contents: `
          {
            "name": "example-app",
            "type": "module",
            "dependencies": {
              "express": "latest",
              "nodemon": "latest"
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
        },
    },
};

const PlaygroundLayout = () => {
    const [iframeSrc, setIframeSrc] = useState<string>('');
    const terminalRef = useRef<HTMLDivElement>(null);
    const term = useRef<Terminal | null>(null);

    useEffect(() => {
        const startWebContainer = async () => {
            let wcInstance = await WebContainer.boot();
            await wcInstance.mount(files);

            term.current = new Terminal({
                convertEol: true,
                fontSize: 14,
                theme: { background: '#1E1E1E', foreground: '#D4D4D4' }
            });

            term.current.loadAddon(new WebLinksAddon());
            // term.current.loadAddon(new WebglAddon());

            term.current.open(terminalRef.current!);

            let exitCode = await installDeps({ wcInstance, term });
            if (exitCode !== 0) throw new Error('Installation Failed');

            await startDevServer({ wcInstance, setIframeSrc, term });
        };

        startWebContainer();
    });

    return (
        <>
            <Helmet>
                <title>Code Playground</title>
                {/*Some useful stuff here*/}
            </Helmet>
            <div className='flex flex-col'>
                <iframe src={iframeSrc}></iframe>
                <div ref={terminalRef}></div>

            </div>
        </>
    );
};

const installDeps = async (props: {
    wcInstance: WebContainer;
    term: React.MutableRefObject<Terminal | null>;
}) => {
    let installProcess = await props.wcInstance.spawn('npm', ['install']);
    installProcess.output.pipeTo(
        new WritableStream({
            write(data) {
                props.term.current?.write(data);
            },
        }),
    );

    props.term.current?.onData((input) => {
        installProcess.input.getWriter().write(input);
    });

    return installProcess.exit;
};

const startDevServer = async (props: {
    wcInstance: WebContainer;
    setIframeSrc: Dispatch<SetStateAction<string>>;
    term: React.MutableRefObject<Terminal | null>;
}) => {
    let devProcess = await props.wcInstance.spawn('npm', ['run', 'start']);
    devProcess.output.pipeTo(
        new WritableStream({
            write(data) {
                props.term.current?.write(data);
            },
        }),
    );

    props.term.current?.onData((input) => {
        devProcess.input.getWriter().write(input);
    });

    props.wcInstance.on('server-ready', (_, url) => {
        props.setIframeSrc(url);
    });
};

export default PlaygroundLayout;
