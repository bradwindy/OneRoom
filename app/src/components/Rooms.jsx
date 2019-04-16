import React, {Component} from 'react';
import axios from 'axios';

class Rooms extends Component {
    state = {
        rooms: {}
    };

    componentDidMount() {
        axios.get(`/room`)
            .then(res => {
                const rooms = res.data;
                this.setState({ rooms });
            })
    };

    render() {
        return (
            <div className="p-4">
                Rooms Info Here, derived from rooms object. In some sort of list, based on sketches.<br/><br/>
                Bootstrap CSS could make a nice list.<br/><br/>
                <a href="https://getbootstrap.com/docs/4.3/components/card/">Useful bootstrap components here (Command-click for new tab)</a>
            </div>
        );
    }
}

export default Rooms;