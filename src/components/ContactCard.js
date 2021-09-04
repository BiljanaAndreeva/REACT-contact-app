import React from "react";
import { Link } from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = (props) => {
    const { id, name, email} = props.contact;
    return(
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to={{pathname:`/contact/${id}`, state:{contact:props.contact}}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
                </div>
                <div style={{marginLeft:"500px"}}>

                <Link to={{pathname:`/edit`, state:{contact:props.contact}}}>
                        <i className="edit alternate outline icon"
                        style={{color:"blue"}}>

                        </i>
                    </Link> 
                    <i className="trash alternate outline icon"
                    style={{color:"red",marginTop:"7px", marginLeft:"10px"}}
                    onClick ={ () => props.clickHandler(id) }>

                    </i>
                   
                   
                </div>   
                
        </div>
    );

};

export default ContactCard;