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

    const code = "import turtle\n" +
        "\n" +
        "t = turtle.Turtle()\n" +
        "t.forward(100)\n" +
        "\n" +
        "print \"Hello World\" ";

    useEffect(() => {
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Test en Python</h3>
                    <hr/>
                </div>
                <div className="col-6">
                    <form>
                        <div className="form-group">
                            <textarea className="form-control" id="yourcode" cols="40" rows="10">
                                {code}
                            </textarea>
                            <br/>
                        </div>
                        <button type="button" className={"btn btn-primary btn-lg"} onClick={runit}>Run</button>
                    </form>
                </div>

                <div className="col-6">
                    <pre id="output"></pre>
                    <div id="mycanvas"></div>

                    <p></p>
                </div>
            </div>
        </div>
    );
}

export { Exercice };
