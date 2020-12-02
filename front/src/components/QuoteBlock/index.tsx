import React from 'react';
import Modal from 'react-modal'
import './QuoteBlock.css';
import paths from '../../utils/paths.json';

type values = {
  text: string,
  number: number,
  usertype: 'normal' | 'admin',
  origin: 'quotes' | 'niilo'
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
  const [isEditing, setEditing] = React.useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(!modalOpen);
  }

  function removeQuote() {
    fetch(`${process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath}${props.origin === 'quotes' ? 'quotes' : 'niilo'}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: `${props.number}`
      }
    ).then(res => console.log({Res: res, "prop": {"id": props.number}}))
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

        { isEditing && 
          <div>
            <textarea defaultValue={props.text}>
            </textarea>
          </div>
        }

        { props.usertype === 'admin' &&
          <div>
            {isEditing 
              ? (<div>
                <h4 id="saveButton" className="adminButtons">Save</h4>
                <h4 onClick={() => setEditing(false)} id="cancelButton" className="adminButtons">Cancel</h4>
              </div>)
              : <h3 onClick={() => setEditing(true)} id="editButton" className="adminButtons">Edit</h3>}
            <h3 onClick={removeQuote} id="removeButton" className="adminButtons">Remove</h3>
          </div>
        }
          
      </Modal>
      <h2 id="number">#{props.number}</h2>
      <h4 id="quoteText">{props.text}</h4>
    </div>
  );
}

export default QuoteBlock;