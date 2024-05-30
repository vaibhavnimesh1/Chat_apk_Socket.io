import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async () => {
    console.log("hiiii");
  };
  const postDetails = (pic) => {
    setLoading(true);
    if (!pic) {
      toast({
        title: "",
        description: "Please Select An Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    console.log(pic);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat_apk");
      data.append("cloud_name", "dwtaizeop");

      axios
        .post("https://api.cloudinary.com/v1_1/dwtaizeop/image/upload", data)
        .then((res) => res.data)
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
          toast({
            title: "Error",
            description: "Failed to upload image",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      setLoading(false);
      toast({
        title: "",
        description: "Please Select a valid Image (JPEG or PNG)",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        onClick={submitHandler}
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
