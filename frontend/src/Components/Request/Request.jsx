import BackButton from "../BackButton/BackButton";
import "../Request/request.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useState } from "react";
import { baseURL } from "../../utils/listContainer";
import Loading from "../Loading/Loading";
import { deleteOneRequest } from "../../redux/apiRequest";
import axios from "axios";
const socket = io.connect("https://scepter.onrender.com")

const Request = () => {
    const [receive,setReceive] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [clientID, setClientID] = useState('');
    const user = useSelector((state)=> state.auth.login.currentUser);
    const accessToken = user.accessToken
    const dispatch = useDispatch();
    useEffect(()=>{
        socket.on("receive_request",(data)=>{
            if(data.length === 0){
                setReceive([])
            }
            else{
                setLoading(false)
                // setReceive(receive.concat(data. request))
                setClientID(data.request[0].socketId)
            }
        })
    },[socket])

    useEffect(()=>{
        axios.get(`${baseURL}/request/`,{
            headers: {token: `Bearer ${accessToken}`}
    }).then(res=>{
            setReceive(res.data)
            setLoading(false)
        }).catch(function () {
            console.log("Promise Rejected");
       });
    },[])
    const handleAccept =(request) =>{
        socket.emit("send_notification",[{
            username: user.username, 
            socketId: clientID,
        }])
        // Find the index of the element with the matching id
        const index = receive.findIndex((req) => req.id === request.id);

        // Remove the element from the receive array using splice()
        const updatedReceive = [...receive];
        updatedReceive.splice(index, 1);

        deleteOneRequest(accessToken,dispatch,request._id)
        setReceive(updatedReceive);
    }
    const handleDecline =(request) =>{
        // Find the index of the element with the matching id
        const index = receive.findIndex((req) => req.id === request.id);

        // Remove the element from the receive array using splice()
        const updatedReceive = [...receive];
        updatedReceive.splice(index, 1);
        setReceive(updatedReceive);
    }
    return ( 
            <div className="request-container">
                <BackButton/>
                    { isLoading ? <Loading
                    loadingType="PacmanLoader"
                    color="#777777"
                    loading={isLoading}
                    size="20px"
                    />
                    :  
                receive.map((request,idx)=>{
                        return(
                        <div className="card-container" key={idx}>
                            <div className="card" >
                                <h2 className="title">Request</h2>
                                <div className="card-info">
                                    <p>Username:<span> {request.username}</span> </p>
                                    <p>From:<span> {request.pickup || request.pickupAddress}</span></p>
                                    <p>To: <span> {request.dropoff || request.dropoffAddress} </span></p>
                                    <p>Travel Time: <span>{request.duration} mins</span></p>
                                    <p>Distance: <span>{request.distance} feets</span></p>
                                </div>
                                <div className="cardbutt-container">
                                    <button onClick={()=> handleAccept(request)}>Accept</button>
                                    <button onClick={()=> handleDecline(request)}>Decline</button>
                                </div>
                            </div>
                        </div>                           
                        )})
                }
            </div>
);
}
export default Request;