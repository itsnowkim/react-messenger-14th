import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../icons';
import { RowContainer, ColContainer } from './ListPresenter';
import { TextInput } from '../Header/HeaderPresenter';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement(document.getElementById('root'));

interface ChatProps {
  date: number;
  text: string;
  userId: number;
  isHeart: boolean;
}

interface MessengerProps {
  id: number;
  recentChatSend: number;
  name: string;
  chatData: Array<ChatProps>;
}

interface Props {
  messengerData: Array<MessengerProps>;
}

const ModalComponent = ({ messengerData }: Props) => {
  const [text, setText] = useState<string>('');
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState<Array<MessengerProps>>([]);

  // 유저의 typing을 받아서 text에 set
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const nextForm = e.currentTarget.value;
    setText(nextForm);
  };

  // text = input값으로, 검색. -> text가 바뀔 때마다 검색하면 됨.
  useEffect(() => {
    if (text) {
      handleSearch(text);
    }
    // eslint-disable-next-line
  }, [text]);

  useEffect(() => {
    setSearchedData(messengerData);
  }, [messengerData]);

  function handleSearch(input: string) {
    const result = messengerData.filter((data) => {
      console.log(data.name);
      console.log(input);
      return data.name.search(input) !== -1;
    });
    setSearchedData(result);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setText('');
  }

  const handleClicked = (e: any) => {
    navigate(`/${e.target.id}`);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>
        <img
          style={{ marginLeft: 10 }}
          src="img/magnifying.png"
          width="20"
          height="20px"
          alt="magifying"
        ></img>
      </button>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h4>검색</h4>
        <TextInput
          type="text"
          placeholder="검색"
          onChange={onChange}
          value={text}
        />
        <ul>
          {modalIsOpen ? (
            searchedData.map((element) => {
              return (
                <RowContainer key={element.id}>
                  <ProfileImage
                    id={element.id}
                    onClick={handleClicked}
                    alt="profile-img"
                    src={`img/${element.id}.png`}
                    width="56px"
                    height="56px"
                  />
                  <ColContainer>
                    <p>{element.name}</p>
                  </ColContainer>
                </RowContainer>
              );
            })
          ) : (
            <></>
          )}
        </ul>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};
export default ModalComponent;
