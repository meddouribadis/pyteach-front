const loadSkulpt = (callback) => {
    const existingScript = document.getElementById('skulptScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'http://www.skulpt.org/js/skulpt.min.js';
        script.id = 'skulptScript';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();

    const existingScriptDist = document.getElementById('skulptScriptDist');
    if (!existingScriptDist) {
        const scriptDist = document.createElement('script');
        scriptDist.src = 'http://www.skulpt.org/js/skulpt-stdlib.js';
        scriptDist.id = 'skulptScriptDist';
        document.body.appendChild(scriptDist);
        scriptDist.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScriptDist && callback) callback();
};
export default loadSkulpt;