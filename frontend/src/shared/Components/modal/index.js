import React from 'react'
import './style.scss'
import close from '../../../assets/images/icon/close.svg'


const Modal = ({
    handleClose,
    show,
    children,
    
    wrapperclass,
    
})=> {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none'
    return (

        <div  className={showHideClassName}>
            <section className={`modal-main ${wrapperclass} p-3`}>
                <div className="close-btn-position">
                    {/* <button type="button" className="closeBtn" onClick={handleClose}></button>
                     */}
                     <img src={close} height="30px" width="20px" onClick={handleClose}/>
                </div>
        
                <div style={{ overflowY: 'auto', height: '100%', overflowX: 'hidden' }}>
                    {show && children}
                </div>
            </section>
        </div>



    )
   

}

export default Modal