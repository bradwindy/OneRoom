/******* This here is the  fixed naviagtion bar at the top of the page that hides. If the user is logged in too. 
                 * 
              <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">
                  
                    RoomEase
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon" />
                  </button>
                  <div
                    class="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                  >
                    <div class="navbar-nav">
                      <a class="nav-item nav-link" href="/login">
                        Login <span class="sr-only">(current)</span>
                      </a>
                      <a class="nav-item nav-link" href="/">
                        My Bookings
                      </a>
                      <a class="nav-item nav-link" href="/book/date">
                        Book <span className="sr-only">(current)</span>
                      </a>
                      <a class="nav-item nav-link" href="/login" onClick={Nav.logout}>
                        Logout <span className="sr-only">(current)</span>
                      </a>*/