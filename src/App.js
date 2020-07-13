import React, { useState } from "react";
import axios from "axios";
import { Resizable } from "re-resizable";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  borderRadius: "5px",
  zIndex: 1,
};

function App() {
  const [name, setName] = useState(null);
  const [iframeLink, setIframeLink] = useState(null);
  const getIframe = async () => {
    const { data } = await axios({
      method: "post",
      url: "https://lessonback.herokuapp.com/",
      data: {
        name,
      },
    });
    if (data && data.client_url) {
      setIframeLink(data.client_url);
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await getIframe();
  };

  return (
    <>
      {!iframeLink && (
        <form className="userForm" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">
            enter your name
            <br />
            <input type="text" onChange={(e) => handleChange(e)} name="name" />
          </label>
          <button type="submit">send</button>
        </form>
      )}
      {iframeLink && (
        <Resizable
          style={style}
          defaultSize={{
            width: 200,
            height: 200,
          }}
          minWidth={500}
          minHeight={550}
        >
          <iframe
            title="room"
            src={iframeLink}
            allow="camera; microphone; display-capture; fullscreen;"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </Resizable>
      )}
    </>
  );
}

export default App;
