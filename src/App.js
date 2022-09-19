import { useState, useEffect } from "react"
import './App.css';
import Loading  from './Loading';
import axios from 'axios'
import { format } from "date-fns"

function App() {
  const [items, setItems] = useState([]);
  // Change this to any username whose repositories you want to get
  const [user] = useState("patoski716")

  useEffect(() => {
    axios
    .get(`https://api.github.com/users/${user}/repos?per_page=6&sort=updated`)
    .then((res) => {
        console.log(res);
        setItems(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
}, [user]);

  return (
    <div className="container">
      <div className="text-center text-white mt-2">
        <h1>Consuming Github Users Api</h1>
        <h3>
        Viewings {user} repositories
        </h3>
      </div>
      {!items ? (
        <Loading />
      ) : (
      <div className="row">
        {items.map((item)=>
        <div key={item.id} className="col-md-4 mt-2 pt-5">
        <div className="card bg-secondary text-white">
        <div className="text-dark px-3">
              <div className="row">
                <div className="col-md-6 col-sm-6 mt-3">
                    <img src={item.owner.avatar_url} alt="{item.owner.login}" className="img-circle img-responsive" />
                    
                </div>
              
                <div  className="col-md-6 col-sm-6 mt-5" style={{float:'right',paddingLeft:'20px',color:'#fff'}}>{user}<br/>{item.name}<br/>
                {item.private ? (
                <span>Private</span>
                ) : (
                <span>Public</span>
                )}
                </div>
              </div>
            </div>


          <div className="card-body">
            <p className="card-text">This repository was created on{" "}
            {format(new Date(item.created_at), "dd MMMM yyyy")} by{" "}
            {item.owner.login}</p>
            
              <span className="align-items-center pe-5 me-4">
              <a href={item.html_url}
            target="_blank"
            rel="noreferrer" className="mb-2 btn btn-sm btn-outline-dark text-light">View Repo</a>
              </span>
              <button  className="btn btn-primary  text-right mx-1">
                {item.language}
              </button>
            
            
          </div>
        </div>
      </div>
        
        )}
       
      
        
      </div>
      
 )}

   
    </div>
  );
}

export default App;
