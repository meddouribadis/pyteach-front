import React from "react";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return(
            <div className="navbar-bottom">
                <p>Salut</p>
            </div>
        )
    }

}

export { Header };