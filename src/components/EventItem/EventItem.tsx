import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

export const EventItem = ({ data }: any) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // const emailValue: any = inputEmail.current.value;
    const eventId = router?.query.id;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4">{data.title}</Typography>

      <Box sx={{ display: "flex" }}>
        {data.imagePath ? (
          <Box sx={{ width: "400px" }}>
            <Image
              src={data.imagePath}
              width={400}
              height={300}
              alt={data.title}
              style={{ width: "100%", height: "auto" }}
              priority={true}
            />
          </Box>
        ) : null}

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h4">Description: {data.description}</Typography>
          <form onSubmit={onSubmit}>
            <label>Get Registered for this event!</label>
            <input
              // ref={inputEmail}
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
