import React, { useEffect } from 'react';
import './Skulpt.css';

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

function Skulpt(props) {

    const pythonCode = props.pythonCode;

    useEffect(() => {
    });

    return(
            <div className="row">
                <div className="col-6">
                    <form>
                        <div className="form-group">
                            <textarea className="form-control" id="yourcode" cols="40" rows="10" value={pythonCode}>
                            </textarea>
                            <br/>
                        </div>
                        <button type="button" className={"btn btn-primary btn-lg"} onClick={runit}>Run</button>
                    </form>
                </div>

                <div className="col-6 python-executed">
                    <pre id="output"></pre>
                    <div id="mycanvas"></div>

                    <p></p>
                </div>
            </div>
    );
}

function SkulptPreview(props) {

    const pythonCode = props.pythonCode;

    useEffect(() => {
    });

    return(
        <div className="row">
            <div className="col-6">
                <form>
                    <div className="form-group">
                            <textarea className="form-control" id="yourcode" cols="40" rows="10" value={pythonCode}>
                            </textarea>
                        <br/>
                    </div>
                    <button type="button" className={"btn btn-primary btn-lg"} onClick={runit}>Run</button>
                </form>
            </div>

            <div className="col-6 python-executed">
                <pre id="output"></pre>
                <div id="mycanvas"></div>

                <p></p>
            </div>
        </div>
    );
}

export { Skulpt, SkulptPreview };
