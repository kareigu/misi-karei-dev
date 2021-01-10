import React from 'react';
import Modal from 'react-modal'
import useFitText from 'use-fit-text'
import './QuoteBlock.css';
import paths from '../../utils/paths.json';
import parseAccessToken from '../../utils/parseAccessToken';
import UserContext from '../../utils/UserContext';

import { IconButton, Tooltip} from '@material-ui/core'
import { CreateOutlined, DeleteOutlined, SaveOutlined, ClearOutlined } from '@material-ui/icons'
import { useState } from 'react';
import { useContext } from 'react';

type values = {
  text: string,
  number: number,
  origin: 'quotes' | 'niilo',
  refresh: React.Dispatch<React.SetStateAction<boolean>>
}

Modal.setAppElement('body');

function QuoteBlock(props: values) {

  const [modalOpen, setOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [adminMsg, setAdminMsg] = useState('');
  const [editorText, setEditorText] = useState(props.text);
  const {fontSize, ref} = useFitText();
  const {user} = useContext(UserContext)

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
      height       : user.permLevel >= 3 ? '150px' : '80px',
      maxWidth     : '300px',
      overflowx     : 'hidden'
    }
  };


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
          'Authorization': `${parseAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then(res => {
      if(res.status === 200) {
        setAdminMsg('Quote removed');
        setTimeout(() => {
          closeModal();
          props.refresh(c => !c);
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
          'Authorization': `${parseAccessToken()}`,
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
          props.refresh(c => !c);
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
        <Tooltip title="Close">
          <IconButton 
            color="secondary"
            id="closeButton"
            onClick={closeModal}
          >
            <ClearOutlined />
          </IconButton>
        </Tooltip>
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

        { user.permLevel >= 3 &&
          <div>
            {isEditing 
              ? (<div>

                <Tooltip title="Save">
                  <IconButton color="primary" onClick={editQuote} id="saveButton" className="adminButtons"><SaveOutlined /></IconButton>
                </Tooltip>
                
                <Tooltip title="Cancel">
                  <IconButton color="secondary" onClick={() => setEditing(false)} id="cancelButton" className="adminButtons"><ClearOutlined /></IconButton>
                </Tooltip>
                
              </div>)
              : (<Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => setEditing(true)} id="editButton" className="adminButtons"><CreateOutlined /></IconButton>
                </Tooltip>)}
            <h3 id="adminMsg" className="adminButtons">{adminMsg}</h3>
            { user.permLevel >= 4 &&
              <Tooltip title="Delete">
                <IconButton color="secondary" onClick={removeQuote} id="removeButton" className="adminButtons"><DeleteOutlined /></IconButton>
              </Tooltip>
            }
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