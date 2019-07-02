import React, {useState} from "react"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import "./style.scss"
import cross from "./cross.svg"
import fetch from "isomorphic-unfetch"
import RadioItem from "./RadioItem"
import Alert from "../Alert"

const ShareDialog = () => {

    const [response, setResponse] = useState(false)
    const [dialogIsOpen, toggleDialog] = useState(false)
    const [recipient, changeRecipient] = useState("")
    const [medium, changeMedium] = useState("email")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch(`/api/share/${medium}`, {
                method: "post",    
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ 
                    url: window.location.href, 
                    email: recipient,
                    phoneNumber: recipient
                })
            })
            setResponse(res.status)

        } catch(e){
            setResponse("fail")
        }
    }

    const reset = () => {
        changeRecipient("")
        changeMedium("email")
        setResponse(false)
        toggleDialog(true)
    }

    return (
        <>
            <button className="share-button" onClick={reset}>
                Share
            </button>
            <Dialog
                className="share-dialog"
                isOpen={dialogIsOpen}
                onDismiss={()=>{
                    toggleDialog(false)
                }}
            >
                {(response === 200)?
                    <div className="share-dialog__body">
                        <h2 className="share-dialog__title">Shared successfully!</h2>
                        <p>Would you like to share with someone else?</p>
                        <button className="inline-button" onClick={reset}>
                            Yes, share again
                        </button>
                    </div>
                    :
                    <form method="post" action={`/share/${medium}`} onSubmit={handleSubmit} aria-live="polite">
                        <div className="share-dialog__body">
                            <h2 className="share-dialog__title">Share these recommendations</h2>
                            {(response === 500 || response === "fail") && <Alert>There was a problem sharing. If this continues, please try again later</Alert>}
                            {(response === 404) && <Alert>We couldn't share to that {(medium === "sms")? "phone number" : "email"}. Please check it and try again.</Alert>}

                            <p className="radio-group-label">Share by:</p>
                            <div className="radio-group">
                                <RadioItem
                                    name="medium"
                                    value="email"
                                    label="Email"
                                    checked={medium}
                                    onChange={()=>{
                                        changeRecipient("")
                                        changeMedium("email")
                                    }}
                                />
                                <RadioItem
                                    name="medium"
                                    value="sms"
                                    label="Text message"
                                    checked={medium}
                                    onChange={()=>{
                                        changeRecipient("")
                                        changeMedium("sms")
                                    }}
                                />
                            </div>
                            <label className="share-dialog__text-label" htmlFor="recipient">{(medium === "sms")? "Phone number" : "Email address"} </label>
                            <input 
                                type={(medium === "sms")? "tel" : "email"} 
                                className="share-dialog__text-input"
                                name="recipient"
                                id="recipient"
                                required
                                value={recipient}
                                onChange={(e)=>{
                                    changeRecipient(e.target.value)
                                }}
                            />
                        </div>
                        <footer className="share-dialog__footer">
                            <button className="share-dialog__action" 
                                type="submit" 
                            >
                                Send {(medium === "sms")? "message" : "email"}
                            </button>
                        </footer>
                    </form>
                }
                <button onClick={()=>{
                    toggleDialog(false)
                }} className="share__close"><img src={cross} alt="close share" className="share__close-icon"/></button>
            </Dialog>
        </>
    )
}

export default ShareDialog