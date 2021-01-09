import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg';
import ReactComponent from './796182251091394590.png'
import { 
  AcUnit, AccessAlarm, Accessible, 
  Adb, AddComment, Adjust, 
  AddShoppingCart, Airplay, Album
  } from '@material-ui/icons';

const nappulat = [
  'Nappi',
  'Nappula',
  'Namiska',
  'Painike',
  'Näppäin',
  'Painonappi',
  'Kuittaiskytkin'
]


const rollVariant = () => {
  const roll = Math.floor(Math.random() * 3);

  switch(roll) {
    case 2:
      return 'contained'
    case 1:
      return 'outlined'
    default:
      return 'text'
  }
}

const rollColour = () => {
  const roll = Math.floor(Math.random() * 4);

  switch(roll) {
    case 3:
      return 'secondary'
    case 2:
      return 'default'
    case 1:
      return 'primary'
    default:
      return 'inherit'
  }
}

const rollSize = () => {
  const roll = Math.floor(Math.random() * 3);

  switch(roll) {
    case 2:
      return 'large'
    case 1:
      return 'medium'
    default:
      return 'small'
  }
}

const rollIcon = () => {
  const roll = Math.floor(Math.random() * 9);

  switch(roll) {
    case 8:
      return <AcUnit />
    case 7:
      return <Airplay />
    case 6:
      return <Accessible />
    case 5:
      return <AccessAlarm />
    case 4:
      return <Adb />
    case 3:
      return <AddComment />
    case 2:
      return <Adjust />
    case 1:
      return <AddShoppingCart />
    default:
      return <Album />
  }
}

function Nappulat() {

  const [loading, setLoading] = React.useState(true);
  const [words, setWords] = React.useState<Array<string>>();
  const [buttons, setButtons] = React.useState(Math.floor(Math.random() * 20)  + 12);

  React.useEffect(() => {
    setTimeout(() => {
      fillWords();
      setLoading(false);
    }, 1500);
  }, []);

  
  const fillWords = () => {
    const random = () => {
      return nappulat[Math.floor(Math.random() * (nappulat.length - 1))];
    }
    const temp: string[] = [random()];

    for(let i = 0; i < 50; i++) {
      temp.push(random());
    }

    setWords(temp);
  }

  const rollButton = (el: string) => {
    const roll1 = Math.floor(Math.random() * 4);
    const roll2 = Math.floor(Math.random() * 4);
  
    return (
      <>
        { roll2 < 3 &&
          <Button
            style={{margin: '10px'}}
            size={ rollSize() }
            color={ rollColour() }
            variant={ rollVariant() }
            onClick={e => setButtons(c => c - 1)}
            { ...(roll1 === 0 &&
              { startIcon: rollIcon() }
            )}
          >
            {el}
          </Button>
        }
  
        { roll2 === 3 &&
          <IconButton
            style={{margin: '10px'}}
            color={ rollColour() }
            onClick={e => setButtons(c => c - 1)}
          >
            { rollIcon() }
          </IconButton>
        }
      </>
    )
  }

  return(
    <div>
      { loading &&
        <LoadingIcon style={{marginTop: '150px'}} />
      }

      { !loading &&
        <div style={{marginTop: '50px'}}>
          { buttons <= 0 &&
            <div>
              <img src={ReactComponent} alt="misikamodo" />
            </div>
          }

          { words !== undefined &&
              words.map(el => (
                rollButton(el)
              ))
          }
        </div>
      }
    </div>
  )
}

export default Nappulat;