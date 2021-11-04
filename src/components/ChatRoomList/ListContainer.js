import React, { useEffect } from 'react';
import {
  Container,
  ListHeaderContainer,
  ListContentContainer,
  RowContainer,
  ColContainer,
  RecentMessageContainer,
} from './ListPresenter';
import { Link, Outlet } from 'react-router-dom';
import { ProfileImage } from '../icons';

const ListContainer = ({ messengerData }) => {
  useEffect(() => {
    console.log(messengerData);
  }, [messengerData]);

  return (
    <Container>
      <ListHeaderContainer>
        <RowContainer>
          <h4>n0wkim</h4>
          <img
            style={{ marginLeft: 10 }}
            src="img/magnifying.png"
            width="20"
            height="20px"
            alt="arrow"
          ></img>
        </RowContainer>
      </ListHeaderContainer>
      <ListContentContainer>
        <ul>
          {messengerData.map((element) => {
            return (
              <Link to={`/${element.id}`}>
                <RowContainer key={element.id}>
                  <ProfileImage
                    alt="profile-img"
                    src={`img/${element.id}.png`}
                    width="56px"
                    height="56px"
                  />
                  <ColContainer>
                    <p>{element.name}</p>
                    <RecentMessageContainer>
                      {element.chatData.slice(-1)[0].text}
                    </RecentMessageContainer>
                  </ColContainer>
                </RowContainer>
              </Link>
            );
          })}
        </ul>
        <Outlet />
      </ListContentContainer>
    </Container>
  );
};

export default ListContainer;
