import React from 'react';
import Modal from 'react-modal'
import './QuoteBlock.css';

type values = {
  text: string,
  number: number,
  usertype: 'normal' | 'admin'
}

Modal.setAppElement('body');

function QuoteBlock(props: values) {
  const modalStyles = {
    content : {
      top          : '50%',
      left         : '50%',
      right        : 'auto',
      bottom       : 'auto',
      marginRight  : '-50%',
      transform    : 'translate(-50%, -50%)',
      background   : '#1c1e24',
      borderRadius : '5px',
      width        : '300px',
      height       : props.usertype === 'admin' ? '150px' : '80px',
      maxWidth     : '300px',
      overflowx     : 'hidden'
    }
  };

  const [modalOpen, setOpen] = React.useState(false);

  function openModal() {
    setOpen(true);
    console.log('modal opened');
  }

  function closeModal() {
    setOpen(!modalOpen);
    console.log('modal closed');
  }

  return (
    <div 
      className="container" 
      onClick={modalOpen ? undefined : openModal}
    >
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyles}
        overlayClassName="Overlay"
      >
        <h2 id="modalTitle">#{props.number} </h2>
          <h1 
            id="closeButton"
            onClick={closeModal}
          >
          X
          </h1>
          <br></br>
          <div id="modalText">{props.text}</div>
          
      </Modal>
      <h2 id="number">#{props.number}</h2>
      <h4 id="quoteText">{props.text}</h4>
    </div>
  );
}

export default QuoteBlock;