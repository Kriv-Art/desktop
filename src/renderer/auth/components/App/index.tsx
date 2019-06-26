import * as React from 'react';
import { observer } from 'mobx-react';
import { createGlobalStyle } from 'styled-components';

import { Style } from '../../style';
import { StyledApp, Title, Buttons, Subtitle } from './style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { ipcRenderer } from 'electron';
import { Textfield } from '~/renderer/components/Textfield';

const GlobalStyle = createGlobalStyle`${Style}`;

const sendResponse = (credentials: any) => {
  ipcRenderer.send('request-auth-result', credentials);
};

const ref1 = React.createRef<Textfield>();
const ref2 = React.createRef<Textfield>();

export const App = observer(() => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Title>Login</Title>
      <Subtitle>{store.url}</Subtitle>
      <Textfield
        ref={ref1}
        style={{ width: '100%', marginTop: 16 }}
        label="Username"
      ></Textfield>
      <Textfield
        ref={ref2}
        style={{ width: '100%', marginTop: 16 }}
        label="Password"
      ></Textfield>
      <Buttons>
        <Button
          onClick={() =>
            sendResponse({
              username: ref1.current.value,
              password: ref2.current.value,
            })
          }
        >
          Login
        </Button>
        <Button
          foreground="black"
          background="rgba(0, 0, 0, 0.08)"
          style={{ marginLeft: 8 }}
          onClick={() => sendResponse(null)}
        >
          Cancel
        </Button>
      </Buttons>
      <div style={{ clear: 'both' }}></div>
    </StyledApp>
  );
});