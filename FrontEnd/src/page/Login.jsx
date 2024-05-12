import { useState } from "react";
import { Flex, Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import "../Styles/LoginPage.css";
import Heading from "../Components/Heading";
import { useToast } from "@chakra-ui/react";
import url from "../Components/vars";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post(`${url}/users/login`, {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        localStorage.setItem("userDetails", JSON.stringify(response.data));
        if (response.data.role == "creator") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const response = await axios.post(`${url}/users/register`, {
          username,
          email,
          password,
        });
        console.log("Signup success:", response.data);
        toast({
          title: "Sign up successful! You can now log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        const loginResponse = await axios.post(`${url}/users/login`, {
          email,
          password,
        });
        localStorage.setItem("userDetails", loginResponse.data);
        console.log("Login success:", loginResponse.data);
        navigate("/");
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const togglePage = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <>
      <Link to="/" className="backButton">
        <FaArrowLeft />
      </Link>
      <Heading />
      <Flex align="center" justify="center" h="100vh" mt="-10">
        <Box
          maxW="lg"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          className={isLogin ? "loginBox" : "signupBox"}
        >
          <Flex direction="column" align="center" p={8}>
            <Image
              src="https://www.popsci.com/uploads/2023/01/23/use-apps-to-organize-cooking-recipes.jpg?auto=webp&optimize=high&width=1440"
              alt="Image"
            />
            <form onSubmit={handleSubmit}>
              <Box mt={6}>
                <h1
                  style={{
                    fontSize: "2rem",
                    color: "teal",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {isLogin ? "Log In" : "Sign Up"}{" "}
                </h1>

                {!isLogin && (
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={handleNameChange}
                    mb={4}
                    required
                  />
                )}
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  mb={4}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  mb={4}
                  required
                />
                {!isLogin && (
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    mb={4}
                    required
                  />
                )}
                {error && <Text color="red.500">{error}</Text>}
                <Flex justifyContent="center">
                  <Button type="submit" colorScheme="teal" mr={2}>
                    {isLogin ? "Log In" : "Sign Up"}
                  </Button>
                </Flex>
                <Text color="gray.500" mt={2} textAlign="center">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Text
                    as="span"
                    color="teal"
                    cursor="pointer"
                    onClick={togglePage}
                  >
                    {isLogin ? "Sign Up" : "Log In"}
                  </Text>
                </Text>
              </Box>
            </form>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default LoginPage;
