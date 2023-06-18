import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

export const SingleEvet = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage("Please introduce a correct email address");
    }

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = "";
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4">{data.title}</Typography>

      <Box sx={{ display: "flex" }}>
        {data.imagePath ? (
          <Image
            src={data.imagePath}
            width={400}
            height={300}
            alt={data.title}
            style={{ width: "auto", height: "auto" }}
            priority={true}
          />
        ) : null}

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h4">Description: {data.description}</Typography>
          <form onSubmit={onSubmit}>
            <label>Get Registered for this event!</label>
            <input
              ref={inputEmail}
              type="email"
              id="email"
              placeholder="Please insert your email here"
              style={{ border: "1px solid gray" }}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{message}</p>
        </Box>
      </Box>
    </Box>
  );
};
