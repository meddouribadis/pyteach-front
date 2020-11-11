import React, { useEffect } from 'react';

function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runit() {
    var prog = document.getElementById("yourcode").value;
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead});
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function(mod) {
            console.log('success');
        },
        function(err) {
            console.log(err.toString());
        });
}

function Exercice() {

    useEffect(() => {
    });

    return (
        <div className="col">
            <h3>Try This</h3>
            <form>
            <textarea id="yourcode" cols="40" rows="10">import turtle

            t = turtle.Turtle()
            t.forward(100)

            print "Hello World"
            </textarea><br/>
                <button type="button" onClick={runit}>Run</button>
            </form>
            <pre id="output"></pre>
            <div id="mycanvas"></div>

            <p>test</p>
        </div>
    );
}

export { Exercice };