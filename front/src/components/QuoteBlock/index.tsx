import React from 'react';
import Modal from 'react-modal'
import useFitText from 'use-fit-text'
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
  const [adminMsg, setAdminMsg] = React.useState('');
  const [editorText, setEditorText] = React.useState(props.text);
  const {fontSize, ref} = useFitText();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(!modalOpen);
  }

  function handleClick() {
    if(window.getSelection()?.toString() !== '' || undefined){
      return undefined;
    } else {
      return !modalOpen ? openModal() : undefined;
    }
  }

  function removeQuote() {
    const data = {
      id: props.number
    }
    console.log(JSON.stringify(data))
    fetch(`${process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath}${props.origin === 'quotes' ? 'quotes' : 'niilo'}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then(res => {
      if(res.status === 200) {
        setAdminMsg('Quote removed');
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1000);
      } else {
        setAdminMsg(`${res.body}`);
      }
    });
  }

  function editQuote() {
    console.log(editorText);
    const data = {
      text: editorText,
      id: props.number
    }
    fetch(`${process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath}${props.origin === 'quotes' ? 'quotes' : 'niilo'}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then(res => {
      if(res.status === 201) {
        setEditing(false);
        setAdminMsg('Quote updated');
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1000);
      } else {
        setAdminMsg(`${res.body}`);
      }
    })
  }

  return (
    <div 
      className="container" 
      onClick={handleClick}
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
        <div 
          id="modalText"
          { ...(props.text.length > 65 &&
            {
              ref: ref,
              style: {fontSize}
            }
          )} 
        >
          {props.text}
        </div>

        { isEditing && 
          <div>
            <textarea 
              id="editField" 
              value={editorText}
              onChange={e => setEditorText(e.target.value)}
            >
            </textarea>
          </div>
        }

        { props.usertype === 'admin' &&
          <div>
            {isEditing 
              ? (<div>
                <h4 onClick={editQuote} id="saveButton" className="adminButtons">Save</h4>
                <h4 onClick={() => setEditing(false)} id="cancelButton" className="adminButtons">Cancel</h4>
              </div>)
              : <h3 onClick={() => setEditing(true)} id="editButton" className="adminButtons">Edit</h3>}
            <h3 id="adminMsg" className="adminButtons">{adminMsg}</h3>
            <h3 onClick={removeQuote} id="removeButton" className="adminButtons">Remove</h3>
          </div>
        }
          
      </Modal>
      <h2 id="number">#{props.number}</h2>
      <h4 
        id="quoteText"
        { ...(props.text.length > 70 &&
          {
            ref: ref,
            style: {fontSize}
          }
        )}
      >
        {props.text}
      </h4>
    </div>
  );
}

export default QuoteBlock;