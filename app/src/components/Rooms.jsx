import React, {Component} from 'react';
import axios from 'axios';

class Rooms extends Component {
    state = {
        rooms: {}
    };

    componentDidMount() {
        axios.get(`/room/all`)
            .then(res => {
                const rooms = res.data;
                console.log(res);
                this.setState({ rooms });
            })
    };

    

    render() {
        return (
            <React.Fragment>
            <ul>
                {this.state.rooms.map(rooms => <li key={Rooms.id}>{rooms.name}</li>)}
            </ul>
                <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="..."/>
                 <div class="card-body">
                    <h5 class="card-title">Room One</h5>
                    <p class="card-text">This room includes a spacious layout..</p>
                    <a href="#" class="btn btn-primary">Learn more</a>
                </div>
             </div>
             </React.Fragment>
        );
        
    }
}

export default Rooms;