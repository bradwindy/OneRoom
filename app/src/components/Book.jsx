import React, {Component} from 'react';

class Book extends Component {
    render() {
        return (
            <div className="p-4">
                <p>
                    This is where first booking page could go, say the date picker.
                    Will work on these sub-pages and back button nav soon.
                </p>
                <a href="/room" className="btn btn-primary">Room Info</a>
            </div>
        );
    }
}

export default Book;