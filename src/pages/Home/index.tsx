import React from 'react';
import './index.scss';

interface Iprops {

}
interface IState {

}

class Home extends React.Component<Iprops>{
    constructor(props: Iprops) {
        super(props);
    }
    render() {
        return (
            <div id="home">
                <div className="me-vote">
                    <img src={require("../../static/images/banner.png")} />
                    <a href="#">我要报名</a>
                </div>
                <div className="list">
                    <div className="list-item">

                    </div>


                </div>
            </div>
        )
    }
}

export default Home; 